"use client";

import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Eye, EyeOff, Plug, RotateCcw, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/cn";

const STORAGE_KEY = "md.ixc.config";

interface IXCConfig {
  baseUrl: string;
  userId: string;
  tokenHash: string;
  ultimaConexaoOk?: string;
  ultimaTotal?: number;
}

type TestStatus =
  | { kind: "idle" }
  | { kind: "testing" }
  | { kind: "ok"; total: number; latencyMs: number }
  | { kind: "error"; error: string; latencyMs?: number };

const DEFAULT: IXCConfig = { baseUrl: "", userId: "", tokenHash: "" };

export function IXCConfigForm() {
  const [config, setConfig] = useState<IXCConfig>(DEFAULT);
  const [showToken, setShowToken] = useState(false);
  const [status, setStatus] = useState<TestStatus>({ kind: "idle" });
  const [hidratado, setHidratado] = useState(false);

  // Carrega do localStorage (placeholder até Supabase entrar com tabela `integracoes_credenciais`)
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setConfig(JSON.parse(raw) as IXCConfig);
    } catch {}
    setHidratado(true);
  }, []);

  const handleSalvar = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  };

  const handleLimpar = () => {
    setConfig(DEFAULT);
    window.localStorage.removeItem(STORAGE_KEY);
    setStatus({ kind: "idle" });
  };

  const handleTestar = async () => {
    setStatus({ kind: "testing" });
    try {
      const r = await fetch("/api/ixc/test", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          baseUrl: config.baseUrl.trim(),
          userId: config.userId.trim(),
          tokenHash: config.tokenHash.trim(),
        }),
      });
      const data = await r.json();
      if (data.ok) {
        setStatus({ kind: "ok", total: Number(data.total) || 0, latencyMs: data.latencyMs });
        const novoConfig: IXCConfig = {
          ...config,
          ultimaConexaoOk: new Date().toISOString(),
          ultimaTotal: Number(data.total) || 0,
        };
        setConfig(novoConfig);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(novoConfig));
      } else {
        setStatus({ kind: "error", error: data.error ?? "Erro desconhecido", latencyMs: data.latencyMs });
      }
    } catch (err) {
      setStatus({ kind: "error", error: err instanceof Error ? err.message : String(err) });
    }
  };

  if (!hidratado) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* FORM (col 2) */}
      <div className="space-y-4 lg:col-span-2">
        <div className="glass space-y-4 rounded-2xl border border-foreground/[0.08] p-5">
          <div className="space-y-1.5">
            <Label htmlFor="baseUrl" className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/55">
              URL do webservice
            </Label>
            <Input
              id="baseUrl"
              value={config.baseUrl}
              onChange={(e) => setConfig({ ...config, baseUrl: e.target.value })}
              placeholder="https://seu-ixc.com.br/webservice/v1"
              className="font-mono text-sm"
            />
            <p className="text-[10px] text-foreground/55">
              Formato: domínio do IXC com <code className="rounded bg-foreground/[0.06] px-1">/webservice/v1</code> no fim.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-[1fr_2fr]">
            <div className="space-y-1.5">
              <Label htmlFor="userId" className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/55">
                User ID
              </Label>
              <Input
                id="userId"
                value={config.userId}
                onChange={(e) => setConfig({ ...config, userId: e.target.value })}
                placeholder="ex: 59"
                className="font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tokenHash" className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/55">
                Token (hash)
              </Label>
              <div className="relative">
                <Input
                  id="tokenHash"
                  type={showToken ? "text" : "password"}
                  value={config.tokenHash}
                  onChange={(e) => setConfig({ ...config, tokenHash: e.target.value })}
                  placeholder="abc123…"
                  className="pr-10 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowToken((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-foreground/40 hover:text-foreground/80"
                  tabIndex={-1}
                  aria-label={showToken ? "Ocultar" : "Mostrar"}
                >
                  {showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          <p className="text-[11px] leading-relaxed text-foreground/60">
            O IXC entrega o token no formato <code className="rounded bg-foreground/[0.06] px-1">id:hash</code>. Separe
            em duas variáveis. <strong>Onde achar:</strong> Configurações → Usuários → editar → seção API → marcar
            "Permite acesso a API" → copiar o token gerado.
          </p>

          <div className="flex flex-wrap items-center gap-2 border-t border-foreground/[0.05] pt-4">
            <Button
              type="button"
              onClick={handleTestar}
              disabled={!config.baseUrl || !config.userId || !config.tokenHash || status.kind === "testing"}
            >
              <Plug className="h-4 w-4" />
              {status.kind === "testing" ? "Testando…" : "Testar conexão"}
            </Button>
            <Button type="button" variant="outline" onClick={handleSalvar}>
              Salvar
            </Button>
            <Button type="button" variant="ghost" onClick={handleLimpar}>
              <RotateCcw className="h-4 w-4" />
              Limpar
            </Button>
          </div>

          {/* Status do teste */}
          {status.kind === "ok" && (
            <div className="flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <div className="text-xs">
                <p className="font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Conexão OK · {status.latencyMs}ms
                </p>
                <p className="mt-0.5 text-foreground/65">
                  IXC retornou <strong>{status.total.toLocaleString("pt-BR")}</strong> clientes na base.
                </p>
              </div>
            </div>
          )}
          {status.kind === "error" && (
            <div className="flex items-start gap-3 rounded-xl border border-rose-500/30 bg-rose-500/5 p-3">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
              <div className="text-xs">
                <p className="font-black uppercase tracking-wider text-rose-700 dark:text-rose-400">
                  Falhou {status.latencyMs ? `· ${status.latencyMs}ms` : ""}
                </p>
                <p className="mt-0.5 break-all font-mono text-foreground/65">{status.error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Permissões necessárias */}
        <div className="rounded-2xl border border-foreground/[0.08] bg-foreground/[0.02] p-5">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/55">
            Módulos que precisam estar habilitados na API
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {[
              { tabela: "cliente", uso: "Cadastros + sync principal" },
              { tabela: "cliente_contrato", uso: "Plano, valor mensal, vencimento" },
              { tabela: "fn_areceber", uso: "Boletos, 2ª via, status pagamento" },
              { tabela: "onu", uso: "Status técnico (online/offline) — provedor" },
              { tabela: "su_oss_chamados", uso: "OS técnicas e chamados" },
              { tabela: "radusuarios", uso: "PPPoE, velocidade — provedor" },
              { tabela: "manutencao", uso: "Manutenções programadas / rompimentos" },
            ].map((m) => (
              <div key={m.tabela} className="flex items-center gap-2 text-xs">
                <code className="rounded bg-foreground/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-foreground/85">
                  {m.tabela}
                </code>
                <span className="text-foreground/55">— {m.uso}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SIDEBAR (col 1) */}
      <aside className="space-y-4">
        <div className="glass rounded-2xl border border-foreground/[0.08] p-5">
          <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-foreground/55">
            <Wifi className="h-3 w-3" />
            Status atual
          </p>
          <div className="mt-3 space-y-3 text-xs">
            <Linha
              label="Configurada"
              value={config.baseUrl && config.userId && config.tokenHash ? "Sim" : "Não"}
              ok={Boolean(config.baseUrl && config.userId && config.tokenHash)}
            />
            <Linha
              label="Última conexão OK"
              value={
                config.ultimaConexaoOk
                  ? new Date(config.ultimaConexaoOk).toLocaleString("pt-BR")
                  : "—"
              }
              ok={Boolean(config.ultimaConexaoOk)}
            />
            <Linha
              label="Total de clientes"
              value={config.ultimaTotal?.toLocaleString("pt-BR") ?? "—"}
              ok={Boolean(config.ultimaTotal)}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 text-xs">
          <p className="font-black uppercase tracking-wider text-amber-700 dark:text-amber-400">
            Atenção
          </p>
          <p className="mt-2 leading-relaxed text-foreground/70">
            Por enquanto a config fica salva no <strong>localStorage</strong> (apenas neste navegador).
            Quando o backend entrar, vai pra tabela <code className="rounded bg-foreground/[0.08] px-1">integracoes_credenciais</code>{" "}
            criptografada com a service role key.
          </p>
        </div>
      </aside>
    </div>
  );
}

function Linha({ label, value, ok = false }: { label: string; value: string; ok?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-foreground/[0.05] pb-2 last:border-b-0 last:pb-0">
      <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/45">{label}</span>
      <span className={cn("font-medium", ok ? "text-emerald-600 dark:text-emerald-400" : "text-foreground/65")}>
        {value}
      </span>
    </div>
  );
}
