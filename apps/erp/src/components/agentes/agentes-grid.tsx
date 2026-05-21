"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Filter, Search, Users } from "lucide-react";
import {
  AGENTES,
  MODELO_LABEL,
  NIVEL_LABEL,
  SETOR_INFO,
  STATUS_LABEL,
  type Agente,
  type AgenteNivel,
  type AgenteStatus,
  type Setor,
} from "./agentes-mock";
import { cn } from "@/lib/cn";

export function AgentesGrid() {
  const [search, setSearch] = useState("");
  const [setor, setSetor] = useState<Setor | "all">("all");
  const [nivel, setNivel] = useState<AgenteNivel | "all">("all");
  const [status, setStatus] = useState<AgenteStatus | "all">("all");
  const [aberto, setAberto] = useState<Agente | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return AGENTES.filter((a) => {
      if (setor !== "all" && a.setor !== setor) return false;
      if (nivel !== "all" && a.nivel !== nivel) return false;
      if (status !== "all" && a.status !== status) return false;
      if (q) {
        return (
          a.codigo.toLowerCase().includes(q) ||
          a.nome.toLowerCase().includes(q) ||
          a.cargo.toLowerCase().includes(q) ||
          a.descricao.toLowerCase().includes(q) ||
          a.skills.some((s) => s.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [search, setor, nivel, status]);

  // Contagem por setor pra mostrar nas pills
  const setoresCount = useMemo(() => {
    const counts: Record<string, number> = { all: AGENTES.length };
    for (const a of AGENTES) counts[a.setor] = (counts[a.setor] ?? 0) + 1;
    return counts;
  }, []);

  return (
    <div className="space-y-6">
      {/* Métricas topo */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Metric label="Total de agentes" value={AGENTES.length.toString()} />
        <Metric label="Ativos" value={AGENTES.filter((a) => a.status === "ativo").length.toString()} accent />
        <Metric label="Treinando" value={AGENTES.filter((a) => a.status === "treinando").length.toString()} />
        <Metric label="Setores" value={Object.keys(SETOR_INFO).length.toString()} />
      </div>

      {/* Filtros */}
      <div className="glass space-y-3 rounded-2xl border border-foreground/[0.08] p-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/30" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por código, nome, cargo, skill…"
              className="w-full rounded-xl border border-foreground/10 bg-foreground/[0.03] py-2.5 pl-10 pr-3 text-sm focus:border-[var(--color-azure-500)]/40 focus:outline-none"
            />
          </div>
          <SelectFilter
            label="Nível"
            value={nivel}
            onChange={(v) => setNivel(v as AgenteNivel | "all")}
            options={[
              { value: "all", label: "Todos" },
              { value: "ceo", label: "CEO" },
              { value: "manager", label: "Managers" },
              { value: "especialista", label: "Especialistas" },
            ]}
          />
          <SelectFilter
            label="Status"
            value={status}
            onChange={(v) => setStatus(v as AgenteStatus | "all")}
            options={[
              { value: "all", label: "Todos" },
              { value: "ativo", label: "Ativo" },
              { value: "treinando", label: "Treinando" },
              { value: "pausado", label: "Pausado" },
              { value: "rascunho", label: "Rascunho" },
            ]}
          />
        </div>

        {/* Pills de setor */}
        <div className="flex flex-wrap gap-1.5">
          <SetorPill
            label="Todos"
            active={setor === "all"}
            count={setoresCount["all"] ?? 0}
            onClick={() => setSetor("all")}
          />
          {(Object.keys(SETOR_INFO) as Setor[]).map((s) => {
            const info = SETOR_INFO[s];
            const SetorIcon = info.icon;
            return (
              <SetorPill
                key={s}
                label={info.label}
                icon={SetorIcon}
                cor={info.cor}
                active={setor === s}
                count={setoresCount[s] ?? 0}
                onClick={() => setSetor(s)}
              />
            );
          })}
        </div>
      </div>

      {/* Resultado */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/55">
          {filtered.length} de {AGENTES.length} agentes
        </p>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-16 opacity-30">
          <Users className="h-10 w-10" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em]">Nenhum agente encontrado</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((a) => (
            <AgenteCard key={a.codigo} agente={a} onClick={() => setAberto(a)} />
          ))}
        </div>
      )}

      {/* Drawer com detalhes */}
      {aberto && <AgenteDrawer agente={aberto} onClose={() => setAberto(null)} />}
    </div>
  );
}

