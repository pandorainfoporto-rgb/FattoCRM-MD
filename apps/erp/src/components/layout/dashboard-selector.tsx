"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, LayoutDashboard, Search } from "lucide-react";
import { cn } from "@/lib/cn";
import { DASHBOARDS, type DashboardItem } from "./dashboards-config";

export function DashboardSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const fallback = DASHBOARDS[0]!;
  const [selected, setSelected] = useState<DashboardItem>(fallback);

  // Sincroniza o selecionado com a rota atual.
  useEffect(() => {
    const matched = DASHBOARDS.find((d) => d.href === pathname);
    if (matched) setSelected(matched);
  }, [pathname]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return DASHBOARDS;
    return DASHBOARDS.filter(
      (d) =>
        d.nome.toLowerCase().includes(q) ||
        d.categoria.toLowerCase().includes(q),
    );
  }, [search]);

  const SelectedIcon = selected.icon;

  const handleSelect = (d: DashboardItem) => {
    setSelected(d);
    setIsOpen(false);
    setSearch("");
    router.push(d.href as never);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="group flex h-9 items-center gap-2 rounded-xl border border-foreground/10 bg-foreground/[0.03] px-3 transition-all hover:border-[var(--color-azure-500)]/40 active:scale-95"
      >
        <div className="rounded-md bg-[var(--color-azure-500)]/10 p-1 text-[var(--color-azure-500)]">
          <SelectedIcon className="h-3.5 w-3.5" />
        </div>
        <span className="text-[11px] font-black uppercase tracking-tight text-foreground">
          {selected.nome}
        </span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-foreground/40 transition-transform duration-300",
            isOpen && "rotate-180 text-[var(--color-azure-500)]",
          )}
        />
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Fechar"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setIsOpen(false)}
          />
          <div className="animate-fade-in absolute left-0 top-full z-50 mt-3 w-80 overflow-hidden rounded-3xl border border-foreground/10 bg-[var(--color-background-elevated)] p-2 shadow-2xl">
            <div className="mb-2 border-b border-foreground/[0.05] p-3">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/30" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Pesquisar dashboard…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-foreground/[0.05] bg-foreground/[0.03] py-3 pl-11 pr-4 text-xs font-bold text-foreground placeholder:text-foreground/30 focus:border-[var(--color-azure-500)]/50 focus:outline-none"
                />
              </div>
            </div>

            <div className="custom-scrollbar max-h-80 space-y-1 overflow-y-auto p-1">
              {filtered.map((d) => {
                const Icon = d.icon;
                const isActive = selected.slug === d.slug;
                return (
                  <button
                    type="button"
                    key={d.slug}
                    onClick={() => handleSelect(d)}
                    className={cn(
                      "group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border p-4 text-left transition-all",
                      isActive
                        ? "border-[var(--color-azure-500)]/30 bg-[var(--color-azure-500)]/10 shadow-sm"
                        : "border-transparent hover:bg-foreground/[0.04]",
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-xl p-3 transition-all",
                        isActive
                          ? "bg-[var(--color-azure-500)] text-white shadow-lg"
                          : "bg-foreground/[0.05] text-foreground/30 group-hover:bg-[var(--color-azure-500)]/10 group-hover:text-[var(--color-azure-500)]",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p
                        className={cn(
                          "text-xs font-black uppercase tracking-tight",
                          isActive
                            ? "text-foreground"
                            : "text-foreground/60 group-hover:text-foreground",
                        )}
                      >
                        {d.nome}
                      </p>
                      <p className="text-[9px] font-black italic uppercase tracking-[0.2em] text-foreground/30">
                        {d.categoria}
                      </p>
                    </div>
                    {isActive && (
                      <div className="absolute right-4 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[var(--color-azure-500)] shadow-[0_0_8px_rgba(0,82,255,0.5)]" />
                    )}
                  </button>
                );
              })}
              {filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 opacity-20">
                  <LayoutDashboard className="h-8 w-8" />
                  <p className="mt-4 text-[10px] font-black uppercase tracking-[0.4em]">
                    Nenhum Resultado
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
