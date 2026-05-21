"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDashed,
  Loader2,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { ativarTenantAction } from "@/app/onboarding/actions";
import {
  TEMPLATES,
  CANAIS_DISPONIVEIS,
  findTemplate,
  type VerticalKey,
  type VerticalTemplate,
} from "./templates";

interface OnboardingState {
  vertical?: VerticalKey;
  software?: string;
  canais: string[];
  departamentos: string[];
  empresa: { nome: string; tagline: string; corPrimaria: string; corSecundaria: string };
}

const STATE_DEFAULT: OnboardingState = {
  canais: [],
  departamentos: [],
  empresa: { nome: "", tagline: "", corPrimaria: "#0052FF", corSecundaria: "#00D1FF" },
};

const STEPS: Array<{ key: string; label: string }> = [
  { key: "tipo", label: "Tipo de empresa" },
  { key: "software", label: "Software de gestão" },
  { key: "canais", label: "Canais" },
  { key: "equipe", label: "Equipe" },
  { key: "marca", label: "Marca" },
  { key: "resumo", label: "Resumo" },
];

export function WizardShell() {
  const router = useRouter();
  const [stepIdx, setStepIdx] = useState(0);
  const [state, setState] = useState<OnboardingState>(STATE_DEFAULT);
  const [pending, startTransition] = useTransition();
  const [erroAtivacao, setErroAtivacao] = useState<string | null>(null);

  const template = useMemo(
    () => (state.vertical ? findTemplate(state.vertical) : undefined),
    [state.vertical],
  );

  // Aplica template ao escolher vertical (sobrescreve canais/departamentos com defaults)
  const escolherVertical = (key: VerticalKey) => {
    const t = findTemplate(key);
    setState((s) => ({
      ...s,
      vertical: key,
      software: undefined,
      canais: [...t.canaisSugeridos],
      departamentos: [...t.departamentos],
    }));
  };

  const podeAvancar = (() => {
    switch (STEPS[stepIdx]!.key) {
      case "tipo":
        return !!state.vertical;
      case "software":
        return true; // pode pular
      case "canais":
        return state.canais.length > 0;
      case "equipe":
        return state.departamentos.length > 0;
      case "marca":
        return state.empresa.nome.trim().length > 0;
      case "resumo":
        return true;
      default:
        return false;
    }
  })();

  const ativar = () => {
    if (!state.vertical) {
      setErroAtivacao("Selecione um vertical antes de ativar.");
      return;
    }
    setErroAtivacao(null);
    startTransition(async () => {
      const r = await ativarTenantAction({
        vertical: state.vertical!,
        software: state.software,
        canais: state.canais,
        departamentos: state.departamentos,
        empresa: state.empresa,
      });
      if (!r.ok) {
        setErroAtivacao(r.error);
        return;
      }
      router.push("/dashboard" as never);
    });
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Header simples */}
      <header className="glass-header sticky top-0 z-30 flex h-16 items-center justify-between border-b border-foreground/[0.08] px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-cyan)] text-white shadow-brand">
            <span className="text-sm font-black">F</span>
          </div>
          <div>
            <p className="text-sm font-black tracking-tight">MD Assessoria</p>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--color-azure-500)]">
              Onboarding
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => router.push("/dashboard" as never)}
          aria-label="Cancelar"
          className="rounded-lg p-2 text-foreground/40 transition-colors hover:bg-foreground/[0.05] hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[260px_1fr]">
        {/* Stepper lateral */}
        <aside className="space-y-1.5">
          {STEPS.map((s, i) => {
            const concluido = i < stepIdx;
            const ativo = i === stepIdx;
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => i <= stepIdx && setStepIdx(i)}
                disabled={i > stepIdx}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all",
                  ativo
                    ? "border-[var(--color-azure-500)]/40 bg-[var(--color-azure-500)]/5"
                    : concluido
                      ? "border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10"
                      : "border-foreground/[0.05] opacity-50",
                )}
              >
                <div
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[10px] font-black",
                    ativo
                      ? "border-[var(--color-azure-500)] bg-[var(--color-azure-500)] text-white"
                      : concluido
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-foreground/15 text-foreground/40",
                  )}
                >
                  {concluido ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      "text-[10px] font-black uppercase tracking-wider",
                      ativo
                        ? "text-foreground"
                        : concluido
                          ? "text-emerald-600"
                          : "text-foreground/40",
                    )}
                  >
                    Passo {i + 1}
                  </p>
                  <p
                    className={cn(
                      "text-xs font-bold",
                      ativo ? "text-foreground" : "text-foreground/65",
                    )}
                  >
                    {s.label}
                  </p>
                </div>
              </button>
            );
          })}
        </aside>

        {/* Conteúdo do step */}
        <main className="space-y-6">
          <div className="glass min-h-[420px] rounded-3xl border border-foreground/[0.08] p-6 sm:p-8">
            {STEPS[stepIdx]!.key === "tipo" && (
              <StepTipo selected={state.vertical} onSelect={escolherVertical} />
            )}
            {STEPS[stepIdx]!.key === "software" && template && (
              <StepSoftware
                template={template}
                selected={state.software}
                onSelect={(sw) => setState((s) => ({ ...s, software: sw }))}
              />
            )}
            {STEPS[stepIdx]!.key === "canais" && (
              <StepCanais
                canais={state.canais}
                onToggle={(c) =>
                  setState((s) => ({
                    ...s,
                    canais: s.canais.includes(c)
                      ? s.canais.filter((x) => x !== c)
                      : [...s.canais, c],
                  }))
                }
              />
            )}
            {STEPS[stepIdx]!.key === "equipe" && (
              <StepEquipe
                departamentos={state.departamentos}
                onChange={(d) => setState((s) => ({ ...s, departamentos: d }))}
              />
            )}
            {STEPS[stepIdx]!.key === "marca" && (
              <StepMarca
                empresa={state.empresa}
                onChange={(e) => setState((s) => ({ ...s, empresa: e }))}
              />
            )}
            {STEPS[stepIdx]!.key === "resumo" && template && (
              <StepResumo state={state} template={template} />
            )}
          </div>

          {/* Nav buttons */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              disabled={stepIdx === 0}
              onClick={() => setStepIdx((i) => Math.max(0, i - 1))}
              className="inline-flex items-center gap-2 rounded-xl border border-foreground/10 px-4 py-2.5 text-[11px] font-black uppercase tracking-wider text-foreground/65 transition-all hover:border-foreground/20 hover:text-foreground disabled:opacity-30"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Voltar
            </button>
            {stepIdx < STEPS.length - 1 ? (
              <button
                type="button"
                disabled={!podeAvancar}
                onClick={() => setStepIdx((i) => Math.min(STEPS.length - 1, i + 1))}
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-azure-500)] px-5 py-2.5 text-[11px] font-black uppercase tracking-wider text-white shadow-brand transition-all hover:bg-[var(--color-azure-600)] disabled:opacity-30 disabled:shadow-none"
              >
                Próximo
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <div className="flex flex-col items-end gap-2">
                {erroAtivacao && (
                  <div className="flex items-start gap-2 rounded-xl border border-rose-500/20 bg-rose-500/5 px-3 py-2 text-[11px] text-rose-700 dark:text-rose-400">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                    <span>{erroAtivacao}</span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={ativar}
                  disabled={pending}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-cyan)] px-6 py-2.5 text-[11px] font-black uppercase tracking-wider text-white shadow-brand transition-all hover:shadow-[0_0_60px_rgba(0,82,255,0.6)] disabled:opacity-60"
                >
                  {pending ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Criando empresa…
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3.5 w-3.5" />
                      Ativar MD Assessoria
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

// =================================================================
// STEPS
// =================================================================

function StepHeader({ titulo, descricao }: { titulo: string; descricao: string }) {
  return (
    <header className="mb-6 border-b border-foreground/[0.05] pb-5">
      <h2 className="text-2xl font-black tracking-tight">{titulo}</h2>
      <p className="mt-1.5 text-sm text-foreground/60">{descricao}</p>
    </header>
  );
}

function StepTipo({
  selected,
  onSelect,
}: {
  selected?: VerticalKey;
  onSelect: (k: VerticalKey) => void;
}) {
  return (
    <>
      <StepHeader
        titulo="Que tipo de empresa é a sua?"
        descricao="Cada vertical recebe defaults diferentes (departamentos, etiquetas, motivos, canais sugeridos). Você ajusta tudo depois nas Configurações."
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {TEMPLATES.map((t) => {
          const Icon = t.icon;
          const ativo = selected === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => onSelect(t.key)}
              className={cn(
                "group flex flex-col gap-3 rounded-2xl border p-4 text-left transition-all",
                ativo
                  ? "border-[var(--color-azure-500)]/40 bg-[var(--color-azure-500)]/5 shadow-md"
                  : "border-foreground/[0.08] bg-foreground/[0.02] hover:border-foreground/20 hover:bg-foreground/[0.04]",
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border",
                    t.cor,
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                {ativo && (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-emerald-600">
                    <CheckCircle2 className="h-3 w-3" />
                    Selecionado
                  </span>
                )}
              </div>
              <div>
                <p className="text-sm font-black tracking-tight">{t.nome}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-foreground/55">
                  {t.descricao}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}

function StepSoftware({
  template,
  selected,
  onSelect,
}: {
  template: VerticalTemplate;
  selected?: string;
  onSelect: (sw: string | undefined) => void;
}) {
  return (
    <>
      <StepHeader
        titulo="Qual sistema sua empresa usa?"
        descricao={
          template.softwares.length === 0
            ? "Vertical sem softwares pré-cadastrados — você pode pular essa etapa."
            : `Selecione o sistema de gestão (ou pule se não usa nenhum). Apenas o IXC tem adapter pronto hoje; os outros são esqueletos prontos pra implementar.`
        }
      />
      {template.softwares.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-foreground/10 bg-foreground/[0.02] p-8 text-center text-sm text-foreground/55">
          Sem opções pré-cadastradas pra esse vertical. Pode avançar.
        </div>
      ) : (
        <div className="grid gap-2 sm:grid-cols-2">
          {template.softwares.map((sw) => {
            const ativo = selected === sw.key;
            return (
              <button
                key={sw.key}
                type="button"
                onClick={() => onSelect(ativo ? undefined : sw.key)}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-xl border p-3 text-left transition-all",
                  ativo
                    ? "border-[var(--color-azure-500)]/40 bg-[var(--color-azure-500)]/5"
                    : "border-foreground/[0.08] bg-foreground/[0.02] hover:border-foreground/20",
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-foreground/10 bg-foreground/[0.04] text-[10px] font-black uppercase">
                    {sw.nome.slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{sw.nome}</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/40">
                      {sw.status === "disponivel" ? "Adapter pronto" : "Esqueleto · em breve"}
                    </p>
                  </div>
                </div>
                {ativo ? (
                  <CheckCircle2 className="h-4 w-4 text-[var(--color-azure-500)]" />
                ) : (
                  <CircleDashed className="h-4 w-4 text-foreground/25" />
                )}
              </button>
            );
          })}
        </div>
      )}
      <button
        type="button"
        onClick={() => onSelect(undefined)}
        className="mt-3 text-[11px] font-black uppercase tracking-wider text-foreground/55 hover:text-foreground"
      >
        Não uso nenhum desses · pular
      </button>
    </>
  );
}

function StepCanais({
  canais,
  onToggle,
}: {
  canais: string[];
  onToggle: (c: string) => void;
}) {
  return (
    <>
      <StepHeader
        titulo="Por onde seus clientes falam com você?"
        descricao="Escolha quantos quiser. Cada canal vira uma fila de atendimento e um endpoint dos agentes IA. Vai aparecer na sidebar do Atendimento."
      />
      <div className="grid gap-2 sm:grid-cols-2">
        {CANAIS_DISPONIVEIS.map((c) => {
          const ativo = canais.includes(c.key);
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => onToggle(c.key)}
              className={cn(
                "flex items-start justify-between gap-3 rounded-xl border p-3 text-left transition-all",
                ativo
                  ? "border-[var(--color-azure-500)]/40 bg-[var(--color-azure-500)]/5"
                  : "border-foreground/[0.08] bg-foreground/[0.02] hover:border-foreground/20",
              )}
            >
              <div>
                <p className="text-sm font-bold">{c.label}</p>
                <p className="mt-0.5 text-[11px] text-foreground/55">{c.desc}</p>
              </div>
              {ativo ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--color-azure-500)]" />
              ) : (
                <CircleDashed className="h-4 w-4 shrink-0 text-foreground/25" />
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}

function StepEquipe({
  departamentos,
  onChange,
}: {
  departamentos: string[];
  onChange: (d: string[]) => void;
}) {
  const [novo, setNovo] = useState("");
  const adicionar = () => {
    const v = novo.trim();
    if (!v || departamentos.includes(v)) return;
    onChange([...departamentos, v]);
    setNovo("");
  };
  return (
    <>
      <StepHeader
        titulo="Quais são os departamentos da sua equipe?"
        descricao="Cada atendimento pode ser transferido entre departamentos. Vão aparecer em Configurações → Equipe."
      />
      <div className="space-y-2">
        {departamentos.map((d) => (
          <div
            key={d}
            className="flex items-center justify-between gap-3 rounded-xl border border-foreground/[0.05] bg-foreground/[0.02] px-3 py-2.5"
          >
            <span className="text-sm font-bold">{d}</span>
            <button
              type="button"
              aria-label={`Remover ${d}`}
              onClick={() => onChange(departamentos.filter((x) => x !== d))}
              className="rounded-lg p-1.5 text-foreground/30 transition-colors hover:bg-rose-500/10 hover:text-rose-500"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <input
          value={novo}
          onChange={(e) => setNovo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), adicionar())}
          placeholder="Adicionar departamento…"
          className="flex-1 rounded-xl border border-foreground/10 bg-foreground/[0.03] px-3 py-2.5 text-sm placeholder:text-foreground/30 focus:border-[var(--color-azure-500)]/40 focus:outline-none"
        />
        <button
          type="button"
          onClick={adicionar}
          className="inline-flex items-center gap-1.5 rounded-xl border border-foreground/10 bg-foreground/[0.04] px-4 text-[11px] font-black uppercase tracking-wider hover:border-foreground/20"
        >
          Adicionar
        </button>
      </div>
    </>
  );
}

function StepMarca({
  empresa,
  onChange,
}: {
  empresa: { nome: string; tagline: string; corPrimaria: string; corSecundaria: string };
  onChange: (e: typeof empresa) => void;
}) {
  return (
    <>
      <StepHeader
        titulo="Como sua marca aparece pro cliente?"
        descricao="Nome, tagline e paleta. Aplicado em propostas, e-mails, LP e documentos exportados. Ajustável depois em Configurações → Marca."
      />
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.2em] text-foreground/55">
            Nome da empresa <span className="text-rose-500">*</span>
          </label>
          <input
            value={empresa.nome}
            onChange={(e) => onChange({ ...empresa, nome: e.target.value })}
            placeholder="Ex: Móveis Premium Ltda."
            className="w-full rounded-xl border border-foreground/10 bg-foreground/[0.03] px-3 py-2.5 text-sm focus:border-[var(--color-azure-500)]/40 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.2em] text-foreground/55">
            Tagline (frase curta)
          </label>
          <input
            value={empresa.tagline}
            onChange={(e) => onChange({ ...empresa, tagline: e.target.value })}
            placeholder="Ex: O móvel certo pro seu lar."
            className="w-full rounded-xl border border-foreground/10 bg-foreground/[0.03] px-3 py-2.5 text-sm focus:border-[var(--color-azure-500)]/40 focus:outline-none"
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.2em] text-foreground/55">
              Cor primária
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={empresa.corPrimaria}
                onChange={(e) => onChange({ ...empresa, corPrimaria: e.target.value })}
                className="h-10 w-12 cursor-pointer rounded-lg border border-foreground/10 bg-transparent"
              />
              <input
                value={empresa.corPrimaria}
                onChange={(e) => onChange({ ...empresa, corPrimaria: e.target.value })}
                className="flex-1 rounded-xl border border-foreground/10 bg-foreground/[0.03] px-3 py-2.5 font-mono text-xs"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.2em] text-foreground/55">
              Cor secundária
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={empresa.corSecundaria}
                onChange={(e) => onChange({ ...empresa, corSecundaria: e.target.value })}
                className="h-10 w-12 cursor-pointer rounded-lg border border-foreground/10 bg-transparent"
              />
              <input
                value={empresa.corSecundaria}
                onChange={(e) => onChange({ ...empresa, corSecundaria: e.target.value })}
                className="flex-1 rounded-xl border border-foreground/10 bg-foreground/[0.03] px-3 py-2.5 font-mono text-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function StepResumo({
  state,
  template,
}: {
  state: OnboardingState;
  template: VerticalTemplate;
}) {
  const sw = template.softwares.find((s) => s.key === state.software);
  return (
    <>
      <StepHeader
        titulo="Tudo certo?"
        descricao="Confirma os dados abaixo. Ao ativar, você pode editar tudo a qualquer momento em Configurações."
      />

      <div className="space-y-4">
        <ResumoBlock label="Empresa">
          <p className="text-base font-black">{state.empresa.nome || "—"}</p>
          {state.empresa.tagline && (
            <p className="text-sm italic text-foreground/55">"{state.empresa.tagline}"</p>
          )}
          <div className="mt-2 flex gap-2">
            <span
              className="inline-block h-6 w-6 rounded-md border border-foreground/10"
              style={{ background: state.empresa.corPrimaria }}
              title={`Primária ${state.empresa.corPrimaria}`}
            />
            <span
              className="inline-block h-6 w-6 rounded-md border border-foreground/10"
              style={{ background: state.empresa.corSecundaria }}
              title={`Secundária ${state.empresa.corSecundaria}`}
            />
          </div>
        </ResumoBlock>

        <ResumoBlock label="Vertical">
          <div className="flex items-center gap-2">
            <template.icon className="h-4 w-4" />
            <span className="font-bold">{template.nome}</span>
          </div>
        </ResumoBlock>

        <ResumoBlock label="Software de gestão">
          {sw ? (
            <span className="font-bold">{sw.nome}</span>
          ) : (
            <span className="text-foreground/45">Nenhum / pulado</span>
          )}
        </ResumoBlock>

        <ResumoBlock label={`Canais (${state.canais.length})`}>
          <div className="flex flex-wrap gap-1.5">
            {state.canais.map((c) => (
              <span
                key={c}
                className="rounded-full bg-[var(--color-azure-500)]/10 px-2.5 py-1 text-[11px] font-bold text-[var(--color-azure-500)]"
              >
                {CANAIS_DISPONIVEIS.find((x) => x.key === c)?.label ?? c}
              </span>
            ))}
          </div>
        </ResumoBlock>

        <ResumoBlock label={`Departamentos (${state.departamentos.length})`}>
          <div className="flex flex-wrap gap-1.5">
            {state.departamentos.map((d) => (
              <span
                key={d}
                className="rounded-full bg-foreground/[0.05] px-2.5 py-1 text-[11px] font-bold"
              >
                {d}
              </span>
            ))}
          </div>
        </ResumoBlock>

        <ResumoBlock label="O que mais será criado automaticamente">
          <ul className="space-y-1 text-[12px] text-foreground/65">
            <li className="flex items-center gap-2">
              <ChevronRight className="h-3 w-3 text-foreground/30" />
              {template.etiquetas.length} etiquetas pré-cadastradas
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="h-3 w-3 text-foreground/30" />
              {template.motivos.length} motivos de encerramento
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="h-3 w-3 text-foreground/30" />
              {template.mensagens.length} mensagens rápidas
            </li>
          </ul>
        </ResumoBlock>
      </div>
    </>
  );
}

function ResumoBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-foreground/[0.08] bg-foreground/[0.02] p-4">
      <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/55">
        {label}
      </p>
      {children}
    </div>
  );
}
