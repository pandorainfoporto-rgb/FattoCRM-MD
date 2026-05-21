"use client";

import { useState } from "react";
import { MessageSquareText, Plus, X } from "lucide-react";
import { SectionCard } from "../section-card";
import { TextArea, TextInput } from "../field";

const ETIQUETAS_DEFAULT = ["VIP", "Urgente", "Negociação", "Pós-venda", "Reclamação"];
const MENSAGENS_DEFAULT = [
  { atalho: "/oi", texto: "Olá! Como posso ajudar?" },
  { atalho: "/aguarde", texto: "Vou verificar pra você, um momento." },
  { atalho: "/obrigado", texto: "Obrigado pelo contato! Qualquer coisa estou aqui." },
];

export function AtendimentoSection() {
  const [etiquetas, setEtiquetas] = useState<string[]>(ETIQUETAS_DEFAULT);
  const [novaEtiqueta, setNovaEtiqueta] = useState("");
  const [motivos, setMotivos] = useState(
    "Dúvida\nReclamação\nNegociação\nSolicitação técnica\nCancelamento",
  );
  const [mensagens, setMensagens] = useState(MENSAGENS_DEFAULT);

  const addEtiqueta = () => {
    const v = novaEtiqueta.trim();
    if (!v) return;
    setEtiquetas((arr) => [...arr, v]);
    setNovaEtiqueta("");
  };

  return (
    <SectionCard
      id="atendimento"
      icon={MessageSquareText}
      title="Atendimento"
      description="Etiquetas pra classificar conversa, motivos pra fechar, mensagens rápidas pra responder em segundos."
      iconClass="text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
    >
      {/* Etiquetas */}
      <div>
        <p className="mb-3 text-[11px] font-black uppercase tracking-[0.2em] text-foreground/55">
          Etiquetas
        </p>
        <div className="flex flex-wrap gap-2">
          {etiquetas.map((e) => (
            <span
              key={e}
              className="flex items-center gap-1.5 rounded-full bg-[var(--color-azure-500)]/10 px-3 py-1 text-xs font-bold text-[var(--color-azure-500)]"
            >
              {e}
              <button
                type="button"
                aria-label={`Remover ${e}`}
                onClick={() => setEtiquetas((arr) => arr.filter((x) => x !== e))}
                className="opacity-50 transition-opacity hover:opacity-100"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <TextInput
            value={novaEtiqueta}
            onChange={(e) => setNovaEtiqueta(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addEtiqueta())}
            placeholder="Nova etiqueta…"
            className="flex-1"
          />
          <button
            type="button"
            onClick={addEtiqueta}
            className="inline-flex items-center gap-1.5 rounded-xl border border-foreground/10 bg-foreground/[0.04] px-3 py-2 text-[11px] font-black uppercase tracking-wider"
          >
            <Plus className="h-3.5 w-3.5" /> Adicionar
          </button>
        </div>
      </div>

      {/* Motivos */}
      <div>
        <p className="mb-3 text-[11px] font-black uppercase tracking-[0.2em] text-foreground/55">
          Motivos do atendimento
        </p>
        <TextArea
          rows={5}
          value={motivos}
          onChange={(e) => setMotivos(e.target.value)}
          placeholder="Um motivo por linha"
          className="w-full"
        />
        <p className="mt-1 text-[10px] text-foreground/40">
          Um por linha. Aparece como dropdown ao encerrar atendimento.
        </p>
      </div>

      {/* Mensagens rápidas */}
      <div>
        <p className="mb-3 text-[11px] font-black uppercase tracking-[0.2em] text-foreground/55">
          Mensagens rápidas
        </p>
        <div className="space-y-2">
          {mensagens.map((m, i) => (
            <div
              key={i}
              className="grid gap-2 rounded-xl border border-foreground/[0.05] bg-foreground/[0.02] p-3 sm:grid-cols-[110px_1fr_auto]"
            >
              <TextInput
                value={m.atalho}
                onChange={(e) => {
                  const v = e.target.value;
                  setMensagens((arr) => arr.map((x, idx) => (idx === i ? { ...x, atalho: v } : x)));
                }}
                placeholder="/atalho"
                className="font-mono text-xs"
              />
              <TextInput
                value={m.texto}
                onChange={(e) => {
                  const v = e.target.value;
                  setMensagens((arr) => arr.map((x, idx) => (idx === i ? { ...x, texto: v } : x)));
                }}
                placeholder="Texto da mensagem"
              />
              <button
                type="button"
                aria-label="Remover"
                onClick={() => setMensagens((arr) => arr.filter((_, idx) => idx !== i))}
                className="rounded-lg p-2 text-foreground/40 transition-colors hover:bg-rose-500/10 hover:text-rose-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setMensagens((arr) => [...arr, { atalho: "", texto: "" }])}
            className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-foreground/15 px-3 py-2 text-[11px] font-black uppercase tracking-wider text-foreground/55 hover:border-foreground/30 hover:text-foreground"
          >
            <Plus className="h-3.5 w-3.5" /> Nova mensagem
          </button>
        </div>
      </div>
    </SectionCard>
  );
}
