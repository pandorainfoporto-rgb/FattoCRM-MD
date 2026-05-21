import type { Metadata } from "next";
import { ArrowRight, Plus, Search, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/layout/page-header";
import { CATEGORIAS_KB } from "@/components/kb/kb-mock";
import { cn } from "@/lib/cn";

export const metadata: Metadata = { title: "Knowledge Base — MD Assessoria" };

export default function KnowledgeBasePage() {
  const totalArtigos = CATEGORIAS_KB.reduce((s, c) => s + c.artigos, 0);
  const coberturaMedia = Math.round(
    CATEGORIAS_KB.reduce((s, c) => s + c.cobertura, 0) / Math.max(CATEGORIAS_KB.length, 1),
  );

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <PageHeader
        eyebrow="Ferramentas › Automação IA"
        title="Knowledge Base"
        subtitle="Base de conhecimento que alimenta os agentes IA via RAG. Cada artigo vira embedding gemini-embedding-001 (768d) com pgvector."
        actions={
          <>
            <Button variant="outline">
              <Upload className="h-4 w-4" />
              Importar
            </Button>
            <Button>
              <Plus className="h-4 w-4" />
              Novo Artigo
            </Button>
          </>
        }
      />

      {/* Métricas */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Metric label="Categorias" value={CATEGORIAS_KB.length.toString()} />
        <Metric label="Artigos" value={totalArtigos.toString()} subtitle="placeholder · ainda não populado" />
        <Metric label="Cobertura média" value={`${coberturaMedia}%`} subtitle="quando atingir 80% consideramos pronto" />
      </div>

      {/* Search */}
      <div className="relative max-w-xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/30" />
        <Input
          type="search"
          placeholder="Buscar artigo, categoria ou tag…"
          className="h-11 pl-10"
        />
      </div>

      {/* Categorias */}
      <section className="space-y-4">
        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-foreground/85">Categorias</h2>
          <p className="mt-1 text-xs text-foreground/55">
            Comece a popular pelo que tem mais impacto: Tecnologia da Fibra, Planos, Procedimentos Top-20.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {CATEGORIAS_KB.map((c) => {
            const Icon = c.icon;
            const isEmpty = c.artigos === 0;
            return (
              <article
                key={c.slug}
                className="glass group relative overflow-hidden rounded-2xl border border-foreground/[0.08] p-5 transition-all hover:border-foreground/20 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl border border-foreground/[0.08]", c.bgClass)}>
                    <Icon className={cn("h-5 w-5", c.cor)} />
                  </div>
                  {isEmpty ? (
                    <span className="rounded-full border border-amber-500/30 bg-amber-500/5 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-amber-600">
                      Vazia
                    </span>
                  ) : (
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/5 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-emerald-600">
                      {c.artigos} artigos
                    </span>
                  )}
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-black uppercase tracking-tight">{c.nome}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-foreground/55 line-clamp-3">
                    {c.descricao}
                  </p>
                </div>

                {/* Barra de cobertura */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-foreground/45">
                    <span>Cobertura</span>
                    <span>{c.cobertura}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-foreground/[0.06]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-cyan)] transition-all"
                      style={{ width: `${c.cobertura}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-foreground/[0.05] pt-3">
                  <span className="text-[10px] font-bold tabular-nums text-foreground/40">
                    {c.ultimaAtualizacao}
                  </span>
                  <button className="group/btn inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[var(--color-azure-500)] transition-colors hover:text-[var(--color-brand-cyan)]">
                    {isEmpty ? "Começar" : "Abrir"}
                    <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <div className="rounded-2xl border border-foreground/[0.08] bg-foreground/[0.02] p-5">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/55">
          Como popular
        </p>
        <ul className="mt-3 space-y-2 text-sm text-foreground/70 leading-relaxed">
          <li className="flex gap-2">
            <span className="font-black text-[var(--color-brand-cyan)]">1.</span>
            <span>
              <strong>Importação em massa</strong> — sobe PDFs (manuais técnicos, books PlayHub,
              brandbook), site é dividido em chunks e embedado automaticamente.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="font-black text-[var(--color-brand-cyan)]">2.</span>
            <span>
              <strong>Edição inline</strong> — escreve markdown estruturado direto na UI, com preview
              de como o agente IA vai citar.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="font-black text-[var(--color-brand-cyan)]">3.</span>
            <span>
              <strong>Aprendizado contínuo</strong> — quando agente IA acerta ou erra um caso, registra
              em <code className="rounded bg-foreground/[0.06] px-1 text-xs">ag_aprendizados</code> e
              vira candidato a virar artigo.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="font-black text-[var(--color-brand-cyan)]">4.</span>
            <span>
              <strong>Versionamento</strong> — toda edição cria nova versão; agente sempre consome a
              mais recente, mas histórico fica auditável.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function Metric({ label, value, subtitle }: { label: string; value: string; subtitle?: string }) {
  return (
    <div className="glass rounded-2xl border border-foreground/[0.08] p-5">
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/55">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-tight">{value}</p>
      {subtitle && <p className="mt-1 text-xs text-foreground/55">{subtitle}</p>}
    </div>
  );
}
