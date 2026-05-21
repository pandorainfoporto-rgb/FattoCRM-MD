"use client";

import { useState } from "react";
import {
  Plug,
  ChevronDown,
  CheckCircle2,
  ShoppingBag,
  Wifi,
  Calculator,
  ExternalLink,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { SectionCard } from "../section-card";
import { Toggle } from "../field";
import { IXCConfigForm } from "@/components/ixc/ixc-config-form";

const CANAIS_DEFAULT = [
  { key: "whatsapp", label: "WhatsApp (Meta Cloud)", on: true, status: "conectado" },
  { key: "whatsapp-call", label: "WhatsApp Calling (voz/vídeo)", on: false, status: "configurar" },
  { key: "instagram", label: "Instagram Direct", on: false, status: "configurar" },
  { key: "messenger", label: "Facebook Messenger", on: false, status: "configurar" },
  { key: "email", label: "E-mail (SMTP)", on: true, status: "conectado" },
  { key: "telegram", label: "Telegram", on: false, status: "configurar" },
  { key: "voz", label: "Voz (Athostec/Asterisk SIP)", on: false, status: "em-pausa" },
];

const PROVIDERS_IA = [
  { key: "anthropic", label: "Anthropic (Claude)", on: true },
  { key: "openai", label: "OpenAI", on: false },
  { key: "google", label: "Google Vertex (Gemini)", on: false },
  { key: "elevenlabs", label: "ElevenLabs (TTS)", on: false },
];

const STATUS_CANAL: Record<string, { label: string; cor: string }> = {
  conectado: { label: "Conectado", cor: "text-emerald-500 bg-emerald-500/10" },
  configurar: { label: "Configurar", cor: "text-foreground/55 bg-foreground/[0.05]" },
  "em-pausa": { label: "Em pausa", cor: "text-amber-500 bg-amber-500/10" },
};

// =================================================================
// CATÁLOGO DE PROVIDERS DE GESTÃO (multi-vertical)
// =================================================================

type Vertical = "isp" | "erp" | "ecommerce";
type ProviderStatus = "conectado" | "disponivel" | "em-breve";

interface ProviderCard {
  key: string;
  nome: string;
  vertical: Vertical;
  site: string;
  descricao: string;
  status: ProviderStatus;
}

const PROVIDERS: ProviderCard[] = [
  // ===== ISP =====
  {
    key: "ixc",
    nome: "IXC Provedor",
    vertical: "isp",
    site: "ixcsoft.com.br",
    descricao: "Sistema completo pra ISPs (clientes, contratos, financeiro, OSS).",
    status: "disponivel",
  },
  {
    key: "mk",
    nome: "MK Solutions",
    vertical: "isp",
    site: "mksolutions.com.br",
    descricao: "Gestão de provedores de internet com forte foco em automação.",
    status: "em-breve",
  },
  {
    key: "voalle",
    nome: "Voalle",
    vertical: "isp",
    site: "voalle.com.br",
    descricao: "Plataforma de gestão pra provedores (financeiro + técnico).",
    status: "em-breve",
  },
  {
    key: "sgp",
    nome: "SGP",
    vertical: "isp",
    site: "sgp.net.br",
    descricao: "Sistema de Gerenciamento de Provedor (clientes, OS, financeiro).",
    status: "em-breve",
  },
  {
    key: "hubsoft",
    nome: "Hubsoft",
    vertical: "isp",
    site: "hubsoft.com.br",
    descricao: "ERP integrado pra provedores de internet.",
    status: "em-breve",
  },
  // ===== ERP (móveis premium, varejo, indústria) =====
  {
    key: "bling",
    nome: "Bling",
    vertical: "erp",
    site: "bling.com.br",
    descricao: "ERP em nuvem (NF-e, estoque, financeiro). Foco PMEs.",
    status: "em-breve",
  },
  {
    key: "tiny",
    nome: "Tiny ERP",
    vertical: "erp",
    site: "tiny.com.br",
    descricao: "ERP da Olist (vendas, estoque, marketplace).",
    status: "em-breve",
  },
  {
    key: "omie",
    nome: "Omie",
    vertical: "erp",
    site: "omie.com.br",
    descricao: "ERP em nuvem (financeiro, vendas, produção).",
    status: "em-breve",
  },
  // ===== E-commerce =====
  {
    key: "shopify",
    nome: "Shopify",
    vertical: "ecommerce",
    site: "shopify.com",
    descricao: "Plataforma global de e-commerce (clientes, pedidos, produtos).",
    status: "em-breve",
  },
  {
    key: "vtex",
    nome: "VTEX",
    vertical: "ecommerce",
    site: "vtex.com",
    descricao: "Plataforma enterprise de e-commerce (Brasil/LatAm).",
    status: "em-breve",
  },
  {
    key: "nuvemshop",
    nome: "Nuvemshop",
    vertical: "ecommerce",
    site: "nuvemshop.com.br",
    descricao: "E-commerce focado no Brasil/LatAm. Forte com PMEs.",
    status: "em-breve",
  },
];

const VERTICAL_INFO: Record<Vertical, { label: string; icon: LucideIcon; cor: string }> = {
  isp: { label: "Provedores de Internet (ISPs)", icon: Wifi, cor: "text-[var(--color-azure-500)]" },
  erp: { label: "ERPs (varejo, móveis, indústria)", icon: Calculator, cor: "text-violet-500" },
  ecommerce: { label: "E-commerce", icon: ShoppingBag, cor: "text-fuchsia-500" },
};

const STATUS_PROVIDER: Record<ProviderStatus, { label: string; cor: string }> = {
  conectado: { label: "Conectado", cor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
  disponivel: { label: "Disponível", cor: "text-[var(--color-azure-500)] bg-[var(--color-azure-500)]/10 border-[var(--color-azure-500)]/20" },
  "em-breve": { label: "Em breve", cor: "text-foreground/45 bg-foreground/[0.04] border-foreground/10" },
};

export function IntegracoesSection() {
  const [canais, setCanais] = useState(CANAIS_DEFAULT);
  const [providersIA, setProvidersIA] = useState(PROVIDERS_IA);
  const [providerExpandido, setProviderExpandido] = useState<string | null>(null);

  // Agrupa providers por vertical, mantém ordem da lista
  const providersPorVertical = (["isp", "erp", "ecommerce"] as const).map((v) => ({
    vertical: v,
    items: PROVIDERS.filter((p) => p.vertical === v),
  }));

  return (
    <SectionCard
      id="integracoes"
      icon={Plug}
      title="Integrações"
      description="Canais de comunicação, provedores de IA e o software de gestão da empresa (ISP, ERP, e-commerce)."
      iconClass="text-amber-500 bg-amber-500/10 border-amber-500/20"
    >
      {/* Canais */}
      <div>
        <p className="mb-3 text-[11px] font-black uppercase tracking-[0.2em] text-foreground/55">
          Canais de atendimento
        </p>
        <div className="space-y-2">
          {canais.map((c) => {
            const status = STATUS_CANAL[c.status]!;
            return (
              <div
                key={c.key}
                className="flex items-center justify-between gap-3 rounded-xl border border-foreground/[0.05] bg-foreground/[0.02] px-3 py-2.5"
              >
                <div className="flex flex-1 items-center gap-3">
                  <span className="text-sm text-foreground/85">{c.label}</span>
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider ${status.cor}`}
                  >
                    {status.label}
                  </span>
                </div>
                <Toggle
                  checked={c.on}
                  onChange={(v) =>
                    setCanais((arr) => arr.map((x) => (x.key === c.key ? { ...x, on: v } : x)))
                  }
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Providers IA */}
      <div>
        <p className="mb-3 text-[11px] font-black uppercase tracking-[0.2em] text-foreground/55">
          Provedores de IA
        </p>
        <div className="space-y-2">
          {providersIA.map((p) => (
            <div
              key={p.key}
              className="flex items-center justify-between gap-3 rounded-xl border border-foreground/[0.05] bg-foreground/[0.02] px-3 py-2.5"
            >
              <span className="text-sm text-foreground/85">{p.label}</span>
              <Toggle
                checked={p.on}
                onChange={(v) =>
                  setProvidersIA((arr) => arr.map((x) => (x.key === p.key ? { ...x, on: v } : x)))
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Software de gestão multi-provider */}
      <div>
        <div className="mb-3">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/55">
            Software de gestão
          </p>
          <p className="mt-1 text-[11px] text-foreground/50">
            Conecte o sistema que sua empresa já usa. MD Assessoria puxa clientes, contratos, pedidos
            e usa esses dados nos atendimentos da IA.
          </p>
        </div>

        <div className="space-y-5">
          {providersPorVertical.map(({ vertical, items }) => {
            const info = VERTICAL_INFO[vertical];
            const Icon = info.icon;
            return (
              <div key={vertical}>
                <div className="mb-2 flex items-center gap-2">
                  <Icon className={cn("h-3.5 w-3.5", info.cor)} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/65">
                    {info.label}
                  </span>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {items.map((p) => {
                    const expandido = providerExpandido === p.key;
                    const isIxc = p.key === "ixc";
                    const status = STATUS_PROVIDER[p.status];
                    const podeExpandir = p.status !== "em-breve";

                    return (
                      <div key={p.key} className="contents">
                        <button
                          type="button"
                          disabled={!podeExpandir}
                          onClick={() =>
                            setProviderExpandido((cur) => (cur === p.key ? null : p.key))
                          }
                          className={cn(
                            "group flex flex-col gap-2 rounded-xl border p-3 text-left transition-all",
                            expandido
                              ? "border-[var(--color-azure-500)]/40 bg-[var(--color-azure-500)]/5"
                              : "border-foreground/[0.08] bg-foreground/[0.02]",
                            podeExpandir
                              ? "hover:border-foreground/20 hover:bg-foreground/[0.04]"
                              : "cursor-not-allowed opacity-65",
                          )}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-foreground/10 bg-foreground/[0.04] text-[10px] font-black uppercase">
                                {p.nome.slice(0, 2)}
                              </div>
                              <div>
                                <p className="text-sm font-black tracking-tight">{p.nome}</p>
                                <a
                                  href={`https://${p.site}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center gap-0.5 text-[9px] font-bold text-foreground/40 hover:text-foreground/70"
                                >
                                  {p.site} <ExternalLink className="h-2.5 w-2.5" />
                                </a>
                              </div>
                            </div>
                            <span
                              className={cn(
                                "shrink-0 rounded-md border px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider",
                                status.cor,
                              )}
                            >
                              {status.label}
                            </span>
                          </div>
                          <p className="text-[11px] leading-relaxed text-foreground/55 line-clamp-2">
                            {p.descricao}
                          </p>
                          {podeExpandir && (
                            <div className="mt-1 flex items-center justify-between">
                              <span className="text-[10px] font-black uppercase tracking-wider text-[var(--color-azure-500)]">
                                {expandido ? "Fechar" : isIxc ? "Configurar" : "Conectar"}
                              </span>
                              <ChevronDown
                                className={cn(
                                  "h-3.5 w-3.5 text-foreground/40 transition-transform",
                                  expandido && "rotate-180 text-[var(--color-azure-500)]",
                                )}
                              />
                            </div>
                          )}
                        </button>
                        {/* Form expandido só pra IXC */}
                        {expandido && isIxc && (
                          <div className="sm:col-span-2">
                            <div className="rounded-2xl border border-[var(--color-azure-500)]/20 bg-foreground/[0.02] p-4">
                              <IXCConfigForm />
                            </div>
                          </div>
                        )}
                        {expandido && !isIxc && (
                          <div className="sm:col-span-2">
                            <div className="rounded-2xl border border-dashed border-foreground/10 bg-foreground/[0.02] p-4 text-center text-[11px] text-foreground/55">
                              <CheckCircle2 className="mx-auto mb-2 h-5 w-5 text-foreground/30" />
                              Adapter pra <strong>{p.nome}</strong> ainda não foi implementado.{" "}
                              Esqueleto pronto em <code>packages/providers/{p.key}</code> — faltam o
                              client HTTP e os métodos do <code>ProviderAdapter</code>.
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-4 rounded-xl border border-dashed border-foreground/10 bg-foreground/[0.02] p-3 text-[11px] text-foreground/55">
          Cada provider implementa o contrato comum <code className="text-foreground/70">ProviderAdapter</code>{" "}
          (em <code className="text-foreground/70">@md/providers-core</code>): <code>ping</code>,{" "}
          <code>listarClientes</code>, <code>listarContratos</code>, <code>listarPedidos</code> etc.
          UI e agentes IA leem dados unificados — não importa qual sistema a empresa usa.
        </p>
      </div>
    </SectionCard>
  );
}