function Metric({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className={cn(
        "glass rounded-2xl border p-4",
        accent ? "border-[var(--color-brand-cyan)]/30 shadow-brand" : "border-foreground/[0.08]",
      )}
    >
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/55">{label}</p>
      <p className="mt-1 text-2xl font-black tabular-nums tracking-tight">{value}</p>
    </div>
  );
}

function SelectFilter({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex items-center gap-2 text-xs">
      <Filter className="h-3 w-3 text-foreground/40" />
      <span className="text-[10px] font-black uppercase tracking-widest text-foreground/55">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-foreground/10 bg-foreground/[0.03] px-2 py-1.5 text-xs font-bold focus:border-[var(--color-azure-500)]/40 focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function SetorPill({
  label,
  icon: Icon,
  cor,
  active,
  count,
  onClick,
}: {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  cor?: string;
  active: boolean;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider transition-all",
        active
          ? "border-[var(--color-azure-500)] bg-[var(--color-azure-500)]/10 text-[var(--color-azure-500)]"
          : "border-foreground/10 bg-foreground/[0.03] text-foreground/65 hover:border-foreground/20 hover:text-foreground",
      )}
    >
      {Icon && <Icon className={cn("h-3 w-3", active ? "" : cor)} />}
      <span>{label}</span>
      <span className="rounded-md bg-foreground/[0.08] px-1.5 py-0.5 text-[9px] tabular-nums">{count}</span>
    </button>
  );
}

function AgenteCard({ agente, onClick }: { agente: Agente; onClick: () => void }) {
  const Icon = agente.icon;
  const statusInfo = STATUS_LABEL[agente.status];
  const setorInfo = SETOR_INFO[agente.setor];
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      className="glass group relative cursor-pointer overflow-hidden rounded-2xl border border-foreground/[0.08] p-5 transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-3">
        <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl border border-foreground/[0.08]", setorInfo.bg)}>
          <Icon className={cn("h-5 w-5", setorInfo.cor)} />
        </div>
        <div className={cn("flex items-center gap-1.5 rounded-full border border-foreground/10 bg-foreground/[0.03] px-2.5 py-1 text-[9px] font-black uppercase tracking-widest", statusInfo.cor)}>
          <span className={cn("h-1.5 w-1.5 rounded-full", statusInfo.dot)} />
          {statusInfo.label}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-foreground/40">
          {agente.codigo} · {NIVEL_LABEL[agente.nivel]}
        </p>
        <h3 className="mt-1 text-base font-black tracking-tight">{agente.nome}</h3>
        <p className="mt-0.5 text-xs text-foreground/65">{agente.cargo}</p>
        <p className="mt-3 text-xs leading-relaxed text-foreground/55 line-clamp-2">{agente.descricao}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        <span className="rounded-md border border-foreground/10 bg-foreground/[0.03] px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-foreground/65">
          {MODELO_LABEL[agente.modelo]}
        </span>
        <span className="rounded-md border border-foreground/10 bg-foreground/[0.03] px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-foreground/65">
          {agente.tools.length} tools
        </span>
        <span className="rounded-md border border-foreground/10 bg-foreground/[0.03] px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-foreground/65">
          {agente.skills.length} skills
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-foreground/[0.05] pt-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">
          {setorInfo.label}
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-[var(--color-azure-500)] transition-transform group-hover:translate-x-0.5">
          Detalhes
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </article>
  );
}

