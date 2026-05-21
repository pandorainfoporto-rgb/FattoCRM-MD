import Link from "next/link";
import type { Metadata } from "next";
import { AlertCircle } from "lucide-react";
import { loginAction } from "./actions";

export const metadata: Metadata = { title: "Entrar — MD Assessoria" };

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string; redirect?: string };
}) {
  const erro = searchParams.error;
  const redirectTo = searchParams.redirect ?? "/dashboard";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-4">
      <div className="w-full max-w-sm space-y-6">
        {/* Logo */}
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-cyan)] text-white shadow-brand">
            <span className="text-xl font-black tracking-tight">F</span>
          </div>
          <h1 className="mt-4 text-2xl font-black tracking-tight">MD Assessoria</h1>
          <p className="mt-1 text-xs text-foreground/55">Entra na tua operação.</p>
        </div>

        <div className="glass rounded-3xl border border-foreground/[0.08] p-6">
          <form action={loginAction} className="space-y-4">
            <input type="hidden" name="redirect" value={redirectTo} />

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.2em] text-foreground/55"
              >
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="voce@empresa.com"
                className="w-full rounded-xl border border-foreground/10 bg-foreground/[0.03] px-3 py-2.5 text-sm placeholder:text-foreground/30 focus:border-[var(--color-azure-500)]/40 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.2em] text-foreground/55"
              >
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
                className="w-full rounded-xl border border-foreground/10 bg-foreground/[0.03] px-3 py-2.5 text-sm placeholder:text-foreground/30 focus:border-[var(--color-azure-500)]/40 focus:outline-none"
              />
            </div>

            {erro && (
              <div className="flex items-start gap-2 rounded-xl border border-rose-500/20 bg-rose-500/5 p-3 text-[12px] text-rose-700 dark:text-rose-400">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{erro}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-[var(--color-azure-500)] px-4 py-2.5 text-[11px] font-black uppercase tracking-wider text-white shadow-brand transition-all hover:bg-[var(--color-azure-600)]"
            >
              Entrar
            </button>
          </form>

          <div className="mt-5 border-t border-foreground/[0.05] pt-4 text-center text-xs text-foreground/55">
            Ainda não tem conta?{" "}
            <Link href="/signup" className="font-black text-[var(--color-azure-500)] hover:underline">
              Criar conta
            </Link>
          </div>
        </div>

        <p className="text-center text-[10px] text-foreground/40">
          v0.0.x · Plataforma de CRM omnichannel + agentes IA
        </p>
      </div>
    </main>
  );
}
