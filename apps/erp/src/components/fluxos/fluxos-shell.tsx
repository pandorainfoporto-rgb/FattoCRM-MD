"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  Bot,
  Brain,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Database,
  FileText,
  Filter,
  Headphones,
  Image as ImageIcon,
  Mail,
  MessageSquare,
  Mic,
  Pause,
  PenLine,
  Phone,
  PhoneCall,
  Play,
  Plus,
  Search,
  Send,
  Settings,
  Sparkles,
  TrendingUp,
  UserCheck,
  Wand2,
  X,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Fluxos = Agentes IA Conversacionais.
 *
 * Filosofia (alinhada com Brain/67 do Fatto V2): em vez de builder visual
 * nó-a-nó (Make/Zapier/n8n), cada "fluxo" é um AGENTE IA com persona,
 * canais, capacidades multi-modais (texto/áudio/documento/imagem) e cardápio
 * de tools. O agente conversa como humano e DECIDE quando escalar pro setor.
 *
 * UI hoje é mock. Quando o backend entrar:
 * - Persona/system prompt → agentes_ia.system_prompt
 * - Tools → agentes_ia_tools (registry)
 * - Conversas reais → atendimento_sessoes com agente_id
 * - Métricas → ag_metricas_agente
 */

// ====== TIPOS ======

type Status = "ativo" | "treinando" | "pausado";
type Modelo = "claude-opus" | "claude-sonnet" | "claude-haiku" | "gpt-4" | "gemini-pro";
type Canal = "whatsapp" | "whatsapp-call" | "voz" | "instagram" | "email" | "messenger" | "webchat";
type Capacidade = "texto" | "audio" | "documento" | "imagem";
type ToolKey =
  | "kb_rag"
  | "crm_lookup"
  | "criar_atendimento"
  | "criar_lead"
  | "qualificar_lead"
  | "agendar"
  | "abrir_os"
  | "consultar_pedido"
  | "consultar_boleto"
  | "negociar_divida"
  | "consultar_estoque"
  | "escalar_humano"
  | "buscar_kb"
  | "transcrever_audio"
  | "ler_documento";

interface AgenteMock {
  id: string;
  nome: string;
  setor: string;
  cargo: string;
  cor: string;
  status: Status;
  modelo: Modelo;
  temperatura: number;
  canais: Canal[];
  capacidades: Capacidade[];
  tools: ToolKey[];
  escalonaPara: string[]; // setores
  conversas24h: number;
  resolveuIA: number; // %
  csat?: number;
  systemPrompt: string;
}

// ====== METADADOS ======

const MODELO_LABEL: Record<Modelo, string> = {
  "claude-opus": "Opus 4.7",
  "claude-sonnet": "Sonnet 4.6",
  "claude-haiku": "Haiku 4.5",
  "gpt-4": "GPT-4o",
  "gemini-pro": "Gemini Pro",
};

const CANAL_INFO: Record<Canal, { label: string; icon: LucideIcon; cor: string }> = {
  whatsapp: { label: "WhatsApp", icon: MessageSquare, cor: "text-emerald-500 bg-emerald-500/10" },
  "whatsapp-call": { label: "WA Calling", icon: PhoneCall, cor: "text-emerald-600 bg-emerald-500/15" },
  voz: { label: "Voz PSTN", icon: Phone, cor: "text-amber-500 bg-amber-500/10" },
  instagram: { label: "Instagram", icon: ImageIcon, cor: "text-fuchsia-500 bg-fuchsia-500/10" },
  email: { label: "E-mail", icon: Mail, cor: "text-foreground/65 bg-foreground/[0.05]" },
  messenger: { label: "Messenger", icon: MessageSquare, cor: "text-blue-500 bg-blue-500/10" },
  webchat: { label: "Web Chat", icon: MessageSquare, cor: "text-violet-500 bg-violet-500/10" },
};

const CAPACIDADE_INFO: Record<Capacidade, { label: string; icon: LucideIcon }> = {
  texto: { label: "Texto", icon: PenLine },
  audio: { label: "Áudio", icon: Mic },
  documento: { label: "Documento", icon: FileText },
  imagem: { label: "Imagem", icon: ImageIcon },
};

