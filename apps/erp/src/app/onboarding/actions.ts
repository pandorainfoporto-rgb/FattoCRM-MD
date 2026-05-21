"use server";

import { createAdminClient, createClient } from "@/lib/supabase/server";
import { findTemplate, type VerticalKey } from "@/components/onboarding/templates";
import {
  AGENTES_CORE,
  AGENTES_POR_VERTICAL,
  type AgenteDefault,
} from "@/components/onboarding/agentes-default";

/**
 * Server action chamada pelo botão "Ativar MD Assessoria" do wizard.
 *
 * Cria atomicamente: tenant → tenant_membros (owner) → canais →
 * departamentos/etiquetas/motivos/mensagens_rapidas (do template) →
 * agentes_ia + agente_tools (12 core + 5 do vertical) → provider_config
 * (se software escolhido) → auditoria.
 *
 * Sem RPC — sequência de inserts via admin (service_role) pra contornar
 * RLS antes do user estar associado ao tenant. Em V2 vira RPC pgsql
 * pra atomicidade real.
 */

interface OnboardingPayload {
  vertical: VerticalKey;
  software?: string;
  canais: string[];
  departamentos: string[];
  empresa: { nome: string; tagline: string; corPrimaria: string; corSecundaria: string };
}

interface ResultadoOk {
  ok: true;
  tenantId: string;
  agentesCriados: number;
}
interface ResultadoErr {
  ok: false;
  error: string;
}
type Resultado = ResultadoOk | ResultadoErr;

export async function ativarTenantAction(payload: OnboardingPayload): Promise<Resultado> {
  // 1. Verifica que o user está logado (createClient lê cookies do request)
  const userClient = createClient();
  const {
    data: { user },
    error: userErr,
  } = await userClient.auth.getUser();
  if (userErr || !user) {
    return { ok: false, error: "Você precisa estar logado pra ativar um tenant." };
  }

  const admin = createAdminClient();
  const template = findTemplate(payload.vertical);
  const slug = slugify(payload.empresa.nome);

  // 2. Cria tenant
  const { data: tenant, error: tErr } = await admin
    .from("tenants")
    .insert({
      slug,
      nome: payload.empresa.nome,
      vertical: payload.vertical,
      software_gestao: payload.software ?? null,
      tagline: payload.empresa.tagline || null,
      cor_primaria: payload.empresa.corPrimaria,
      cor_secundaria: payload.empresa.corSecundaria,
      ativado_em: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (tErr || !tenant) {
    return { ok: false, error: `Falha ao criar empresa: ${tErr?.message ?? "desconhecido"}` };
  }
  const tenantId = tenant.id as string;

  // 3. Vincula o user como owner
  const { error: mErr } = await admin.from("tenant_membros").insert({
    tenant_id: tenantId,
    user_id: user.id,
    role: "owner",
    ativo: true,
  });
  if (mErr) {
    return { ok: false, error: `Falha ao vincular owner: ${mErr.message}` };
  }

  // 4. Canais
  if (payload.canais.length > 0) {
    await admin.from("canais").insert(
      payload.canais.map((tipo) => ({
        tenant_id: tenantId,
        tipo,
        nome: humanizeCanal(tipo),
        ativo: true,
      })),
    );
  }

  // 5. Configs do template (departamentos vem do state — user pode ter editado)
  if (payload.departamentos.length > 0) {
    await admin.from("departamentos").insert(
      payload.departamentos.map((nome, i) => ({ tenant_id: tenantId, nome, ordem: i })),
    );
  }
  if (template.etiquetas.length > 0) {
    await admin.from("etiquetas").insert(
      template.etiquetas.map((nome) => ({
        tenant_id: tenantId,
        nome,
        cor: payload.empresa.corPrimaria,
      })),
    );
  }
  if (template.motivos.length > 0) {
    await admin.from("motivos").insert(
      template.motivos.map((nome, i) => ({ tenant_id: tenantId, nome, ordem: i })),
    );
  }
  if (template.mensagens.length > 0) {
    await admin.from("mensagens_rapidas").insert(
      template.mensagens.map(({ atalho, texto }) => ({
        tenant_id: tenantId,
        atalho,
        texto,
      })),
    );
  }

  // 6. Agentes IA (12 core + 5 do vertical)
  const agentes: AgenteDefault[] = [
    ...AGENTES_CORE,
    ...(AGENTES_POR_VERTICAL[payload.vertical] ?? []),
  ];

  let agentesCriados = 0;
  if (agentes.length > 0) {
    const { data: agentesInseridos, error: aErr } = await admin
      .from("agentes_ia")
      .insert(
        agentes.map((a) => ({
          tenant_id: tenantId,
          nome: a.nome,
          setor: a.setor,
          cargo: a.cargo,
          modelo: a.modelo,
          temperatura: a.temperatura,
          status: "ativo",
          system_prompt: a.systemPrompt,
          canais: a.canais,
          capacidades: a.capacidades,
          cor: a.cor,
        })),
      )
      .select("id, nome");

    if (aErr) {
      return { ok: false, error: `Falha ao criar agentes: ${aErr.message}` };
    }

    agentesCriados = agentesInseridos?.length ?? 0;

    const toolsPayload = (agentesInseridos ?? []).flatMap(
      (row: { id: string; nome: string }) => {
        const def = agentes.find((a) => a.nome === row.nome);
        if (!def) return [];
        return def.tools.map((tool_key) => ({
          agente_id: row.id,
          tool_key,
          config: {},
        }));
      },
    );

    if (toolsPayload.length > 0) {
      await admin.from("agente_tools").insert(toolsPayload);
    }
  }

  // 7. Provider config (sem credenciais — preencher depois em /configuracoes)
  if (payload.software) {
    await admin.from("provider_config").insert({
      tenant_id: tenantId,
      provider_key: payload.software,
      conectado: false,
      config_publica: {},
    });
  }

  // 8. Auditoria
  await admin.from("auditoria_eventos").insert({
    tenant_id: tenantId,
    user_id: user.id,
    acao: "tenant_ativado",
    recurso: "tenants",
    recurso_id: tenantId,
    payload: {
      vertical: payload.vertical,
      software: payload.software,
      canais: payload.canais.length,
      departamentos: payload.departamentos.length,
      agentes: agentesCriados,
    },
  });

  return { ok: true, tenantId, agentesCriados };
}

// ============================================================
// Helpers
// ============================================================

function slugify(s: string): string {
  const base = s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);
  return `${base || "empresa"}-${Math.random().toString(36).slice(2, 6)}`;
}

function humanizeCanal(tipo: string): string {
  const map: Record<string, string> = {
    whatsapp: "WhatsApp",
    "whatsapp-call": "WhatsApp Calling",
    instagram: "Instagram Direct",
    messenger: "Messenger",
    email: "E-mail",
    voz: "Voz (PSTN)",
    telegram: "Telegram",
    webchat: "Web Chat",
  };
  return map[tipo] ?? tipo;
}
