"use client";

import { useState } from "react";
import { Settings, Plus, X } from "lucide-react";
import { SectionCard } from "../section-card";
import { Field, TextInput } from "../field";

export function SistemaSection() {
  const [webhooks, setWebhooks] = useState<Array<{ id: number; evento: string; url: string }>>([
    { id: 1, evento: "atendimento.criado", url: "" },
    { id: 2, evento: "lead.qualificado", url: "" },
  ]);
  const [versao] = useState("v0.0.x");

  const addWebhook = () =>
    setWebhooks((arr) => [...arr, { id: Date.now(), evento: "", url: "" }]);
  const removeWebhook = (id: number) =>
    setWebhooks((arr) => arr.filter((w) => w.id !== id));

  return (
    <SectionCard
      id="sistema"
      icon={Settings}
      title="Sistema"
      description="Webhooks de saída, versão atual e informações da plataforma."
      iconClass="text-foreground/65 bg-foreground/[0.05] border-foreground/10"
    >
      {/* Webhooks */}
      <div>
        <p className="mb-3 text-[11px] font-black uppercase tracking-[0.2em] text-foreground/55">
          Webhooks
        </p>
        <div className="space-y-2">
          {webhooks.map((w) => (
            <div
              key={w.id}
              className="grid gap-2 rounded-xl border border-foreground/[0.05] bg-foreground/[0.02] p-3 sm:grid-cols-[180px_1fr_auto]"
            >
              <TextInput
                value={w.evento}
                onChange={(e) => {
                  const v = e.target.value;
                  setWebhooks((arr) =>
                    arr.map((x) => (x.id === w.id ? { ...x, evento: v } : x)),
                  );
                }}
                placeholder="evento.tipo"
                className="font-mono text-xs"
              />
              <TextInput
                value={w.url}
                onChange={(e) => {
                  const v = e.target.value;
                  setWebhooks((arr) => arr.map((x) => (x.id === w.id ? { ...x, url: v } : x)));
                }}
                placeholder="https://"
              />
              <button
                type="button"
                aria-label="Remover"
                onClick={() => removeWebhook(w.id)}
                className="rounded-lg p-2 text-foreground/40 transition-colors hover:bg-rose-500/10 hover:text-rose-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addWebhook}
            className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-foreground/15 px-3 py-2 text-[11px] font-black uppercase tracking-wider text-foreground/55 hover:border-foreground/30 hover:text-foreground"
          >
            <Plus className="h-3.5 w-3.5" /> Novo webhook
          </button>
        </div>
      </div>

      {/* Sobre */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Versão">
          <TextInput value={versao} readOnly className="font-mono" />
        </Field>
        <Field label="Ambiente">
          <TextInput value="produção" readOnly />
        </Field>
      </div>

      <div className="rounded-xl border border-foreground/[0.05] bg-foreground/[0.02] p-4 text-[11px] text-foreground/55">
        <p className="font-bold text-foreground/75">MD Assessoria — plataforma-base</p>
        <p className="mt-1">
          Plataforma agnóstica de CRM omnichannel + agentes IA. Substitui as áreas de
          atendimento, captação e suporte de qualquer operação. PT-BR, dark/light, multi-tenant
          (quando o schema entrar).
        </p>
      </div>
    </SectionCard>
  );
}