const TOOL_INFO: Record<ToolKey, { label: string; icon: LucideIcon; cor: string; desc: string }> = {
  kb_rag: { label: "KB (RAG)", icon: Brain, cor: "text-violet-500 bg-violet-500/10", desc: "Busca semântica na base de conhecimento da empresa" },
  buscar_kb: { label: "Buscar KB", icon: Search, cor: "text-violet-500 bg-violet-500/10", desc: "Pesquisa direta em artigos da KB" },
  crm_lookup: { label: "CRM lookup", icon: Database, cor: "text-[var(--color-azure-500)] bg-[var(--color-azure-500)]/10", desc: "Lê cliente/contato/histórico no CRM" },
  criar_atendimento: { label: "Criar atendimento", icon: Plus, cor: "text-emerald-500 bg-emerald-500/10", desc: "Abre uma nova conversa no inbox" },
  criar_lead: { label: "Criar lead", icon: UserCheck, cor: "text-emerald-500 bg-emerald-500/10", desc: "Registra novo lead no funil" },
  qualificar_lead: { label: "Qualificar lead", icon: CheckCircle2, cor: "text-emerald-600 bg-emerald-500/15", desc: "Aplica BANT/score e classifica" },
  agendar: { label: "Agendar", icon: CalendarDays, cor: "text-amber-500 bg-amber-500/10", desc: "Cria evento na agenda do humano" },
  abrir_os: { label: "Abrir OS", icon: Settings, cor: "text-rose-500 bg-rose-500/10", desc: "Cria ordem de serviço técnica" },
  consultar_pedido: { label: "Consultar pedido", icon: Database, cor: "text-blue-500 bg-blue-500/10", desc: "Lê status no provider (IXC/Bling/Shopify)" },
  consultar_boleto: { label: "2ª via boleto", icon: FileText, cor: "text-amber-600 bg-amber-500/15", desc: "Recupera boleto pendente" },
  negociar_divida: { label: "Negociar dívida", icon: TrendingUp, cor: "text-rose-600 bg-rose-500/15", desc: "Aplica regras de desconto/parcelamento" },
  consultar_estoque: { label: "Consultar estoque", icon: Database, cor: "text-blue-500 bg-blue-500/10", desc: "Lê disponibilidade no provider" },
  escalar_humano: { label: "Escalar humano", icon: Headphones, cor: "text-foreground/65 bg-foreground/[0.05]", desc: "Transfere conversa pra atendente" },
  transcrever_audio: { label: "Transcrever áudio", icon: Mic, cor: "text-amber-500 bg-amber-500/10", desc: "Converte voz em texto (Deepgram/Whisper)" },
  ler_documento: { label: "Ler documento", icon: FileText, cor: "text-foreground/65 bg-foreground/[0.05]", desc: "Extrai texto de PDF/imagem (OCR)" },
};

const STATUS_INFO: Record<Status, { label: string; cor: string; dot: string }> = {
  ativo: { label: "Ativo", cor: "text-emerald-600 bg-emerald-500/10", dot: "bg-emerald-500" },
  treinando: { label: "Treinando", cor: "text-amber-600 bg-amber-500/10", dot: "bg-amber-500" },
  pausado: { label: "Pausado", cor: "text-foreground/55 bg-foreground/[0.05]", dot: "bg-foreground/30" },
};

// ====== AGENTES MOCK ======

