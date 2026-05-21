"use client";

import { useMemo, useState } from "react";
import {
  Hash,
  MessageSquare,
  Mic,
  Paperclip,
  Plus,
  Search,
  Send,
  Smile,
  Users as UsersIcon,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/cn";
import {
  GRUPOS_INTERNOS,
  MENSAGENS_INTERNAS,
  STATUS_ONLINE_INFO,
  USUARIOS_INTERNOS,
  type GrupoInterno,
  type MensagemInterna,
  type UsuarioInterno,
} from "./interno-mock";

type Modo = "1on1" | "grupo";

/**
 * Shell de comunicação interna.
 * Mesmo padrão visual do inbox de cliente:
 *   - Coluna lista de chats à esquerda
 *   - Coluna chat ativo à direita
 *
 * Modo "1on1": lista usuários online no CRM
 * Modo "grupo": lista grupos do CRM
 */
export function InternoShell({ modo }: { modo: Modo }) {
  const [search, setSearch] = useState("");
  const [ativoId, setAtivoId] = useState<string | null>(
    modo === "1on1" ? USUARIOS_INTERNOS[0]?.id ?? null : GRUPOS_INTERNOS[0]?.id ?? null,
  );

  const itens = useMemo(() => {
    const q = search.toLowerCase();
    if (modo === "1on1") {
      return USUARIOS_INTERNOS.filter((u) => !q || u.nome.toLowerCase().includes(q) || u.cargo.toLowerCase().includes(q));
    }
    return GRUPOS_INTERNOS.filter((g) => !q || g.nome.toLowerCase().includes(q) || g.descricao.toLowerCase().includes(q));
  }, [modo, search]);

  const ativo = modo === "1on1"
    ? USUARIOS_INTERNOS.find((u) => u.id === ativoId)
    : GRUPOS_INTERNOS.find((g) => g.id === ativoId);

  return (
    <div className="flex h-full gap-3">
      {/* Coluna 1 — Lista */}
      <aside className="glass flex w-80 shrink-0 flex-col overflow-hidden rounded-2xl border border-foreground/[0.08]">
        <div className="space-y-3 border-b border-foreground/[0.05] p-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/55">
              {modo === "1on1" ? "Conversas internas" : "Grupos"}
            </p>
            <button
              type="button"
              title={modo === "1on1" ? "Nova conversa" : "Novo grupo"}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-foreground/10 bg-foreground/[0.03] text-foreground/55 transition-colors hover:border-[var(--color-azure-500)]/40 hover:text-[var(--color-azure-500)]"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={modo === "1on1" ? "Buscar usuário…" : "Buscar grupo…"}
              className="w-full rounded-xl border border-foreground/10 bg-foreground/[0.03] py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-foreground/30 focus:border-[var(--color-azure-500)]/40 focus:outline-none"
            />
          </div>
        </div>

        <div className="custom-scrollbar flex-1 overflow-y-auto p-2">
          {itens.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 opacity-30">
              {modo === "1on1" ? <UsersIcon className="h-8 w-8" /> : <Hash className="h-8 w-8" />}
              <p className="text-[10px] font-black uppercase tracking-[0.3em]">Nada por aqui</p>
            </div>
          ) : (
            <ul className="space-y-1">
              {modo === "1on1"
                ? (itens as UsuarioInterno[]).map((u) => (
                    <UsuarioItem key={u.id} usuario={u} active={u.id === ativoId} onClick={() => setAtivoId(u.id)} />
                  ))
                : (itens as GrupoInterno[]).map((g) => (
                    <GrupoItem key={g.id} grupo={g} active={g.id === ativoId} onClick={() => setAtivoId(g.id)} />
                  ))}
            </ul>
          )}
        </div>

        {modo === "1on1" && (
          <div className="border-t border-foreground/[0.05] p-3">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-foreground/45">
              {USUARIOS_INTERNOS.filter((u) => u.status === "online").length} online ·{" "}
              {USUARIOS_INTERNOS.length} no time
            </p>
          </div>
        )}
      </aside>

      {/* Coluna 2 — Chat ativo */}
      <section className="glass flex flex-1 overflow-hidden rounded-2xl border border-foreground/[0.08]">
        {ativo ? (
          modo === "1on1" ? (
            <ChatUsuario usuario={ativo as UsuarioInterno} />
          ) : (
            <ChatGrupo grupo={ativo as GrupoInterno} />
          )
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 opacity-30">
            <MessageSquare className="h-12 w-12" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em]">Selecione uma conversa</p>
          </div>
        )}
      </section>
    </div>
  );
}

