import type { Metadata } from "next";
import { FluxosShell } from "@/components/fluxos/fluxos-shell";

export const metadata: Metadata = { title: "Fluxos de Comunicação — MD Assessoria" };

export default function FluxosPage() {
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <header>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/55">
          Automação IA
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight">Fluxos de Comunicação</h1>
        <p className="mt-1 max-w-2xl text-sm text-foreground/60">
          Cada fluxo é um <strong className="text-foreground/85">agente IA conversacional</strong>{" "}
          com persona, canais, capacidades multi-modais (texto, áudio, documento, imagem) e cardápio
          de tools. O agente conversa como humano e decide sozinho quando escalar pro setor.
        </p>
      </header>
      <FluxosShell />
    </div>
  );
}