const AGENTES: AgenteMock[] = [
  {
    id: "ag-cap-01",
    nome: "Sophia",
    setor: "Captação",
    cargo: "Atendente Geral · primeiro contato",
    cor: "from-violet-500 to-fuchsia-500",
    status: "ativo",
    modelo: "claude-haiku",
    temperatura: 0.4,
    canais: ["whatsapp", "instagram", "webchat"],
    capacidades: ["texto", "audio", "imagem"],
    tools: ["kb_rag", "crm_lookup", "criar_lead", "qualificar_lead", "agendar", "escalar_humano", "transcrever_audio"],
    escalonaPara: ["Comercial", "Suporte"],
    conversas24h: 142,
    resolveuIA: 78,
    csat: 4.6,
    systemPrompt:
      "Você é a Sophia, atendente geral de primeiro contato. Tom acolhedor mas direto. Identifica intenção em até 3 mensagens, qualifica BANT (orçamento/autoridade/necessidade/timing) e escala pro setor certo. Nunca prometa o que não pode cumprir.",
  },
  {
    id: "ag-com-04",
    nome: "Bruno",
    setor: "Comercial",
    cargo: "SDR Outbound · pré-venda ativa",
    cor: "from-[var(--color-brand-primary)] to-[var(--color-brand-cyan)]",
    status: "ativo",
    modelo: "claude-sonnet",
    temperatura: 0.5,
    canais: ["whatsapp", "voz", "whatsapp-call"],
    capacidades: ["texto", "audio", "documento"],
    tools: ["crm_lookup", "kb_rag", "qualificar_lead", "consultar_pedido", "agendar", "ler_documento", "escalar_humano"],
    escalonaPara: ["Comercial Closer"],
    conversas24h: 47,
    resolveuIA: 61,
    csat: 4.4,
    systemPrompt:
      "Você é o Bruno, SDR de outbound. Aborda lead frio com curiosidade genuína, descobre dor real, mostra como o produto encaixa. Nunca empurra venda — entrega valor primeiro. Passa pra closer humano quando lead vira oportunidade qualificada.",
  },
  {
    id: "ag-sup-01",
    nome: "Marina N1",
    setor: "Suporte Técnico",
    cargo: "Suporte N1 · diagnóstico inicial",
    cor: "from-emerald-500 to-teal-500",
    status: "ativo",
    modelo: "claude-haiku",
    temperatura: 0.2,
    canais: ["whatsapp", "voz", "email"],
    capacidades: ["texto", "audio", "imagem"],
    tools: ["kb_rag", "crm_lookup", "abrir_os", "consultar_pedido", "transcrever_audio", "escalar_humano"],
    escalonaPara: ["Suporte N2"],
    conversas24h: 234,
    resolveuIA: 89,
    csat: 4.7,
    systemPrompt:
      "Você é a Marina N1. Recebe problema técnico, faz diagnóstico básico (lê KB), tenta resolver pelos passos comuns. Se em 3 tentativas não resolver ou for caso raro, abre OS e escala pro N2 com resumo do diagnóstico.",
  },
  {
    id: "ag-fin-02",
    nome: "Carlos",
    setor: "Financeiro / Cobrança",
    cargo: "Cobrança humanizada",
    cor: "from-amber-500 to-orange-500",
    status: "ativo",
    modelo: "claude-sonnet",
    temperatura: 0.3,
    canais: ["whatsapp", "voz", "whatsapp-call"],
    capacidades: ["texto", "audio", "documento"],
    tools: ["crm_lookup", "consultar_boleto", "negociar_divida", "kb_rag", "escalar_humano"],
    escalonaPara: ["Financeiro Humano"],
    conversas24h: 89,
    resolveuIA: 72,
    csat: 4.2,
    systemPrompt:
      "Você é o Carlos, cobrança humanizada. Tom firme mas empático — entende que dívida é situação delicada. Oferece negociação (parcelamento, desconto à vista) dentro das regras. Nunca constrange. Escala se cliente fica agressivo ou caso jurídico.",
  },
  {
    id: "ag-cap-08",
    nome: "Fernanda",
    setor: "Captação Outbound",
    cargo: "Recuperação de inativos · voz",
    cor: "from-rose-500 to-pink-500",
    status: "treinando",
    modelo: "claude-sonnet",
    temperatura: 0.6,
    canais: ["whatsapp-call", "voz"],
    capacidades: ["texto", "audio"],
    tools: ["crm_lookup", "kb_rag", "agendar", "qualificar_lead", "transcrever_audio"],
    escalonaPara: ["Comercial"],
    conversas24h: 18,
    resolveuIA: 45,
    csat: 4.0,
    systemPrompt:
      "Você é a Fernanda. Liga (voz) pra clientes inativos 30+ dias. Reabre relacionamento sem chatear — pergunta como tá indo, oferece novidade relevante, agenda visita ou demo se houver interesse. Dorme bem se ouvir 'não'.",
  },
  {
    id: "ag-rec-01",
    nome: "Helena",
    setor: "Recepção · Saúde",
    cargo: "Triagem e agendamento (template Telemed)",
    cor: "from-cyan-500 to-blue-500",
    status: "pausado",
    modelo: "claude-haiku",
    temperatura: 0.3,
    canais: ["whatsapp", "voz", "email"],
    capacidades: ["texto", "audio", "imagem", "documento"],
    tools: ["crm_lookup", "agendar", "kb_rag", "ler_documento", "escalar_humano"],
    escalonaPara: ["Médico de plantão", "Administrativo"],
    conversas24h: 0,
    resolveuIA: 0,
    systemPrompt:
      "Você é a Helena, recepção da clínica. Faz triagem inicial (sintoma, urgência), agenda consulta/exame, envia 2ª via de receita após confirmação de identidade. Sigilo médico ABSOLUTO. Nada de diagnóstico — escala pro médico.",
  },
];

