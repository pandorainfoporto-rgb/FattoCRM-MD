"use client";

import { useMemo, useState } from "react";
import {
  Archive,
  Bot,
  Check,
  ChevronDown,
  ExternalLink,
  Hourglass,
  Inbox as InboxIcon,
  Lightbulb,
  MessageSquare,
  Mic,
  MoreVertical,
  Paperclip,
  Search,
  Send,
  Smile,
  Sparkles,
  Tag,
  Target,
  TrendingUp,
  User,
  UserPlus,
  Users,
  XCircle,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  CANAL_INFO,
  CONVERSAS,
  MENSAGENS_POR_CONVERSA,
  type AtendenteTipo,
  type ConversaMock,
  type StatusAtendimento,
} from "./mock-data";
import { Megaphone, Sparkle } from "lucide-react";

const RESPONSAVEL_BADGE: Record<AtendenteTipo, { bg: string; label: string; icon: LucideIcon }> = {
  ia: { bg: "bg-violet-500/10 text-violet-600 border-violet-500/20", label: "IA", icon: Bot },
  humano: { bg: "bg-sky-500/10 text-sky-600 border-sky-500/20", label: "Humano", icon: User },
  aguardando: { bg: "bg-amber-500/10 text-amber-600 border-amber-500/20", label: "Aguardando", icon: Hourglass },
};

export function InboxShell({ filtroStatus = null }: { filtroStatus?: StatusAtendimento | null }) {
  const [search, setSearch] = useState("");

  // Conversas que pertencem a esta tab (filtradas por status ANTES da search)
  const conversasDaTab = useMemo(
    () => (filtroStatus ? CONVERSAS.filter((c) => c.statusAtendimento === filtroStatus) : CONVERSAS),
    [filtroStatus],
  );

  const [conversaAtivaId, setConversaAtivaId] = useState<string | null>(
    conversasDaTab[0]?.id ?? null,
  );

  // Sempre que troca o filtro (tab no topo), reseta seleção pra primeira da nova lista
  useMemo(() => {
    if (!conversasDaTab.find((c) => c.id === conversaAtivaId)) {
      setConversaAtivaId(conversasDaTab[0]?.id ?? null);
    }
  }, [conversasDaTab, conversaAtivaId]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return conversasDaTab.filter((c) => {
      if (!q) return true;
      return (
        c.contato.nome.toLowerCase().includes(q) ||
        c.ultimaMensagem.texto.toLowerCase().includes(q)
      );
    });
  }, [search, conversasDaTab]);

  const conversaAtiva = conversasDaTab.find((c) => c.id === conversaAtivaId) ?? null;

  return (
    <div className="flex h-full gap-3">
      {/* COLUNA 1 — Lista de conversas */}
      <aside className="glass flex w-80 shrink-0 flex-col overflow-hidden rounded-2xl border border-foreground/[0.08]">
        <div className="border-b border-foreground/[0.05] p-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar conversas…"
              className="w-full rounded-xl border border-foreground/10 bg-foreground/[0.03] py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-foreground/30 focus:border-[var(--color-azure-500)]/40 focus:outline-none"
            />
          </div>
        </div>

        <div className="custom-scrollbar flex-1 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 opacity-30">
              <InboxIcon className="h-8 w-8" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em]">Sem conversas</p>
            </div>
          ) : (
            <ul className="space-y-1">
              {filtered.map((c) => (
                <ConversaItem
                  key={c.id}
                  conversa={c}
                  active={c.id === conversaAtivaId}
                  onClick={() => setConversaAtivaId(c.id)}
                />
              ))}
            </ul>
          )}
        </div>
      </aside>

      {/* COLUNA 2 — Chat ativo */}
      <section className="glass flex flex-1 overflow-hidden rounded-2xl border border-foreground/[0.08]">
        {conversaAtiva ? (
          <ConversaView conversa={conversaAtiva} />
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 opacity-30">
            <MessageSquare className="h-12 w-12" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em]">
              Selecione uma conversa
            </p>
          </div>
        )}
      </section>

      {/* COLUNA 3 — Ficha do contato */}
      {conversaAtiva && <FichaContato conversa={conversaAtiva} />}
    </div>
  );
}

