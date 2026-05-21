"use client";

import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";
import { ATENDIMENTO_TABS, type AtendimentoTab } from "./atendimento-tabs";
import { InboxShell } from "./inbox-shell";
import { InternoShell } from "./interno-shell";
import { CONVERSAS, type StatusAtendimento } from "./mock-data";

/**
 * Página principal de atendimento.
 *
 * As 10 abas do topo (Renato 2026-05-04/05) NÃO são páginas separadas.
 * As abas que mostram inbox compartilham o MESMO layout, só com filtro
 * de status diferente:
 *
 *   "em_atendimento"  → InboxShell filtrado por statusAtendimento === "humano"
 *   "fila"            → ... === "fila"   (transferido da IA, aguarda atendente)
 *   "ia"              → ... === "ia"     (agentes IA atendendo agora)
 *   "arquivados"      → ... === "arquivado"
 *
 * As outras (inicial, estatísticas, conversa interna, grupo interno,
 * telefonia ia, faq) são views distintas — placeholder por enquanto.
 */

const TAB_TO_STATUS: Partial<Record<AtendimentoTab, StatusAtendimento>> = {
  em_atendimento: "humano",
  fila: "fila",
  ia: "ia",
  arquivados: "arquivado",
};

const INBOX_TABS: AtendimentoTab[] = ["em_atendimento", "fila", "ia", "arquivados"];

export function AtendimentoPage() {
  const [tab, setTab] = useState<AtendimentoTab>("em_atendimento");

  // Contadores dinâmicos baseados em mock-data — backend vai substituir
  const dynamicCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const c of CONVERSAS) counts[c.statusAtendimento] = (counts[c.statusAtendimento] ?? 0) + 1;
    return counts;
  }, []);

  const isInboxTab = INBOX_TABS.includes(tab);
  const filtroStatus = TAB_TO_STATUS[tab] ?? null;

  return (
    <div className="flex h-[calc(100vh-9.5rem)] flex-col gap-3">
      {/* Tabs topo */}
      <nav className="glass flex shrink-0 gap-1 overflow-x-auto rounded-2xl border border-foreground/[0.08] p-1.5">
        {ATENDIMENTO_TABS.map((t) => {
          const Icon = t.icon;
          const isActive = tab === t.key;
          const status = TAB_TO_STATUS[t.key];
          const dynamicCount = status ? dynamicCounts[status] : undefined;
          const count = dynamicCount ?? t.count;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={cn(
                "group relative inline-flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-[11px] font-black uppercase tracking-tight transition-all",
                isActive
                  ? "bg-[var(--color-azure-500)] text-white shadow-md shadow-[var(--color-azure-500)]/20"
                  : "text-foreground/65 hover:bg-foreground/[0.05] hover:text-foreground",
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{t.label}</span>
              {typeof count === "number" && count > 0 && (
                <span
                  className={cn(
                    "ml-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[9px] font-black tabular-nums",
                    isActive ? "bg-white/25 text-white" : "bg-[var(--color-brand-primary)] text-white",
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Conteúdo */}
      <div className="flex flex-1 overflow-hidden">
        {isInboxTab ? (
          <div className="flex-1">
            <InboxShell filtroStatus={filtroStatus} />
          </div>
        ) : tab === "conversa_interna" ? (
          <div className="flex-1">
            <InternoShell modo="1on1" />
          </div>
        ) : tab === "grupo_interno" ? (
          <div className="flex-1">
            <InternoShell modo="grupo" />
          </div>
        ) : (
          <PlaceholderTab tab={tab} />
        )}
      </div>
    </div>
  );
}

function PlaceholderTab({ tab }: { tab: AtendimentoTab }) {
  const t = ATENDIMENTO_TABS.find((x) => x.key === tab);
  const Icon = t?.icon ?? Sparkles;
  return (
    <div className="glass flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl border border-foreground/[0.08]">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground/[0.04] text-foreground/40">
        <Icon className="h-7 w-7" />
      </div>
      <h2 className="text-lg font-black tracking-tight">{t?.label}</h2>
      <p className="max-w-md text-center text-sm text-foreground/55">
        Esta visão será populada quando o backend de atendimento entrar.
      </p>
      <span className="rounded-full border border-foreground/10 bg-foreground/[0.03] px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em] text-foreground/55">
        Em construção
      </span>
    </div>
  );
}
