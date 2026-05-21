"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Download,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  Search,
  Users as UsersIcon,
  X,
} from "lucide-react";
import type { IXCCliente } from "@md/providers-ixc";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const CACHE_KEY = "md.ixc.clientes";
const CACHE_META_KEY = "md.ixc.clientes.meta";

interface CacheMeta {
  ultimaSync: string;
  total: number;
  latencyMs: number;
}

type SyncStatus =
  | { kind: "idle" }
  | { kind: "syncing" }
  | { kind: "ok" }
  | { kind: "error"; error: string };

export function ClientesShell() {
  const [clientes, setClientes] = useState<IXCCliente[]>([]);
  const [meta, setMeta] = useState<CacheMeta | null>(null);
  const [status, setStatus] = useState<SyncStatus>({ kind: "idle" });
  const [search, setSearch] = useState("");
  const [aberto, setAberto] = useState<IXCCliente | null>(null);

  // Hidrata cache do localStorage
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CACHE_KEY);
      const metaRaw = window.localStorage.getItem(CACHE_META_KEY);
      if (raw) setClientes(JSON.parse(raw) as IXCCliente[]);
      if (metaRaw) setMeta(JSON.parse(metaRaw) as CacheMeta);
    } catch {}
  }, []);

  const handleAtualizar = async () => {
    setStatus({ kind: "syncing" });
    try {
      const configRaw = window.localStorage.getItem("md.ixc.config");
      const config = configRaw ? JSON.parse(configRaw) : {};
      const r = await fetch("/api/ixc/sync", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          baseUrl: config.baseUrl,
          userId: config.userId,
          tokenHash: config.tokenHash,
          pageSize: 200,
          maxPages: 50,
        }),
      });
      const data = await r.json();
      if (!data.ok) {
        setStatus({ kind: "error", error: data.error ?? "Erro" });
        return;
      }
      const list: IXCCliente[] = data.clientes ?? [];
      const newMeta: CacheMeta = {
        ultimaSync: new Date().toISOString(),
        total: list.length,
        latencyMs: data.latencyMs ?? 0,
      };
      setClientes(list);
      setMeta(newMeta);
      window.localStorage.setItem(CACHE_KEY, JSON.stringify(list));
      window.localStorage.setItem(CACHE_META_KEY, JSON.stringify(newMeta));
      setStatus({ kind: "ok" });
    } catch (err) {
      setStatus({ kind: "error", error: err instanceof Error ? err.message : String(err) });
    }
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return clientes;
    return clientes.filter(
      (c) =>
        c.razao?.toLowerCase().includes(q) ||
        c.cnpj_cpf?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.telefone_celular?.toLowerCase().includes(q) ||
        c.cidade?.toLowerCase().includes(q),
    );
  }, [clientes, search]);

  const exportCsv = () => {
    if (clientes.length === 0) return;
    const cabecalho = [
      "id", "razao", "cnpj_cpf", "tipo_pessoa", "ativo", "email",
      "telefone_celular", "whatsapp", "cidade", "uf", "endereco", "bairro", "cep",
    ];
    const linhas = clientes.map((c) =>
      cabecalho.map((k) => csvEscape(String((c as unknown as Record<string, unknown>)[k] ?? ""))).join(","),
    );
    const csv = [cabecalho.join(","), ...linhas].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `clientes-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="glass flex flex-col gap-3 rounded-2xl border border-foreground/[0.08] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/55">
              Total na base
            </p>
            <p className="text-2xl font-black tabular-nums tracking-tight">
              {clientes.length.toLocaleString("pt-BR")}
            </p>
          </div>
          {meta && (
            <div className="border-l border-foreground/[0.08] pl-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/55">
                Última sync
              </p>
              <p className="text-xs font-medium text-foreground/85">
                {new Date(meta.ultimaSync).toLocaleString("pt-BR")}
              </p>
              <p className="text-[10px] text-foreground/45">{meta.latencyMs}ms</p>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={exportCsv}
            disabled={clientes.length === 0}
          >
            <Download className="h-4 w-4" />
            Exportar CSV
          </Button>
          <Button type="button" onClick={handleAtualizar} disabled={status.kind === "syncing"}>
            <RefreshCw className={cn("h-4 w-4", status.kind === "syncing" && "animate-spin")} />
            {status.kind === "syncing" ? "Atualizando…" : "Atualizar Base"}
          </Button>
        </div>
      </div>

      {/* Status banner */}
      {status.kind === "error" && (
        <div className="flex items-start gap-3 rounded-2xl border border-rose-500/30 bg-rose-500/5 p-4">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
          <div className="flex-1 text-xs">
            <p className="font-black uppercase tracking-wider text-rose-700 dark:text-rose-400">
              Falha na sincronização
            </p>
            <p className="mt-1 break-all font-mono text-foreground/65">{status.error}</p>
            <p className="mt-2 text-foreground/55">
              Confere as credenciais em{" "}
              <a href="/ferramentas/integracoes/ixc" className="font-bold text-[var(--color-azure-500)] hover:underline">
                Ferramentas › Integrações › IXC
              </a>
              .
            </p>
          </div>
        </div>
      )}
      {status.kind === "ok" && (
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
          <div className="text-xs">
            <p className="font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Base atualizada
            </p>
            <p className="mt-0.5 text-foreground/65">
              {clientes.length.toLocaleString("pt-BR")} clientes sincronizados.
            </p>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative max-w-xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/30" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nome, CPF/CNPJ, e-mail, telefone, cidade…"
          className="h-11 w-full rounded-xl border border-foreground/10 bg-foreground/[0.03] pl-10 pr-3 text-sm focus:border-[var(--color-azure-500)]/40 focus:outline-none"
        />
      </div>

      {/* Tabela */}
      {clientes.length === 0 ? (
        <EmptyState />
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-12 opacity-30">
          <Search className="h-8 w-8" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em]">Nenhum resultado</p>
        </div>
      ) : (
        <div className="glass overflow-hidden rounded-2xl border border-foreground/[0.08]">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="border-b border-foreground/[0.08] bg-foreground/[0.03]">
                <tr className="text-left">
                  <th className="px-4 py-2.5 font-black uppercase tracking-widest text-foreground/55">ID</th>
                  <th className="px-4 py-2.5 font-black uppercase tracking-widest text-foreground/55">Cliente</th>
                  <th className="px-4 py-2.5 font-black uppercase tracking-widest text-foreground/55">CPF/CNPJ</th>
                  <th className="px-4 py-2.5 font-black uppercase tracking-widest text-foreground/55">Cidade</th>
                  <th className="px-4 py-2.5 font-black uppercase tracking-widest text-foreground/55">Contato</th>
                  <th className="px-4 py-2.5 font-black uppercase tracking-widest text-foreground/55">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.slice(0, 200).map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => setAberto(c)}
                    className="cursor-pointer border-b border-foreground/[0.05] transition-colors last:border-b-0 hover:bg-foreground/[0.04]"
                  >
                    <td className="px-4 py-3 font-mono tabular-nums text-foreground/55">#{c.id}</td>
                    <td className="px-4 py-3">
                      <p className="font-bold text-foreground">{c.razao}</p>
                      {c.fantasia && <p className="text-foreground/55">{c.fantasia}</p>}
                    </td>
                    <td className="px-4 py-3 font-mono text-foreground/85">{c.cnpj_cpf}</td>
                    <td className="px-4 py-3 text-foreground/85">
                      {c.cidade}{c.uf ? ` · ${c.uf}` : ""}
                    </td>
                    <td className="px-4 py-3 text-foreground/85">
                      {c.telefone_celular ?? c.whatsapp ?? c.email ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-black uppercase tracking-widest",
                          c.ativo === "S"
                            ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-600"
                            : "border-foreground/10 bg-foreground/[0.03] text-foreground/55",
                        )}
                      >
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            c.ativo === "S" ? "bg-emerald-500" : "bg-foreground/30",
                          )}
                        />
                        {c.ativo === "S" ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length > 200 && (
            <div className="border-t border-foreground/[0.08] bg-foreground/[0.03] px-4 py-2 text-center text-[10px] font-bold uppercase tracking-widest text-foreground/55">
              Mostrando 200 de {filtered.length.toLocaleString("pt-BR")} · paginação plena chega com a tabela `clientes` no Supabase
            </div>
          )}
        </div>
      )}

      {/* Drawer detalhe */}
      {aberto && <ClienteDrawer cliente={aberto} onClose={() => setAberto(null)} />}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="glass flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-foreground/15 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground/[0.04] text-foreground/40">
        <UsersIcon className="h-6 w-6" />
      </div>
      <h3 className="text-base font-black tracking-tight">Base vazia</h3>
      <p className="max-w-md text-sm text-foreground/55">
        Configure a integração IXC e clica em <strong>Atualizar Base</strong> pra puxar todos os
        clientes do seu provedor. Em sequência os contratos, boletos e ONUs vão entrar.
      </p>
      <a
        href="/ferramentas/integracoes/ixc"
        className="mt-2 inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-azure-500)] px-4 py-2 text-xs font-black uppercase tracking-wider text-white transition-colors hover:bg-[var(--color-azure-600)]"
      >
        Configurar IXC →
      </a>
    </div>
  );
}

function ClienteDrawer({ cliente, onClose }: { cliente: IXCCliente; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog">
      <button type="button" aria-label="Fechar" onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative flex h-full w-full max-w-lg flex-col overflow-hidden border-l border-foreground/[0.08] bg-[var(--color-background-elevated)] shadow-2xl">
        <header className="flex items-start gap-4 border-b border-foreground/[0.08] p-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-brand-primary)]/15 to-[var(--color-brand-cyan)]/15 text-base font-black text-foreground/85">
            {(cliente.razao ?? "C").slice(0, 2).toUpperCase()}
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/45">
              IXC · #{cliente.id} · {cliente.tipo_pessoa === "F" ? "Pessoa Física" : "Pessoa Jurídica"}
            </p>
            <h2 className="mt-1 text-xl font-black tracking-tight">{cliente.razao}</h2>
            {cliente.fantasia && <p className="text-sm text-foreground/65">{cliente.fantasia}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="rounded-lg p-2 text-foreground/55 transition-colors hover:bg-foreground/[0.05] hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="custom-scrollbar flex-1 overflow-y-auto p-5">
          <Section titulo="Documentos">
            <Linha k="CPF/CNPJ" v={cliente.cnpj_cpf} mono />
            {cliente.rg && <Linha k="RG" v={cliente.rg} mono />}
            {cliente.data_nascimento && <Linha k="Nascimento" v={cliente.data_nascimento} />}
          </Section>

          <Section titulo="Contato">
            {cliente.email && <Linha k={<><Mail className="h-3 w-3" /> E-mail</>} v={cliente.email} />}
            {cliente.telefone_celular && <Linha k={<><Phone className="h-3 w-3" /> Celular</>} v={cliente.telefone_celular} mono />}
            {cliente.telefone_secundario && <Linha k="Telefone 2" v={cliente.telefone_secundario} mono />}
            {cliente.whatsapp && <Linha k="WhatsApp" v={cliente.whatsapp} mono />}
          </Section>

          <Section titulo="Endereço">
            {cliente.endereco && <Linha k={<><MapPin className="h-3 w-3" /> Logradouro</>} v={`${cliente.endereco}${cliente.numero ? `, ${cliente.numero}` : ""}`} />}
            {cliente.complemento && <Linha k="Complemento" v={cliente.complemento} />}
            {cliente.bairro && <Linha k="Bairro" v={cliente.bairro} />}
            {cliente.cep && <Linha k="CEP" v={cliente.cep} mono />}
            {cliente.cidade && <Linha k="Cidade" v={`${cliente.cidade}${cliente.uf ? ` · ${cliente.uf}` : ""}`} />}
          </Section>

          {cliente.observacoes && (
            <Section titulo="Observações">
              <p className="rounded-xl border border-foreground/[0.08] bg-foreground/[0.02] p-3 text-xs leading-relaxed text-foreground/75">
                {cliente.observacoes}
              </p>
            </Section>
          )}

          <Section titulo="Cadastro IXC">
            <Linha k="ID" v={`#${cliente.id}`} mono />
            <Linha k="Status" v={cliente.ativo === "S" ? "Ativo" : "Inativo"} />
            {cliente.data_cadastro && <Linha k="Cadastrado em" v={cliente.data_cadastro} />}
          </Section>

          <div className="mt-6 rounded-2xl border border-dashed border-foreground/15 bg-foreground/[0.02] p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/55">Em construção</p>
            <p className="mt-1.5 text-xs leading-relaxed text-foreground/65">
              Aqui vão entrar: contratos ativos, boletos abertos, status da ONU em tempo real, OS
              técnicas e histórico completo de atendimentos. Tudo via polling do IXC.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="mb-5">
      <h3 className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-foreground/55">{titulo}</h3>
      <div className="space-y-1.5">{children}</div>
    </section>
  );
}

function Linha({ k, v, mono = false }: { k: React.ReactNode; v: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-foreground/[0.05] py-1.5 last:border-b-0">
      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-foreground/45">
        {k}
      </span>
      <span className={cn("text-xs font-medium text-foreground/85", mono && "font-mono")}>{v}</span>
    </div>
  );
}

function csvEscape(s: string): string {
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}