// =================================================================
// ITEM DA LISTA DE CONVERSAS
// =================================================================
function ConversaItem({
  conversa,
  active,
  onClick,
}: {
  conversa: ConversaMock;
  active: boolean;
  onClick: () => void;
}) {
  const canalInfo = CANAL_INFO[conversa.canal];
  const CanalIcon = canalInfo.icon;
  const respBadge = RESPONSAVEL_BADGE[conversa.responsavel];
  const RespIcon = respBadge.icon;

  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "group w-full rounded-xl border px-3 py-2.5 text-left transition-all",
          active
            ? "border-[var(--color-azure-500)]/30 bg-[var(--color-azure-500)]/5 shadow-sm"
            : "border-transparent hover:bg-foreground/[0.04]",
        )}
      >
        <div className="flex items-start gap-3">
          <div className="relative shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-brand-primary)]/80 to-[var(--color-brand-cyan)]/80 text-[11px] font-black text-white shadow-sm">
              {conversa.contato.iniciais}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[var(--color-background-elevated)] bg-foreground/[0.08]">
              <CanalIcon className={cn("h-2.5 w-2.5", canalInfo.color)} />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className={cn("truncate text-sm font-bold", conversa.naoLidas > 0 ? "text-foreground" : "text-foreground/85")}>
                {conversa.contato.nome}
              </p>
              <span className="shrink-0 text-[10px] font-bold tabular-nums text-foreground/40">
                {conversa.ultimaMensagem.ts}
              </span>
            </div>

            {/* Origem de campanha (acima da mensagem, com destaque) */}
            {conversa.origemCampanha && (
              <p className="mt-0.5 flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                <Megaphone className="h-2.5 w-2.5" />
                {conversa.origemCampanha}
              </p>
            )}

            <p className={cn("mt-0.5 truncate text-xs", conversa.naoLidas > 0 ? "font-semibold text-foreground/85" : "text-foreground/55")}>
              {conversa.ultimaMensagem.texto}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              {conversa.isLead && (
                <span className="inline-flex items-center gap-1 rounded-md border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  <Sparkle className="h-2.5 w-2.5" />
                  Lead
                </span>
              )}
              <span className={cn("inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider", respBadge.bg)}>
                <RespIcon className="h-2.5 w-2.5" />
                {respBadge.label}
              </span>
              {conversa.tags?.slice(0, 2).map((t) => (
                <span key={t} className="rounded-md bg-foreground/[0.06] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-foreground/55">
                  {t}
                </span>
              ))}
              {conversa.naoLidas > 0 && (
                <span className="ml-auto flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[var(--color-brand-primary)] px-1 text-[9px] font-black text-white">
                  {conversa.naoLidas}
                </span>
              )}
            </div>
          </div>
        </div>
      </button>
    </li>
  );
}

// =================================================================
// VISTA DA CONVERSA — chat
// =================================================================
function ConversaView({ conversa }: { conversa: ConversaMock }) {
  const mensagens = MENSAGENS_POR_CONVERSA[conversa.id] ?? [];
  const canalInfo = CANAL_INFO[conversa.canal];
  const CanalIcon = canalInfo.icon;
  const [draft, setDraft] = useState("");

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center gap-3 border-b border-foreground/[0.05] px-5 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-brand-primary)]/80 to-[var(--color-brand-cyan)]/80 text-[10px] font-black text-white">
          {conversa.contato.iniciais}
        </div>
        <div className="flex-1">
          <p className="text-sm font-black tracking-tight">{conversa.contato.nome}</p>
          <div className="flex items-center gap-2 text-[10px] text-foreground/55">
            <CanalIcon className={cn("h-3 w-3", canalInfo.color)} />
            <span>{canalInfo.label}</span>
            <span>·</span>
            <span className="font-mono">{conversa.contato.identificador}</span>
            <span>·</span>
            <span className="font-mono">Protocolo {conversa.protocolo}</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button title="Marcar como resolvida" className="rounded-lg p-2 text-foreground/55 transition-colors hover:bg-foreground/[0.05] hover:text-emerald-500">
            <Check className="h-4 w-4" />
          </button>
          <button title="Adicionar etiqueta" className="rounded-lg p-2 text-foreground/55 transition-colors hover:bg-foreground/[0.05] hover:text-foreground">
            <Tag className="h-4 w-4" />
          </button>
          <button title="Arquivar" className="rounded-lg p-2 text-foreground/55 transition-colors hover:bg-foreground/[0.05] hover:text-foreground">
            <Archive className="h-4 w-4" />
          </button>
          <button title="Mais" className="rounded-lg p-2 text-foreground/55 transition-colors hover:bg-foreground/[0.05] hover:text-foreground">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="custom-scrollbar flex-1 space-y-3 overflow-y-auto px-5 py-4">
        {mensagens.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 opacity-30">
            <MessageSquare className="h-8 w-8" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em]">Sem mensagens (mock)</p>
          </div>
        ) : (
          mensagens.map((m) => <Bolha key={m.id} mensagem={m} />)
        )}
      </div>

      <footer className="border-t border-foreground/[0.05] p-3">
        <div className="flex items-end gap-2 rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-2">
          <button title="Anexar" className="rounded-lg p-2 text-foreground/55 transition-colors hover:bg-foreground/[0.05] hover:text-foreground">
            <Paperclip className="h-4 w-4" />
          </button>
          <button title="Mensagem rápida" className="rounded-lg p-2 text-foreground/55 transition-colors hover:bg-foreground/[0.05] hover:text-foreground">
            <Zap className="h-4 w-4" />
          </button>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Mensagem… (use / para comandos)"
            rows={1}
            className="flex-1 resize-none bg-transparent px-2 py-1.5 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none"
          />
          <button title="Emoji" className="rounded-lg p-2 text-foreground/55 transition-colors hover:bg-foreground/[0.05] hover:text-foreground">
            <Smile className="h-4 w-4" />
          </button>
          <button title="Áudio" className="rounded-lg p-2 text-foreground/55 transition-colors hover:bg-foreground/[0.05] hover:text-foreground">
            <Mic className="h-4 w-4" />
          </button>
          <button
            type="button"
            disabled={!draft.trim()}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-cyan)] text-white shadow-brand transition-all disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}