// ====== COMPONENTE ======

export function FluxosShell() {
  const [search, setSearch] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<Status | "todos">("todos");
  const [selecionado, setSelecionado] = useState<string | null>(null);

  const filtrados = useMemo(() => {
    const q = search.toLowerCase();
    return AGENTES.filter((a) => {
      if (filtroStatus !== "todos" && a.status !== filtroStatus) return false;
      if (!q) return true;
      return (
        a.nome.toLowerCase().includes(q) ||
        a.setor.toLowerCase().includes(q) ||
        a.cargo.toLowerCase().includes(q)
      );
    });
  }, [search, filtroStatus]);

  const totais = useMemo(() => {
    const ativos = AGENTES.filter((a) => a.status === "ativo").length;
    const conv = AGENTES.reduce((s, a) => s + a.conversas24h, 0);
    const ativosArr = AGENTES.filter((a) => a.status === "ativo" && a.conversas24h > 0);
    const resolMed =
      ativosArr.length > 0
        ? Math.round(ativosArr.reduce((s, a) => s + a.resolveuIA, 0) / ativosArr.length)
        : 0;
    return { agentes: AGENTES.length, ativos, conv, resolMed };
  }, []);

  const agente = AGENTES.find((a) => a.id === selecionado);

  return (
    <div className="space-y-6">
      {/* Métricas */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Agentes IA" value={String(totais.agentes)} icon={Bot} />
        <Metric label="Ativos agora" value={String(totais.ativos)} icon={Zap} accent />
        <Metric label="Conversas (24h)" value={String(totais.conv)} icon={MessageSquare} />
        <Metric label="Resolução média IA" value={`${totais.resolMed}%`} icon={Sparkles} />
      </div>

      {/* Toolbar */}
      <div className="glass flex flex-col gap-3 rounded-2xl border border-foreground/[0.08] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/30" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar agente, setor, cargo…"
              className="w-full rounded-xl border border-foreground/10 bg-foreground/[0.03] px-3 py-2 pl-10 text-sm placeholder:text-foreground/30 focus:border-[var(--color-azure-500)]/40 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-1 rounded-xl border border-foreground/10 bg-foreground/[0.03] p-1">
            {(["todos", "ativo", "treinando", "pausado"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setFiltroStatus(s)}
                className={cn(
                  "rounded-lg px-2.5 py-1 text-[10px] font-black uppercase tracking-wider transition-colors",
                  filtroStatus === s
                    ? "bg-foreground/[0.08] text-foreground"
                    : "text-foreground/55 hover:text-foreground",
                )}
              >
                {s === "todos" ? "Todos" : STATUS_INFO[s].label}
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-azure-500)] px-4 py-2 text-[11px] font-black uppercase tracking-wider text-white transition-colors hover:bg-[var(--color-azure-600)]"
        >
          <Wand2 className="h-3.5 w-3.5" /> Novo agente IA
        </button>
      </div>

      {/* Grid de agentes */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtrados.map((a) => (
          <AgenteCard key={a.id} agente={a} onOpen={() => setSelecionado(a.id)} />
        ))}
        {filtrados.length === 0 && (
          <div className="glass col-span-full flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-foreground/10 p-10 text-foreground/40">
            <Filter className="h-6 w-6" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em]">Nenhum agente</p>
          </div>
        )}
      </div>

      {/* Filosofia explicativa */}
      <div className="glass rounded-2xl border border-foreground/[0.08] p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-500">
            <Brain className="h-4 w-4" />
          </div>
          <div className="text-[12px] leading-relaxed text-foreground/65">
            <p className="font-black text-foreground/85">
              Por que agentes IA em vez de fluxograma nó-a-nó?
            </p>
            <p className="mt-1.5">
              Builder visual (Make/Zapier/n8n) cresce em complexidade exponencial. Cada exceção vira
              ramo novo. <strong className="text-foreground/85">Agente IA com tools</strong> resolve
              isso por inversão: a IA conversa como humano, lê documentos/áudios, decide qual tool
              chamar e quando escalar pro time. Você configura o <em>jeito</em>, não o caminho.
              Atualizar a regra é editar o system prompt — não 40 nós.
            </p>
          </div>
        </div>
      </div>

      {/* Drawer de detalhe */}
      {agente && (
        <AgenteDrawer agente={agente} onClose={() => setSelecionado(null)} />
      )}
    </div>
  );
}

