import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Inbox,
  MessageSquare,
  Sparkles,
  Users,
} from "lucide-react";
import { cn } from "@/lib/cn";

// Dashboard SHELL — só estrutura visual.
// Quando os dados reais chegarem (lista de campos do Renato), os números
// virão do Supabase via Server Components. Aqui é tudo placeholder.

interface KpiProps {
  label: string;
  value: string;
  delta?: { value: string; trend: "up" | "down" | "flat" };
  icon: LucideIcon;
  accent?: boolean;
}

function KpiCard({ label, value, delta, icon: Icon, accent = false }: KpiProps) {
  const TrendIcon =
    delta?.trend === "up" ? ArrowUpRight : delta?.trend === "down" ? ArrowDownRight : null;
  const trendColor =
    delta?.trend === "up"
      ? "text-emerald-500"
      : delta?.trend === "down"
        ? "text-rose-500"
        : "text-foreground/40";

  return (
    <article
      className={cn(
        "glass relative overflow-hidden rounded-2xl border p-6 transition-all hover:shadow-lg",
        accent
          ? "border-[var(--color-brand-cyan)]/30 shadow-brand"
          : "border-foreground/[0.08]",
      )}
    >
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl border transition",
            accent
              ? "border-[var(--color-brand-cyan)]/30 bg-[var(--color-brand-cyan)]/10 text-[var(--color-brand-cyan)]"
              : "border-foreground/[0.12] bg-foreground/[0.05] text-foreground/60",
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        {delta && TrendIcon && (
          <div className={cn("flex items-center gap-1 text-xs font-bold", trendColor)}>
            <TrendIcon className="h-3.5 w-3.5" />
            <span>{delta.value}</span>
          </div>
        )}
      </div>
      <p className="mt-5 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/55">
        {label}
      </p>
      <p className="mt-2 text-3xl font-black tracking-tight">{value}</p>
    </article>
  );
}

function ActivityRow({
  title,
  detail,
  time,
}: {
  title: string;
  detail: string;
  time: string;
}) {
  return (
    <li className="flex items-start gap-3 rounded-xl border border-foreground/[0.08] p-4 transition-colors hover:bg-foreground/[0.03]">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-foreground/[0.12] bg-foreground/[0.05] text-foreground/55">
        <Activity className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold leading-tight">{title}</p>
        <p className="mt-1 text-xs text-foreground/55">{detail}</p>
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/40">
        {time}
      </span>
    </li>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/55">
            Visão Geral
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-foreground/60">
            Bem-vindo ao MD Assessoria. Aqui você vê o pulso da operação.
          </p>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-[var(--color-brand-cyan)]/20 bg-[var(--color-brand-cyan)]/5 px-3 py-1.5 sm:flex">
          <Sparkles className="h-3.5 w-3.5 text-[var(--color-brand-cyan)]" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-brand-cyan)]">
            Esqueleto v0.0.1 — dados de exemplo
          </span>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Atendimentos abertos"
          value="—"
          delta={{ value: "+0%", trend: "flat" }}
          icon={Inbox}
          accent
        />
        <KpiCard
          label="Leads novos (30d)"
          value="—"
          delta={{ value: "+0%", trend: "flat" }}
          icon={Users}
        />
        <KpiCard
          label="Mensagens hoje"
          value="—"
          delta={{ value: "+0%", trend: "flat" }}
          icon={MessageSquare}
        />
        <KpiCard
          label="Tempo médio resposta"
          value="—"
          delta={{ value: "+0%", trend: "flat" }}
          icon={Activity}
        />
      </div>

      {/* Conteúdo */}
      <div className="grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <div className="glass rounded-2xl border border-foreground/[0.08] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-foreground/80">
                Atividade Recente
              </h2>
              <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/40">
                placeholder
              </span>
            </div>
            <ul className="space-y-3">
              <ActivityRow
                title="Esqueleto carregado com sucesso"
                detail="A base MD Assessoria foi inicializada. Atendimento, agentes e configurações já no ar."
                time="agora"
              />
              <ActivityRow
                title="Tema dark/light disponível"
                detail="Toggle no header alterna entre os dois temas. Tokens CSS herdados do Fatto V2."
                time="agora"
              />
              <ActivityRow
                title="Navegação flat — sem submenus"
                detail="Top nav direto pras áreas operacionais. Configurações em página única scrollable com formulários empilhados."
                time="agora"
              />
            </ul>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="glass rounded-2xl border border-foreground/[0.08] p-6">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-foreground/80">
              Próximos Passos
            </h2>
            <ol className="mt-4 space-y-3 text-sm text-foreground/70">
              <li className="flex gap-2">
                <span className="font-black text-[var(--color-brand-cyan)]">01.</span>
                <span>Renato envia lista oficial de campos, menus e formulários</span>
              </li>
              <li className="flex gap-2">
                <span className="font-black text-[var(--color-brand-cyan)]">02.</span>
                <span>Criar branding próprio da plataforma MD Assessoria (agnóstico, multi-setor)</span>
              </li>
              <li className="flex gap-2">
                <span className="font-black text-[var(--color-brand-cyan)]">03.</span>
                <span>Plugar Supabase Auth + esquema multi-tenant</span>
              </li>
              <li className="flex gap-2">
                <span className="font-black text-[var(--color-brand-cyan)]">04.</span>
                <span>FattoCreditoV2 vira primeiro app vertical consumidor</span>
              </li>
            </ol>
          </div>
        </aside>
      </div>
    </div>
  );
}