function Bolha({ mensagem }: { mensagem: { papel: string; conteudo: string; ts: string } }) {
  const isCliente = mensagem.papel === "cliente";
  const isIA = mensagem.papel === "ia";
  const isSistema = mensagem.papel === "sistema";

  if (isSistema) {
    return (
      <div className="flex justify-center">
        <span className="rounded-full bg-foreground/[0.05] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground/55">
          {mensagem.conteudo}
        </span>
      </div>
    );
  }

  return (
    <div className={cn("flex gap-2", isCliente ? "justify-start" : "justify-end")}>
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-2.5 shadow-sm",
          isCliente
            ? "rounded-bl-md bg-foreground/[0.08] text-foreground"
            : isIA
              ? "rounded-br-md bg-violet-500/15 text-violet-700 dark:text-violet-200"
              : "rounded-br-md bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-cyan)] text-white",
        )}
      >
        {isIA && (
          <div className="mb-1 flex items-center gap-1 text-[9px] font-black uppercase tracking-widest opacity-70">
            <Bot className="h-2.5 w-2.5" /> IA
          </div>
        )}
        <p className="whitespace-pre-wrap text-sm leading-relaxed">{mensagem.conteudo}</p>
        <p className="mt-1 text-[10px] tabular-nums opacity-60">{mensagem.ts}</p>
      </div>
    </div>
  );
}

// =================================================================
// FICHA COMPLETA DO CONTATO
// =================================================================

const SENTIMENTO_INFO: Record<string, { label: string; cor: string; bg: string }> = {
  positivo: { label: "Positivo",  cor: "text-emerald-600", bg: "bg-emerald-500/10" },
  neutro:   { label: "Neutro",    cor: "text-foreground/65", bg: "bg-foreground/[0.05]" },
  negativo: { label: "Negativo",  cor: "text-amber-600",   bg: "bg-amber-500/10" },
  irritado: { label: "Irritado",  cor: "text-rose-600",    bg: "bg-rose-500/10" },
};

