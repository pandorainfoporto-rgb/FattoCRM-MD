/**
 * Knowledge Base — categorias e artigos seed.
 *
 * Quando schema entrar:
 *   - Cada artigo terá embedding gemini-embedding-001 (768d) + pgvector ANN HNSW
 *   - Versionamento via kb_versoes (rastreabilidade de mudanças)
 *   - Feedback dos agentes via kb_feedback alimenta o ranking RAG
 *   - Brand card injetado automaticamente no topo de cada artigo de copy/voz
 */

import type { LucideIcon } from "lucide-react";
import {
  Wifi,
  DollarSign,
  Megaphone,
  HelpCircle,
  Wrench,
  ShieldCheck,
  Map,
  Sparkles,
  Mic,
  Users,
  Building2,
} from "lucide-react";

export interface CategoriaKB {
  slug: string;
  nome: string;
  descricao: string;
  icon: LucideIcon;
  cor: string;
  bgClass: string;
  artigos: number;
  ultimaAtualizacao: string;
  cobertura: number; // 0-100, % de artigos esperados que já existem
}

export interface ArtigoKB {
  slug: string;
  categoria: string;
  titulo: string;
  resumo: string;
  atualizadoEm: string;
  status: "publicado" | "rascunho" | "obsoleto";
  agentesQueLeem: number;
}

export const CATEGORIAS_KB: CategoriaKB[] = [
  {
    slug: "fibra",
    nome: "Tecnologia da Fibra",
    descricao:
      "Como funciona FTTH, GPON, ONU, OLT, atenuação, sinal, splitter, problemas de cabo. Linguagem que cliente final entende + linguagem técnica pra N2.",
    icon: Wifi,
    cor: "text-sky-500",
    bgClass: "bg-sky-500/10",
    artigos: 0,
    ultimaAtualizacao: "—",
    cobertura: 0,
  },
  {
    slug: "planos",
    nome: "Planos e Ofertas",
    descricao:
      "Catálogo de planos por velocidade, valor, apps inclusos, persona-alvo. Comparador entre planos. Política de upgrade/downgrade.",
    icon: Sparkles,
    cor: "text-violet-500",
    bgClass: "bg-violet-500/10",
    artigos: 0,
    ultimaAtualizacao: "—",
    cobertura: 0,
  },
  {
    slug: "ofertas",
    nome: "Promoções e Campanhas",
    descricao:
      "Promoções vigentes, regras (pagando em dia, indique-amigo, primeira mensalidade grátis), datas de validade. Auto-expira via data.",
    icon: Megaphone,
    cor: "text-amber-500",
    bgClass: "bg-amber-500/10",
    artigos: 0,
    ultimaAtualizacao: "—",
    cobertura: 0,
  },
  {
    slug: "cobertura",
    nome: "Cobertura e Mapa",
    descricao: "Cidades atendidas, bairros, ruas, status (ativa/parcial/em breve). Lista de espera por endereço.",
    icon: Map,
    cor: "text-emerald-500",
    bgClass: "bg-emerald-500/10",
    artigos: 0,
    ultimaAtualizacao: "—",
    cobertura: 0,
  },
  {
    slug: "procedimentos",
    nome: "Procedimentos Top-20",
    descricao:
      "Top motivos de atendimento: internet caiu, lentidão, troca de plano, mudança de endereço, 2ª via, configurar Wi-Fi, etc. Roteiro passo-a-passo + diagnóstico.",
    icon: Wrench,
    cor: "text-cyan-500",
    bgClass: "bg-cyan-500/10",
    artigos: 0,
    ultimaAtualizacao: "—",
    cobertura: 0,
  },
  {
    slug: "manutencao",
    nome: "Manutenção e Diagnóstico",
    descricao:
      "Manutenções programadas, rompimentos, lista de bairros afetados em tempo real. Como diagnosticar pelo status da ONU.",
    icon: Wrench,
    cor: "text-orange-500",
    bgClass: "bg-orange-500/10",
    artigos: 0,
    ultimaAtualizacao: "—",
    cobertura: 0,
  },
  {
    slug: "cobranca",
    nome: "Cobrança e Financeiro",
    descricao:
      "Régua de inadimplência, formas de pagamento, parcelamento, desbloqueio de confiança, política de corte. LGPD na cobrança.",
    icon: DollarSign,
    cor: "text-emerald-600",
    bgClass: "bg-emerald-500/10",
    artigos: 0,
    ultimaAtualizacao: "—",
    cobertura: 0,
  },
  {
    slug: "objecoes",
    nome: "Objeções Comerciais",
    descricao:
      "Top-15 objeções (caro, fidelidade, concorrente, já tenho outro provedor, etc) com argumento e contra-argumento. Tom + linguagem + provas.",
    icon: HelpCircle,
    cor: "text-pink-500",
    bgClass: "bg-pink-500/10",
    artigos: 0,
    ultimaAtualizacao: "—",
    cobertura: 0,
  },
  {
    slug: "concorrentes",
    nome: "Concorrentes e Defesa",
    descricao:
      "Mapa de concorrentes por região + táticas + diferenciais defensáveis. ⚠️ NUNCA citar nome em copy pública — só uso interno.",
    icon: ShieldCheck,
    cor: "text-rose-500",
    bgClass: "bg-rose-500/10",
    artigos: 0,
    ultimaAtualizacao: "—",
    cobertura: 0,
  },
  {
    slug: "scripts-voz",
    nome: "Scripts de Voz",
    descricao:
      "Saudações, transferências, encerramento, espera, fallback de incompreensão. Tom natural pt-BR, com regionalismo aceitável.",
    icon: Mic,
    cor: "text-indigo-500",
    bgClass: "bg-indigo-500/10",
    artigos: 0,
    ultimaAtualizacao: "—",
    cobertura: 0,
  },
  {
    slug: "brand-card",
    nome: "Brand Card (Injetado)",
    descricao:
      "Identidade visual + tom de voz + proibições + frases-âncora. Injetado automaticamente em TODO prompt de agente.",
    icon: Building2,
    cor: "text-foreground",
    bgClass: "bg-foreground/[0.05]",
    artigos: 0,
    ultimaAtualizacao: "—",
    cobertura: 0,
  },
  {
    slug: "manifesto",
    nome: "Manifesto e Posicionamento",
    descricao: "Por que existimos, pra quem, contra quem. História institucional, proof points.",
    icon: Sparkles,
    cor: "text-fuchsia-500",
    bgClass: "bg-fuchsia-500/10",
    artigos: 0,
    ultimaAtualizacao: "—",
    cobertura: 0,
  },
  {
    slug: "estrategia",
    nome: "Estratégia e Negócio",
    descricao: "Visão executiva, OKRs, roadmap, alocação. Consumido só pelo Jarvis (CEO IA).",
    icon: Users,
    cor: "text-amber-500",
    bgClass: "bg-amber-500/10",
    artigos: 0,
    ultimaAtualizacao: "—",
    cobertura: 0,
  },
];

export const ARTIGOS_SEED: ArtigoKB[] = [];
