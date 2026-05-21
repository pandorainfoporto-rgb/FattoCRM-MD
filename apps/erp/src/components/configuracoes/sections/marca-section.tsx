"use client";

import { useState } from "react";
import { Sparkles, Upload } from "lucide-react";
import { SectionCard } from "../section-card";
import { Field, TextInput } from "../field";

export function MarcaSection() {
  const [paleta, setPaleta] = useState({
    primaria: "#0052FF",
    secundaria: "#00D1FF",
    fundo: "#0A0A0B",
  });
  const [tagline, setTagline] = useState("");

  return (
    <SectionCard
      id="marca"
      icon={Sparkles}
      title="Marca"
      description="Logo, paleta e tagline da operação. Aplicado em propostas, e-mails, LP e documentos exportados."
      iconClass="text-fuchsia-500 bg-fuchsia-500/10 border-fuchsia-500/20"
    >
      {/* Logo upload */}
      <div>
        <p className="mb-3 text-[11px] font-black uppercase tracking-[0.2em] text-foreground/55">
          Logo
        </p>
        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-2xl border border-dashed border-foreground/15 bg-foreground/[0.02] px-4 py-8 text-foreground/55 transition-colors hover:border-foreground/30 hover:bg-foreground/[0.04]"
        >
          <Upload className="h-5 w-5" />
          <span className="text-sm font-bold">
            Arraste o arquivo aqui ou clique pra selecionar
          </span>
        </button>
        <p className="mt-2 text-[10px] text-foreground/40">
          SVG ou PNG transparente. Versão clara e versão escura. Mínimo 512×512.
        </p>
      </div>

      {/* Paleta */}
      <div>
        <p className="mb-3 text-[11px] font-black uppercase tracking-[0.2em] text-foreground/55">
          Paleta
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Primária">
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={paleta.primaria}
                onChange={(e) => setPaleta((p) => ({ ...p, primaria: e.target.value }))}
                className="h-10 w-12 cursor-pointer rounded-lg border border-foreground/10 bg-transparent"
              />
              <TextInput
                value={paleta.primaria}
                onChange={(e) => setPaleta((p) => ({ ...p, primaria: e.target.value }))}
                className="flex-1 font-mono text-xs"
              />
            </div>
          </Field>
          <Field label="Secundária">
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={paleta.secundaria}
                onChange={(e) => setPaleta((p) => ({ ...p, secundaria: e.target.value }))}
                className="h-10 w-12 cursor-pointer rounded-lg border border-foreground/10 bg-transparent"
              />
              <TextInput
                value={paleta.secundaria}
                onChange={(e) => setPaleta((p) => ({ ...p, secundaria: e.target.value }))}
                className="flex-1 font-mono text-xs"
              />
            </div>
          </Field>
          <Field label="Fundo escuro">
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={paleta.fundo}
                onChange={(e) => setPaleta((p) => ({ ...p, fundo: e.target.value }))}
                className="h-10 w-12 cursor-pointer rounded-lg border border-foreground/10 bg-transparent"
              />
              <TextInput
                value={paleta.fundo}
                onChange={(e) => setPaleta((p) => ({ ...p, fundo: e.target.value }))}
                className="flex-1 font-mono text-xs"
              />
            </div>
          </Field>
        </div>
      </div>

      {/* Tagline */}
      <Field label="Tagline" hint="Frase curta que aparece em material institucional.">
        <TextInput
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          placeholder="Ex: O CRM que pensa por você."
        />
      </Field>
    </SectionCard>
  );
}