function AgenteDrawer({ agente, onClose }: { agente: Agente; onClose: () => void }) {
  const Icon = agente.icon;
  const statusInfo = STATUS_LABEL[agente.status];
  const setorInfo = SETOR_INFO[agente.setor];

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog">
      <button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <div className="relative flex h-full w-full max-w-lg flex-col overflow-hidden border-l border-foreground/[0.08] bg-[var(--color-background-elevated)] shadow-2xl">
        <header className="flex items-start gap-4 border-b border-foreground/[0.08] p-5">
          <div className={cn("flex h-14 w-14 items-center justify-center rounded-2xl border border-foreground/[0.08]", setorInfo.bg)}>
            <Icon className={cn("h-6 w-6", setorInfo.cor)} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/45">
              {agente.codigo} · {NIVEL_LABEL[agente.nivel]} · {setorInfo.label}
            </p>
            <h2 className="mt-1 text-2xl font-black tracking-tight">{agente.nome}</h2>
            <p className="mt-0.5 text-sm text-foreground/65">{agente.cargo}</p>
            <div className={cn("mt-2 inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-foreground/[0.03] px-2.5 py-1 text-[10px] font-black uppercase tracking-widest", statusInfo.cor)}>
              <span className={cn("h-1.5 w-1.5 rounded-full", statusInfo.dot)} />
              {statusInfo.label}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="rounded-lg p-2 text-foreground/55 transition-colors hover:bg-foreground/[0.05] hover:text-foreground"
          >
            ✕
          </button>
        </header>

        <div className="custom-scrollbar flex-1 overflow-y-auto p-5">
          <Section titulo="Descrição">
            <p className="text-sm leading-relaxed text-foreground/80">{agente.descricao}</p>
          </Section>

          <Section titulo="Modelo LLM">
            <div className="inline-flex items-center gap-2 rounded-xl border border-foreground/10 bg-foreground/[0.03] px-3 py-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-foreground/55">Modelo</span>
              <span className="text-sm font-black tracking-tight">{MODELO_LABEL[agente.modelo]}</span>
            </div>
          </Section>

          <Section titulo={`Skills · ${agente.skills.length}`}>
            <ul className="space-y-1.5">
              {agente.skills.map((s) => (
                <li
                  key={s}
                  className="rounded-lg border border-foreground/[0.08] bg-foreground/[0.02] px-3 py-2 text-xs font-medium text-foreground/80"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Section>

          <Section titulo={`Tools · ${agente.tools.length}`}>
            <div className="flex flex-wrap gap-1.5">
              {agente.tools.map((t) => (
                <code
                  key={t}
                  className="rounded-md border border-[var(--color-azure-500)]/20 bg-[var(--color-azure-500)]/5 px-2 py-1 text-[11px] font-mono text-[var(--color-azure-500)]"
                >
                  {t}
                </code>
              ))}
            </div>
          </Section>

          {agente.kbCategorias.length > 0 && (
            <Section titulo={`Categorias de KB · ${agente.kbCategorias.length}`}>
              <div className="flex flex-wrap gap-1.5">
                {agente.kbCategorias.map((k) => (
                  <span
                    key={k}
                    className="rounded-md border border-violet-500/20 bg-violet-500/5 px-2 py-1 text-[11px] font-bold text-violet-600 dark:text-violet-400"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {agente.manager && (
            <Section titulo="Manager">
              <span className="rounded-md border border-foreground/10 bg-foreground/[0.03] px-2 py-1 text-[11px] font-black uppercase tracking-wider text-foreground/70">
                {agente.manager}
              </span>
            </Section>
          )}

          <div className="mt-6 rounded-2xl border border-dashed border-foreground/15 bg-foreground/[0.02] p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/55">Próximo passo</p>
            <p className="mt-1.5 text-xs leading-relaxed text-foreground/65">
              Aqui virá a página de configuração com system prompt editável (com brand-card injetado),
              playground de teste em tempo real, regras de escalação e métricas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="mb-5">
      <h3 className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-foreground/55">{titulo}</h3>
      {children}
    </section>
  );
}
