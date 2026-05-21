"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { AttendantStatus } from "./attendant-status";
import { DashboardSelector } from "./dashboard-selector";
import { TOP_NAV } from "./menu-config";

interface Profile {
  nome: string;
  role: string;
}

const ROLE_LABEL: Record<string, string> = {
  admin: "Admin",
  gestor: "Gestor",
  consultor: "Consultor",
  atendente: "Atendente",
};

export function TopHeader({
  profile = { nome: "Renato", role: "admin" },
}: {
  profile?: Profile;
}) {
  const pathname = usePathname();

  const initials = (profile.nome || "U")
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="glass-header sticky top-0 z-50 flex h-16 items-center gap-2 border-b border-foreground/[0.08] px-4 sm:gap-4 sm:px-6">
      {/* Logo */}
      <Link
        href="/dashboard"
        title="MD Assessoria"
        className="flex shrink-0 items-center gap-2"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-cyan)] text-white shadow-brand">
          <span className="text-sm font-black tracking-tight">F</span>
        </div>
      </Link>

      {/* Dashboard selector */}
      <div className="hidden lg:block">
        <DashboardSelector />
      </div>

      {/* Top nav */}
      <nav className="ml-2 flex flex-1 items-center gap-0.5 overflow-x-auto sm:gap-1">
        {TOP_NAV.map((n) => {
          const active = isActive(n.href);
          return (
            <Link
              key={n.href}
              href={n.href as never}
              className={cn(
                "rounded-xl px-3 py-1.5 text-[11px] font-black uppercase tracking-wider transition-all whitespace-nowrap",
                active
                  ? "bg-foreground/[0.08] text-foreground shadow-inner"
                  : "text-foreground/55 hover:bg-foreground/[0.04] hover:text-foreground",
              )}
            >
              {n.label}
            </Link>
          );
        })}
      </nav>

      {/* Right cluster */}
      <div className="flex shrink-0 items-center gap-1">
        <ThemeToggle />
        <button
          type="button"
          aria-label="Notificações"
          title="Notificações"
          className="relative rounded-xl p-2 text-foreground/40 transition-all hover:bg-foreground/[0.05] hover:text-foreground"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full border border-[var(--color-background)] bg-[var(--color-brand-primary)]" />
        </button>
        <div className="hidden md:block">
          <AttendantStatus />
        </div>
      </div>

      {/* Profile */}
      <div className="flex shrink-0 items-center gap-2 border-l border-foreground/[0.08] pl-3">
        <div className="hidden text-right leading-tight lg:block">
          <div className="text-[11px] font-black tracking-tight text-foreground">
            {profile.nome}
          </div>
          <div className="text-[8px] font-bold uppercase tracking-[0.3em] text-[var(--color-azure-500)]">
            {ROLE_LABEL[profile.role] ?? profile.role}
          </div>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-cyan)] text-[10px] font-black text-white shadow-brand">
          {initials}
        </div>
      </div>
    </header>
  );
}