// ====== CARD ======

function AgenteCard({ agente, onOpen }: { agente: AgenteMock; onOpen: () => void }) {
  const status = STATUS_INFO[agente.status];
  const iniciais = agente.nome.slice(0, 2).toUpperCase();

  return (
    <button
      type="button"
      onClick={onOpen}
      className="glass group flex flex-col gap-4 rounded-2xl border border-foreground/[0.08] p-5 text-left transition-all hover:border-foreground/20 hover:shadow-lg"
    >
      <header className="flex items-start gap-3">
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-sm font-black text-white shadow-md",
            agente.cor,
          )}
        >
          {iniciais}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-base font-black tracking-tight">{agente.nome}</p>
            <span
              className={cn(
                "flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wider",
                status.cor,
              )}
            >
              <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} />
              {status.label}
            </span>
          </div>
          <p className="mt-0.5 text-[11px] font-black uppercase tracking-[0.2em] text-foreground/55">
            {agente.setor}
          </p>
          <p className="mt-1 text-xs text-foreground/65 line-clamp-2">{agente.cargo}</p>
        </div>
      </header>

      {/* Canais + capacidades */}
      <div className="space-y-2">
        <div className="flex flex-wrap gap-1">
          {agente.canais.map((c) => {
            const info = CANAL_INFO[c];
            const Icon = info.icon;
            return (
              <span
                key={c}
                className={cn(
                  "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider",
                  info.cor,
                )}
              >
                <Icon className="h-2.5 w-2.5" />
                {info.label}
              </span>
            );
          })}
        </div>
        <div className="flex items-center gap-1.5 text-foreground/40">
          {agente.capacidades.map((c) => {
            const info = CAPACIDADE_INFO[c];
            const Icon = info.icon;
            return (
              <span
                key={c}
                title={`Lê ${info.label.toLowerCase()}`}
                className="inline-flex h-5 w-5 items-center justify-center rounded border border-foreground/10 bg-foreground/[0.03]"
              >
                <Icon className="h-2.5 w-2.5" />
              </span>
            );
          })}
          <span className="ml-1 text-[9px] font-black uppercase tracking-widest">
            multi-modal
          </span>
        </div>
      </div>

      {/* Tools chip */}
      <div className="flex items-center justify-between text-[10px]">
        <span className="rounded-md border border-foreground/10 bg-foreground/[0.03] px-2 py-1 font-black uppercase tracking-wider text-foreground/65">
          {agente.tools.length} tools
        </span>
        <span className="rounded-md border border-foreground/10 bg-foreground/[0.03] px-2 py-1 font-black uppercase tracking-wider text-foreground/65">
          {MODELO_LABEL[agente.modelo]}
        </span>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-3 gap-2 border-t border-foreground/[0.05] pt-3">
        <Stat label="Conv. 24h" value={String(agente.conversas24h)} />
        <Stat label="Resolveu" value={`${agente.resolveuIA}%`} />
        <Stat label="CSAT" value={agente.csat ? agente.csat.toFixed(1) : "—"} />
      </div>

      <footer className="-mb-1 flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-wider text-[var(--color-azure-500)]">
          Configurar
        </span>
        <ArrowUpRight className="h-3.5 w-3.5 text-[var(--color-azure-500)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </footer>
    </button>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-foreground/[0.02] px-2 py-1.5 text-center">
      <p className="text-[8px] font-black uppercase tracking-widest text-foreground/45">{label}</p>
      <p className="mt-0.5 text-sm font-black tabular-nums tracking-tight">{value}</p>
    </div>
  );
}

