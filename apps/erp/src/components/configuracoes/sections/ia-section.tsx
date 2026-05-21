"use client";

import { useState } from "react";
import { Bot } from "lucide-react";
import { SectionCard } from "../section-card";
import { Field, SelectInput, Toggle } from "../field";

export function IASection() {
  const [config, setConfig] = useState({
    modelo: "claude-haiku-4-5",
    temperatura: "0.4",
    aprovacaoHumana: true,
    fluxosAtivos: true,
    rotinasAtivas: true,
  });
  const update = (k: keyof typeof config, v: string | boolean) =>
    setConfig((c) => ({ ...c, [k]: v }));

  return (
    <SectionCard
      id="ia"
      icon={Bot}
      title="Automação IA"
      description="Modelo padrão dos agentes, fluxos automáticos e regras de aprovação humana antes de qualquer escrita crítica."
      iconClass="text-violet-500 bg-violet-500/10 border-violet-500/20"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Modelo padrão" hint="Usado por agentes que não sobrescrevem.">
          <SelectInput
            value={config.modelo}
            onChange={(e) => update("modelo", e.target.value)}
          >
            <option value="claude-opus-4-7">Claude Opus 4.7 — raciocínio complexo</option>
            <option value="claude-sonnet-4-6">Claude Sonnet 4.6 — equilibrado</option>
            <option value="claude-haiku-4-5">Claude Haiku 4.5 — rápido e barato</option>
          </SelectInput>
        </Field>
        <Field label="Temperatura" hint="0 = determinístico, 1 = criativo.">
          <SelectInput
            value={config.temperatura}
            onChange={(e) => update("temperatura", e.target.value)}
          >
            <option value="0">0 — determinístico</option>
            <option value="0.2">0.2</option>
            <option value="0.4">0.4 (padrão)</option>
            <option value="0.7">0.7</option>
            <option value="1">1 — criativo</option>
          </SelectInput>
        </Field>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3 rounded-xl border border-foreground/[0.05] bg-foreground/[0.02] px-3 py-2.5">
          <div className="flex-1">
            <p className="text-sm font-bold text-foreground/85">Aprovação humana antes de escrita crítica</p>
            <p className="mt-0.5 text-[10px] text-foreground/40">
              Toda escrita IA passa por <code>ag_acoes_propostas</code> → humano aprova.
            </p>
          </div>
          <Toggle checked={config.aprovacaoHumana} onChange={(v) => update("aprovacaoHumana", v)} />
        </div>

        <div className="flex items-center justify-between gap-3 rounded-xl border border-foreground/[0.05] bg-foreground/[0.02] px-3 py-2.5">
          <div className="flex-1">
            <p className="text-sm font-bold text-foreground/85">Fluxos de comunicação ativos</p>
            <p className="mt-0.5 text-[10px] text-foreground/40">
              Roteamento automático de mensagens entre agentes.
            </p>
          </div>
          <Toggle checked={config.fluxosAtivos} onChange={(v) => update("fluxosAtivos", v)} />
        </div>

        <div className="flex items-center justify-between gap-3 rounded-xl border border-foreground/[0.05] bg-foreground/[0.02] px-3 py-2.5">
          <div className="flex-1">
            <p className="text-sm font-bold text-foreground/85">Rotinas automáticas ativas</p>
            <p className="mt-0.5 text-[10px] text-foreground/40">
              Cron de agentes (relatórios, resumos, follow-ups).
            </p>
          </div>
          <Toggle checked={config.rotinasAtivas} onChange={(v) => update("rotinasAtivas", v)} />
        </div>
      </div>
    </SectionCard>
  );
}
