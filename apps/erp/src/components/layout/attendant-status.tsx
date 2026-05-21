"use client";

import { useState } from "react";
import { ChevronDown, Circle, Coffee, LogOut, Moon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Status do atendente (Online / Em pausa / Ausente / Offline).
 *
 * Inspirado no padrão OPA Suite — controle visível do estado do atendente
 * pra orientar a fila de distribuição e relatórios de produtividade.
 *
 * Hoje é apenas estado local de UI. Quando o backend entrar:
 *  - Sincroniza via Supabase Realtime com tabela `atendente_presenca`
 *  - Distribuição de leads/atendimentos lê esse status
 *  - Pausas curtas (café, banheiro, almoço) viram registros de tempo
 */

type StatusKey = "online" | "pausa" | "ausente" | "offline";

interface StatusOption {
  key: StatusKey;
  label: string;
  icon: LucideIcon;
  color: string;
  ring: string;
}

const STATUS: StatusOption[] = [
  { key: "online", label: "Online", icon: Circle, color: "text-emerald-500", ring: "bg-emerald-500" },
  { key: "pausa", label: "Em pausa", icon: Coffee, color: "text-amber-500", ring: "bg-amber-500" },
  { key: "ausente", label: "Ausente", icon: Moon, color: "text-slate-400", ring: "bg-slate-400" },
  { key: "offline", label: "Offline", icon: LogOut, color: "text-foreground/40", ring: "bg-foreground/30" },
];

export function AttendantStatus() {
  const [current, setCurrent] = useState<StatusKey>("online");
  const [open, setOpen] = useState(false);

  const active = STATUS.find((s) => s.key === current) ?? STATUS[0]!;
  const ActiveIcon = active.icon;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group flex items-center gap-2 rounded-xl border border-foreground/10 bg-foreground/[0.03] px-3 py-2 transition-all hover:border-foreground/20"
      >
        <span className="relative flex h-2 w-2 items-center justify-center">
          <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-60", active.ring)} />
          <span className={cn("relative inline-flex h-2 w-2 rounded-full", active.ring)} />
        </span>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/80">
          {active.label}
        </span>
        <ChevronDown
          className={cn(
            "h-3 w-3 text-foreground/40 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Fechar"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div className="animate-fade-in absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-foreground/10 bg-[var(--color-background-elevated)] p-1.5 shadow-2xl">
            {STATUS.map((s) => {
              const Icon = s.icon;
              const isActive = s.key === current;
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => {
                    setCurrent(s.key);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                    isActive
                      ? "bg-foreground/[0.06]"
                      : "hover:bg-foreground/[0.04]",
                  )}
                >
                  <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-foreground/[0.05]">
                    <Icon className={cn("h-3.5 w-3.5", s.color)} />
                  </span>
                  <div className="flex-1">
                    <p className="text-xs font-black uppercase tracking-tight text-foreground">
                      {s.label}
                    </p>
                  </div>
                  {isActive && (
                    <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-azure-500)] shadow-[0_0_6px_rgba(0,82,255,0.5)]" />
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