function FichaContato({ conversa }: { conversa: ConversaMock }) {
  const [observacao, setObservacao] = useState("");
  const canalInfo = CANAL_INFO[conversa.canal];

  return (
    <aside className="glass hidden w-80 shrink-0 flex-col overflow-hidden rounded-2xl border border-foreground/[0.08] xl:flex">
      <div className="custom-scrollbar flex-1 overflow-y-auto p-5">
        {/* INSIGHTS DA IA — topo da ficha */}
        {conversa.iaInsights && <IAInsightsCard insights={conversa.iaInsights} />}

        {/* Avatar + nome */}
        <div className={cn("flex flex-col items-center gap-3 text-center", conversa.iaInsights && "mt-6")}>
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-foreground/[0.08] bg-foreground/[0.04] text-lg font-black text-foreground/55">
            {conversa.contato.iniciais}
          </div>
          <div>
            <p className="text-sm font-black tracking-tight">{conversa.contato.nome}</p>
            <p className="mt-0.5 font-mono text-[11px] text-foreground/55">
              {conversa.contato.identificador}
            </p>
          </div>
          {!conversa.contato.cliente && (
            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-cyan)] py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-brand transition-all hover:shadow-[0_0_40px_rgba(0,82,255,0.5)] active:scale-[0.98]">
              <UserPlus className="h-3.5 w-3.5" />
              Vincular cliente
            </button>
          )}
        </div>

        {/* Métricas */}
        <div className="mt-6 grid grid-cols-2 gap-2">
          <Metric label="Aberto" value={conversa.abertoEm} />
          <Metric label="Tempo médio" value={conversa.tempoMedio} />
        </div>

        {/* Identificadores */}
        <div className="mt-5 space-y-3">
          <Linha k={canalInfo.label} v={conversa.contato.identificador} mono />
          <Linha k="Protocolo" v={conversa.protocolo} mono />
        </div>

        {/* Observação */}
        <div className="mt-6">
          <label className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.3em] text-foreground/55">
            Nova observação
          </label>
          <textarea
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            placeholder="Anotação interna sobre o atendimento…"
            rows={3}
            className="w-full resize-none rounded-xl border border-foreground/10 bg-foreground/[0.03] p-3 text-xs text-foreground placeholder:text-foreground/30 focus:border-[var(--color-azure-500)]/40 focus:outline-none"
          />
        </div>

        {/* Vincular */}
        <div className="mt-6 space-y-3">
          <SelectField label="Etiqueta" placeholder="Selecione…" icon={Tag} />
        </div>

        {/* Ações finais */}
        <div className="mt-6 space-y-2 border-t border-foreground/[0.05] pt-4">
          <TransferirAction />
          <SecondaryAction label="Pendente externo" />
          <EncerrarAction />
        </div>
      </div>
    </aside>
  );
}