// ============= Item de usuário =============
function UsuarioItem({
  usuario,
  active,
  onClick,
}: {
  usuario: UsuarioInterno;
  active: boolean;
  onClick: () => void;
}) {
  const status = STATUS_ONLINE_INFO[usuario.status];
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "w-full rounded-xl border px-3 py-2.5 text-left transition-all",
          active
            ? "border-[var(--color-azure-500)]/30 bg-[var(--color-azure-500)]/5 shadow-sm"
            : "border-transparent hover:bg-foreground/[0.04]",
        )}
      >
        <div className="flex items-start gap-3">
          <div className="relative shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-foreground/[0.15] to-foreground/[0.08] text-[11px] font-black text-foreground/85 shadow-sm">
              {usuario.iniciais}
            </div>
            <span
              className={cn(
                "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[var(--color-background-elevated)]",
                status.cor,
              )}
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-sm font-bold text-foreground/85">{usuario.nome}</p>
              {usuario.ultimaInteracao && (
                <span className="shrink-0 text-[10px] font-bold tabular-nums text-foreground/40">
                  {usuario.ultimaInteracao}
                </span>
              )}
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/45">
              {usuario.cargo} · {usuario.setor}
            </p>
            {usuario.ultimaMensagem && (
              <p className="mt-1 truncate text-xs text-foreground/55">{usuario.ultimaMensagem}</p>
            )}
            {usuario.naoLidas && usuario.naoLidas > 0 && (
              <span className="mt-1 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[var(--color-brand-primary)] px-1 text-[9px] font-black text-white">
                {usuario.naoLidas}
              </span>
            )}
          </div>
        </div>
      </button>
    </li>
  );
}

// ============= Item de grupo =============
function GrupoItem({
  grupo,
  active,
  onClick,
}: {
  grupo: GrupoInterno;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "w-full rounded-xl border px-3 py-2.5 text-left transition-all",
          active
            ? "border-[var(--color-azure-500)]/30 bg-[var(--color-azure-500)]/5 shadow-sm"
            : "border-transparent hover:bg-foreground/[0.04]",
        )}
      >
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-foreground/[0.12] to-foreground/[0.06] text-base shadow-sm">
            {grupo.emoji ?? <Hash className="h-4 w-4 text-foreground/65" />}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-sm font-bold text-foreground/85">{grupo.nome}</p>
              {grupo.ultimaInteracao && (
                <span className="shrink-0 text-[10px] font-bold tabular-nums text-foreground/40">
                  {grupo.ultimaInteracao}
                </span>
              )}
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/45">
              {grupo.membros} membros · {grupo.membrosOnline ?? 0} online
            </p>
            {grupo.ultimaMensagem && (
              <p className="mt-1 truncate text-xs text-foreground/55">
                <span className="font-semibold text-foreground/65">{grupo.ultimaMensagem.autor}:</span>{" "}
                {grupo.ultimaMensagem.texto}
              </p>
            )}
            {grupo.naoLidas && grupo.naoLidas > 0 && (
              <span className="mt-1 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[var(--color-brand-primary)] px-1 text-[9px] font-black text-white">
                {grupo.naoLidas}
              </span>
            )}
          </div>
        </div>
      </button>
    </li>
  );
}

