import Link from "next/link";
import type { Metadata } from "next";
import { AlertCircle } from "lucide-react";
import { signupAction } from "./actions";

export const metadata: Metadata = { title: "Criar conta — MD Assessoria" };

export default function SignupPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const erro = searchParams.error;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-4 py-10">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-cyan)] text-white shadow-brand">
            <span className="text-xl font-black tracking-tight">F</span>
          </div>
          <h1 className="mt-4 text-2xl font-black tracking-tight">Criar conta</h1>
          <p className="mt-1 text-xs text-foreground/55">
            Em 1 minuto sua operação tá no ar.
          </p>
        </div>

        <div className="glass rounded-3xl border border-foreground/[0.08] p-6">
          <form action={signupAction} className="space-y-4">
            <div>
              <label
                htmlFor="nome"
                className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.2em] text-foreground/55"
              >
                Seu nome
              </label>
              <input
                id="nome"
                name="nome"
                type="text"
                autoComplete="name"
                required
                placeholder="Como gostaria de ser chamado"
                className="w-full rounded-xl border border-foreground/10 bg-foreground/[0.03] px-3 py-2.5 text-sm placeholder:text-foreground/30 focus:border-[var(--color-azure-500)]/40 focus:outline-none"
              />
            </div>

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
                autoComplete="new-password"
                required
                minLength={8}
                placeholder="Mínimo 8 caracteres"
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
              className="w-full rounded-xl bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-cyan)] px-4 py-2.5 text-[11px] font-black uppercase tracking-wider text-white shadow-brand transition-all hover:shadow-[0_0_60px_rgba(0,82,255,0.6)]"
            >
              Criar conta e iniciar onboarding
            </button>
          </form>

          <div className="mt-5 border-t border-foreground/[0.05] pt-4 text-center text-xs text-foreground/55">
            Já tem conta?{" "}
            <Link href="/login" className="font-black text-[var(--color-azure-500)] hover:underline">
              Entrar
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