// ----- Card de Insights da IA -----
function IAInsightsCard({ insights }: { insights: NonNullable<ConversaMock["iaInsights"]> }) {
  const sent = SENTIMENTO_INFO[insights.sentimento] ?? SENTIMENTO_INFO.neutro!;
  return (
    <section className="relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-violet-500/5 to-fuchsia-500/5 p-4">
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-violet-500/10 blur-2xl" />

      <div className="relative">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-md">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <div className="flex-1">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-violet-700 dark:text-violet-300">
              Insights da IA
            </p>
          </div>
          <span className="rounded-md border border-violet-500/30 bg-violet-500/10 px-1.5 py-0.5 text-[9px] font-black tabular-nums text-violet-700 dark:text-violet-300">
            {insights.confianca}%
          </span>
        </div>

        <div className="mt-3 space-y-2.5">
          {/* Sentimento */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/55">
              Sentimento
            </span>
            <span className={cn("rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-wider", sent.cor, sent.bg)}>
              {sent.label}
            </span>
          </div>

          {/* Intenção */}
          <div>
            <p className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-foreground/55">
              <Target className="h-2.5 w-2.5" />
              Intenção
            </p>
            <p className="mt-1 text-xs leading-relaxed text-foreground/85">{insights.intencao}</p>
          </div>

          {/* Próxima ação */}
          <div>
            <p className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-foreground/55">
              <Lightbulb className="h-2.5 w-2.5" />
              Próxima ação
            </p>
            <p className="mt-1 text-xs leading-relaxed text-foreground/85">{insights.proximaAcao}</p>
          </div>

          {/* Alerta crítico */}
          {insights.alerta && (
            <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-2.5">
              <p className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-rose-600 dark:text-rose-400">
                <Zap className="h-2.5 w-2.5" />
                Alerta
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-rose-700 dark:text-rose-300">
                {insights.alerta}
              </p>
            </div>
          )}

          {/* Tópicos */}
          {insights.topicos && insights.topicos.length > 0 && (
            <div>
              <p className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-foreground/55">
                <TrendingUp className="h-2.5 w-2.5" />
                Tópicos
              </p>
              <div className="mt-1 flex flex-wrap gap-1">
                {insights.topicos.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-violet-500/10 px-1.5 py-0.5 text-[10px] font-bold text-violet-700 dark:text-violet-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ----- Botão Transferir (com selects de Setor + Usuário) -----
function TransferirAction() {
  const [open, setOpen] = useState(false);
  const [setor, setSetor] = useState("");
  const [usuario, setUsuario] = useState("");

  return (
    <div className="rounded-xl border border-foreground/10 bg-foreground/[0.02]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left text-xs font-bold text-foreground/80 transition-colors hover:text-foreground"
      >
        <span className="flex items-center gap-2">
          <ExternalLink className="h-3.5 w-3.5 text-[var(--color-azure-500)]" />
          Transferir atendimento
        </span>
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="space-y-2 border-t border-foreground/[0.05] p-3">
          <div>
            <label className="mb-1 block text-[10px] font-black uppercase tracking-[0.3em] text-foreground/55">
              Setor
            </label>
            <select
              value={setor}
              onChange={(e) => setSetor(e.target.value)}
              className="w-full rounded-lg border border-foreground/10 bg-foreground/[0.03] px-2.5 py-2 text-xs focus:border-[var(--color-azure-500)]/40 focus:outline-none"
            >
              <option value="">Selecione…</option>
              <option value="comercial">Comercial</option>
              <option value="suporte">Suporte / CS</option>
              <option value="financeiro">Financeiro</option>
              <option value="operacoes">Operações</option>
              <option value="captacao">Captação</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-black uppercase tracking-[0.3em] text-foreground/55">
              Usuário
            </label>
            <select
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full rounded-lg border border-foreground/10 bg-foreground/[0.03] px-2.5 py-2 text-xs focus:border-[var(--color-azure-500)]/40 focus:outline-none"
              disabled={!setor}
            >
              <option value="">{setor ? "Selecione…" : "Escolha o setor antes"}</option>
              <option value="renato">Renato (online)</option>
              <option value="claudia">Cláudia (online)</option>
              <option value="bruno">Bruno (em pausa)</option>
              <option value="proximo">Próximo disponível (roleta)</option>
            </select>
          </div>
          <button
            type="button"
            disabled={!setor || !usuario}
            className="w-full rounded-lg bg-[var(--color-azure-500)] px-3 py-2 text-[11px] font-black uppercase tracking-wider text-white transition-all hover:bg-[var(--color-azure-600)] disabled:opacity-40"
          >
            Confirmar transferência
          </button>
        </div>
      )}
    </div>
  );
}

// ----- Botão Encerrar (vai pro CCO + avaliação) -----
function EncerrarAction() {
  const [confirming, setConfirming] = useState(false);
  if (confirming) {
    return (
      <div className="space-y-2 rounded-xl border border-rose-500/30 bg-rose-500/5 p-3">
        <p className="text-[11px] font-bold leading-relaxed text-rose-700 dark:text-rose-300">
          Encerrar este atendimento? Vai disparar:
        </p>
        <ol className="ml-4 list-decimal space-y-0.5 text-[10px] text-rose-700/85 dark:text-rose-300/85">
          <li>Customer Success (AG-MGR-05) revisa</li>
          <li>Cliente recebe pesquisa de avaliação (NPS/CSAT)</li>
          <li>Atendimento vai pra "Arquivados"</li>
        </ol>
        <div className="flex gap-2 pt-1">
          <button
            type="button"
            className="flex-1 rounded-lg bg-rose-500 px-3 py-2 text-[10px] font-black uppercase tracking-wider text-white transition-colors hover:bg-rose-600"
          >
            Confirmar
          </button>
          <button
            type="button"
            onClick={() => setConfirming(false)}
            className="rounded-lg border border-foreground/15 px-3 py-2 text-[10px] font-black uppercase tracking-wider text-foreground/65 hover:border-foreground/30 hover:text-foreground"
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="flex w-full items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/5 px-3 py-2.5 text-left text-xs font-bold text-rose-600 transition-all hover:border-rose-500/40 hover:bg-rose-500/10 dark:text-rose-400"
    >
      <XCircle className="h-3.5 w-3.5" />
      Encerrar atendimento
    </button>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-foreground/[0.08] bg-foreground/[0.02] p-3">
      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-foreground/45">{label}</p>
      <p className="mt-1 text-xs font-black tracking-tight">{value}</p>
    </div>
  );
}

function Linha({ k, v, mono = false }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-foreground/[0.05] py-1.5">
      <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/45">{k}</span>
      <span className={cn("text-xs font-medium text-foreground/85", mono && "font-mono")}>{v}</span>
    </div>
  );
}

function SelectField({
  label,
  placeholder,
  icon: Icon,
}: {
  label: string;
  placeholder: string;
  icon: LucideIcon;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.3em] text-foreground/55">
        {label}
      </label>
      <button
        type="button"
        className="flex w-full items-center justify-between gap-2 rounded-xl border border-foreground/10 bg-foreground/[0.03] px-3 py-2.5 text-left text-xs text-foreground/45 transition-colors hover:border-foreground/20 hover:text-foreground"
      >
        <span className="flex items-center gap-2">
          <Icon className="h-3.5 w-3.5" />
          {placeholder}
        </span>
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function SecondaryAction({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="w-full rounded-xl border border-foreground/10 bg-foreground/[0.02] px-3 py-2 text-left text-xs font-bold text-foreground/65 transition-all hover:border-foreground/20 hover:bg-foreground/[0.05] hover:text-foreground"
    >
      {label}
    </button>
  );
}