function Metric({
  label,
  value,
  icon: Icon,
  accent = false,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  accent?: boolean;
}) {
  return (
    <article
      className={cn(
        "glass flex items-center gap-3 rounded-2xl border p-4",
        accent
          ? "border-[var(--color-brand-cyan)]/30 shadow-brand"
          : "border-foreground/[0.08]",
      )}
    >
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-xl border",
          accent
            ? "border-[var(--color-brand-cyan)]/30 bg-[var(--color-brand-cyan)]/10 text-[var(--color-brand-cyan)]"
            : "border-foreground/[0.12] bg-foreground/[0.05] text-foreground/60",
        )}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-foreground/55">
          {label}
        </p>
        <p className="mt-0.5 text-2xl font-black tracking-tight">{value}</p>
      </div>
    </article>
  );
}

// ====== DRAWER DE DETALHE ======

function AgenteDrawer({
  agente,
  onClose,
}: {
  agente: AgenteMock;
  onClose: () => void;
}) {
  const status = STATUS_INFO[agente.status];
  const iniciais = agente.nome.slice(0, 2).toUpperCase();

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
      <button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/40 backdrop-blur-sm"
      />
      <aside className="custom-scrollbar relative h-full w-full max-w-xl overflow-y-auto border-l border-foreground/[0.08] bg-[var(--color-background-elevated)] shadow-2xl">
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-foreground/[0.08] bg-[var(--color-background-elevated)] p-5">
          <div className="flex items-start gap-3">
            <div
              className={cn(
                "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-base font-black text-white shadow-md",
                agente.cor,
              )}
            >
              {iniciais}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight">{agente.nome}</h2>
                <span
                  className={cn(
                    "flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wider",
                    status.cor,
                  )}
                >
                  <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} />
                  {status.label}
                </span>
              </div>
              <p className="mt-0.5 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-azure-500)]">
                {agente.id} · {agente.setor}
              </p>
              <p className="mt-1 text-xs text-foreground/65">{agente.cargo}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="rounded-lg p-2 text-foreground/40 transition-colors hover:bg-foreground/[0.05] hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="space-y-6 p-5">
          {/* Ações rápidas */}
          <div className="flex gap-2">
            <button
              type="button"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-foreground/10 bg-foreground/[0.04] px-3 py-2 text-[11px] font-black uppercase tracking-wider hover:border-foreground/20"
            >
              {agente.status === "ativo" ? (
                <>
                  <Pause className="h-3.5 w-3.5" /> Pausar
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5" /> Ativar
                </>
              )}
            </button>
            <button
              type="button"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-foreground/10 bg-foreground/[0.04] px-3 py-2 text-[11px] font-black uppercase tracking-wider hover:border-foreground/20"
            >
              <Send className="h-3.5 w-3.5" /> Testar no playground
            </button>
            <button
              type="button"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[var(--color-azure-500)] px-3 py-2 text-[11px] font-black uppercase tracking-wider text-white hover:bg-[var(--color-azure-600)]"
            >
              <PenLine className="h-3.5 w-3.5" /> Editar
            </button>
          </div>

          {/* Persona / system prompt */}
          <Block titulo="Persona / System Prompt" icon={Bot}>
            <div className="rounded-xl border border-foreground/[0.05] bg-foreground/[0.02] p-3 text-[12px] leading-relaxed text-foreground/75">
              "{agente.systemPrompt}"
            </div>
            <div className="mt-2 flex flex-wrap gap-2 text-[10px] font-bold text-foreground/55">
              <span className="rounded-md border border-foreground/10 bg-foreground/[0.03] px-2 py-1">
                Modelo · {MODELO_LABEL[agente.modelo]}
              </span>
              <span className="rounded-md border border-foreground/10 bg-foreground/[0.03] px-2 py-1">
                Temp · {agente.temperatura.toFixed(1)}
              </span>
            </div>
          </Block>

          {/* Canais */}
          <Block titulo={`Canais que atende (${agente.canais.length})`} icon={MessageSquare}>
            <div className="grid gap-2 sm:grid-cols-2">
              {agente.canais.map((c) => {
                const info = CANAL_INFO[c];
                const Icon = info.icon;
                return (
                  <div
                    key={c}
                    className="flex items-center gap-2 rounded-xl border border-foreground/[0.05] bg-foreground/[0.02] p-2.5"
                  >
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg",
                        info.cor,
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs font-bold">{info.label}</span>
                  </div>
                );
              })}
            </div>
          </Block>

          {/* Capacidades multi-modais */}
          <Block titulo="Capacidades multi-modais" icon={Sparkles}>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {(["texto", "audio", "documento", "imagem"] as Capacidade[]).map((c) => {
                const has = agente.capacidades.includes(c);
                const info = CAPACIDADE_INFO[c];
                const Icon = info.icon;
                return (
                  <div
                    key={c}
                    className={cn(
                      "flex flex-col items-center gap-1.5 rounded-xl border p-3",
                      has
                        ? "border-emerald-500/20 bg-emerald-500/5 text-foreground"
                        : "border-foreground/[0.05] bg-foreground/[0.02] text-foreground/30",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-[10px] font-black uppercase tracking-wider">
                      {info.label}
                    </span>
                    {has && (
                      <CheckCircle2 className="absolute mt-8 h-3 w-3 text-emerald-500" />
                    )}
                  </div>
                );
              })}
            </div>
          </Block>

          {/* Tools */}
          <Block titulo={`Cardápio de tools (${agente.tools.length})`} icon={Wand2}>
            <div className="space-y-1.5">
              {agente.tools.map((t) => {
                const info = TOOL_INFO[t];
                const Icon = info.icon;
                return (
                  <div
                    key={t}
                    className="flex items-start gap-3 rounded-xl border border-foreground/[0.05] bg-foreground/[0.02] p-3"
                  >
                    <div
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                        info.cor,
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-black">{info.label}</p>
                      <p className="mt-0.5 text-[11px] text-foreground/55">{info.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Block>

          {/* Escalonamento */}
          <Block titulo="Política de escalonamento" icon={Headphones}>
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3">
              <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-400">
                <AlertCircle className="h-3 w-3" />
                Quando a IA escala
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-foreground/75">
                Cliente pede explicitamente humano · 3 falhas seguidas em resolver · caso fora do
                escopo (palavra-chave detectada) · sentimento muito negativo · valor da operação
                acima do limite · cliente VIP.
              </p>
            </div>
            <p className="mt-2 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/55">
              Setores que recebem
            </p>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {agente.escalonaPara.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1 rounded-full bg-foreground/[0.05] px-2.5 py-1 text-[11px] font-bold"
                >
                  <ChevronRight className="h-2.5 w-2.5 text-foreground/30" />
                  {s}
                </span>
              ))}
            </div>
          </Block>

          {/* Métricas históricas (placeholder) */}
          <Block titulo="Métricas (placeholder)" icon={TrendingUp}>
            <div className="grid grid-cols-3 gap-2">
              <DrawerStat label="Conversas hoje" value={String(agente.conversas24h)} />
              <DrawerStat label="% resolvido" value={`${agente.resolveuIA}%`} />
              <DrawerStat label="CSAT" value={agente.csat ? agente.csat.toFixed(1) : "—"} />
            </div>
            <p className="mt-2 text-[10px] text-foreground/40">
              Quando o backend entrar, aparecem gráficos de 7d/30d, top intenções detectadas, taxa
              de escalação por motivo, custo médio por conversa.
            </p>
          </Block>
        </div>
      </aside>
    </div>
  );
}

function Block({
  titulo,
  icon: Icon,
  children,
}: {
  titulo: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <section>
      <header className="mb-2 flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-foreground/55" />
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/65">
          {titulo}
        </h3>
      </header>
      {children}
    </section>
  );
}

function DrawerStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-foreground/[0.05] bg-foreground/[0.02] p-3 text-center">
      <p className="text-[8px] font-black uppercase tracking-widest text-foreground/45">{label}</p>
      <p className="mt-1 text-xl font-black tabular-nums tracking-tight">{value}</p>
    </div>
  );
}