// ============= Chat 1-on-1 =============
function ChatUsuario({ usuario }: { usuario: UsuarioInterno }) {
  const mensagens = MENSAGENS_INTERNAS[usuario.id] ?? [];
  const status = STATUS_ONLINE_INFO[usuario.status];
  return (
    <ChatLayout
      header={
        <>
          <div className="relative">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-foreground/[0.15] to-foreground/[0.08] text-[10px] font-black text-foreground/85">
              {usuario.iniciais}
            </div>
            <span className={cn("absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--color-background)]", status.cor)} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-black tracking-tight">{usuario.nome}</p>
            <p className="text-[10px] text-foreground/55">
              {usuario.cargo} · {usuario.setor} · {status.label}
            </p>
          </div>
        </>
      }
      mensagens={mensagens}
    />
  );
}

// ============= Chat de Grupo =============
function ChatGrupo({ grupo }: { grupo: GrupoInterno }) {
  const mensagens = MENSAGENS_INTERNAS[grupo.id] ?? [];
  return (
    <ChatLayout
      header={
        <>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-foreground/[0.12] to-foreground/[0.06] text-base">
            {grupo.emoji ?? <Hash className="h-4 w-4 text-foreground/65" />}
          </div>
          <div className="flex-1">
            <p className="text-sm font-black tracking-tight">{grupo.nome}</p>
            <p className="text-[10px] text-foreground/55">
              {grupo.descricao} · {grupo.membros} membros · {grupo.membrosOnline ?? 0} online
            </p>
          </div>
        </>
      }
      mensagens={mensagens}
    />
  );
}

// ============= Layout compartilhado =============
function ChatLayout({
  header,
  mensagens,
}: {
  header: React.ReactNode;
  mensagens: MensagemInterna[];
}) {
  const [draft, setDraft] = useState("");
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center gap-3 border-b border-foreground/[0.05] px-5 py-3">
        {header}
      </header>

      <div className="custom-scrollbar flex-1 space-y-3 overflow-y-auto px-5 py-4">
        {mensagens.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 opacity-30">
            <MessageSquare className="h-8 w-8" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em]">Sem mensagens</p>
          </div>
        ) : (
          mensagens.map((m) => <BolhaInterna key={m.id} mensagem={m} />)
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
            placeholder="Mensagem… (use @ pra mencionar)"
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

function BolhaInterna({ mensagem }: { mensagem: MensagemInterna }) {
  const isMine = mensagem.isMine;
  return (
    <div className={cn("flex gap-2", isMine ? "justify-end" : "justify-start")}>
      {!isMine && (
        <div className="mt-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-foreground/[0.15] to-foreground/[0.08] text-[10px] font-black text-foreground/85">
          {mensagem.autor.iniciais}
        </div>
      )}
      <div
        className={cn(
          "max-w-[70%] rounded-2xl px-4 py-2.5 shadow-sm",
          isMine
            ? "rounded-br-md bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-cyan)] text-white"
            : "rounded-bl-md bg-foreground/[0.06] text-foreground",
        )}
      >
        {!isMine && (
          <p className="mb-1 text-[10px] font-black uppercase tracking-widest opacity-60">
            {mensagem.autor.nome} · {mensagem.autor.setor}
          </p>
        )}
        <p className="whitespace-pre-wrap text-sm leading-relaxed">{mensagem.conteudo}</p>
        <div className="mt-1 flex items-center gap-2 text-[10px] tabular-nums opacity-60">
          <span>{mensagem.ts}</span>
          {mensagem.reacoes && mensagem.reacoes.length > 0 && (
            <div className="flex gap-1">
              {mensagem.reacoes.map((r) => (
                <span
                  key={r.emoji}
                  className={cn(
                    "rounded-md px-1.5 py-0.5 text-[10px]",
                    isMine ? "bg-white/15" : "bg-foreground/[0.08]",
                  )}
                >
                  {r.emoji} {r.count}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
