"use client";

import { useState } from "react";
import { Users, Plus, X } from "lucide-react";
import { SectionCard } from "../section-card";
import { Field, TextInput, Toggle } from "../field";

const PERMS_DEFAULT = [
  { key: "ver_relatorios", label: "Ver relatórios", on: true },
  { key: "editar_clientes", label: "Editar clientes", on: true },
  { key: "transferir_atendimento", label: "Transferir atendimento", on: true },
  { key: "encerrar_atendimento", label: "Encerrar atendimento", on: false },
  { key: "configurar_sistema", label: "Configurar sistema", on: false },
];

export function EquipeSection() {
  const [departamentos, setDepartamentos] = useState<string[]>(["Comercial", "Suporte", "Financeiro"]);
  const [novoDep, setNovoDep] = useState("");
  const [perms, setPerms] = useState(PERMS_DEFAULT);
  const [periodo, setPeriodo] = useState({ inicio: "08:00", fim: "18:00" });

  const addDep = () => {
    const v = novoDep.trim();
    if (!v) return;
    setDepartamentos((d) => [...d, v]);
    setNovoDep("");
  };

  return (
    <SectionCard
      id="equipe"
      icon={Users}
      title="Equipe"
      description="Departamentos, permissões e janela de atendimento. Quando o backend entrar, vira a fonte da fila e dos relatórios de produtividade."
      iconClass="text-violet-500 bg-violet-500/10 border-violet-500/20"
    >
      {/* Departamentos */}
      <div>
        <p className="mb-3 text-[11px] font-black uppercase tracking-[0.2em] text-foreground/55">
          Departamentos
        </p>
        <div className="flex flex-wrap gap-2">
          {departamentos.map((d) => (
            <span
              key={d}
              className="group flex items-center gap-1.5 rounded-full border border-foreground/10 bg-foreground/[0.03] px-3 py-1 text-xs"
            >
              {d}
              <button
                type="button"
                aria-label={`Remover ${d}`}
                onClick={() => setDepartamentos((arr) => arr.filter((x) => x !== d))}
                className="text-foreground/30 transition-colors hover:text-rose-500"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <TextInput
            value={novoDep}
            onChange={(e) => setNovoDep(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addDep())}
            placeholder="Novo departamento…"
            className="flex-1"
          />
          <button
            type="button"
            onClick={addDep}
            className="inline-flex items-center gap-1.5 rounded-xl border border-foreground/10 bg-foreground/[0.04] px-3 py-2 text-[11px] font-black uppercase tracking-wider text-foreground/80 transition-colors hover:border-foreground/20 hover:text-foreground"
          >
            <Plus className="h-3.5 w-3.5" /> Adicionar
          </button>
        </div>
      </div>

      {/* Permissões */}
      <div>
        <p className="mb-3 text-[11px] font-black uppercase tracking-[0.2em] text-foreground/55">
          Permissões padrão (perfil Atendente)
        </p>
        <div className="space-y-2">
          {perms.map((p) => (
            <div
              key={p.key}
              className="flex items-center justify-between rounded-xl border border-foreground/[0.05] bg-foreground/[0.02] px-3 py-2.5"
            >
              <span className="text-sm text-foreground/85">{p.label}</span>
              <Toggle
                checked={p.on}
                onChange={(v) =>
                  setPerms((arr) => arr.map((x) => (x.key === p.key ? { ...x, on: v } : x)))
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Período de atendimento */}
      <div>
        <p className="mb-3 text-[11px] font-black uppercase tracking-[0.2em] text-foreground/55">
          Janela de atendimento padrão
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Início">
            <TextInput
              type="time"
              value={periodo.inicio}
              onChange={(e) => setPeriodo((p) => ({ ...p, inicio: e.target.value }))}
            />
          </Field>
          <Field label="Fim">
            <TextInput
              type="time"
              value={periodo.fim}
              onChange={(e) => setPeriodo((p) => ({ ...p, fim: e.target.value }))}
            />
          </Field>
        </div>
      </div>
    </SectionCard>
  );
}
