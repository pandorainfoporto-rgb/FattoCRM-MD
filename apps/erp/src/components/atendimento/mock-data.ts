/**
 * Mock data temporário pra inbox de atendimento.
 * Vai ser substituído por queries Supabase quando schema entrar.
 */

import type { LucideIcon } from "lucide-react";
import { MessageCircle, Instagram, Mail, Globe, Send, PhoneCall } from "lucide-react";

export type CanalTipo = "wa" | "instagram" | "email" | "webchat" | "telegram" | "voice";

export const CANAL_INFO: Record<CanalTipo, { icon: LucideIcon; label: string; color: string }> = {
  wa: { icon: MessageCircle, label: "WhatsApp", color: "text-emerald-500" },
  instagram: { icon: Instagram, label: "Instagram", color: "text-pink-500" },
  email: { icon: Mail, label: "E-mail", color: "text-sky-500" },
  webchat: { icon: Globe, label: "Webchat", color: "text-indigo-500" },
  telegram: { icon: Send, label: "Telegram", color: "text-cyan-500" },
  voice: { icon: PhoneCall, label: "Voz", color: "text-rose-500" },
};

/**
 * Status do atendimento — direciona em qual aba do topo a conversa aparece.
 *
 *   ia        → atendido pelos agentes IA. Se não precisar de transferência,
 *               passa por avaliação e encerra. Se IA transferir → vira "fila".
 *   fila      → transferido da IA pra humano, aguardando atendente assumir.
 *   humano    → humano em atendimento ativo.
 *   arquivado → encerrado e arquivado pra histórico.
 */
export type StatusAtendimento = "ia" | "fila" | "humano" | "arquivado";

/** Quem é o cliente neste momento da conversa (papel atual) */
export type AtendenteTipo = "ia" | "humano" | "aguardando";

export interface ConversaMock {
  id: string;
  contato: { nome: string; iniciais: string; identificador: string; cliente: boolean };
  canal: CanalTipo;
  protocolo: string;
  abertoEm: string;
  tempoMedio: string;
  ultimaMensagem: { texto: string; ts: string; lida: boolean; papel: "cliente" | "atendente" | "sistema" };
  naoLidas: number;
  responsavel: AtendenteTipo;
  /** Status que controla em qual tab a conversa aparece */
  statusAtendimento: StatusAtendimento;
  tags?: string[];
  prioridade?: "baixa" | "normal" | "alta" | "urgente";
  /** Se veio de campanha de conversão, fica etiquetado como lead automaticamente */
  origemCampanha?: string;
  /** True quando contato é classificado como lead (campanha ou primeira interação) */
  isLead?: boolean;
  /** Insights gerados pela IA sobre o atendimento atual */
  iaInsights?: IAInsights;
}

export type Sentimento = "positivo" | "neutro" | "negativo" | "irritado";

export interface IAInsights {
  sentimento: Sentimento;
  intencao: string;          // ex: "Solicitar 2ª via de boleto"
  proximaAcao: string;       // sugestão pra atendente
  alerta?: string;           // alerta crítico (ex: cliente em risco de churn)
  confianca: number;         // 0-100
  topicos?: string[];        // ex: ["cobertura", "preço"]
}

export interface MensagemMock {
  id: string;
  papel: "cliente" | "atendente" | "ia" | "sistema";
  conteudo: string;
  ts: string;
}

export const CONVERSAS: ConversaMock[] = [
  // ====== EM ATENDIMENTO HUMANO ======
  {
    id: "c-001",
    contato: { nome: "Maria Souza", iniciais: "MS", identificador: "+55 46 99811-2233", cliente: false },
    canal: "wa",
    protocolo: "FC-2026-04-12345",
    abertoEm: "há 8 min",
    tempoMedio: "00:12:34",
    ultimaMensagem: { texto: "Oi! Vocês têm fibra na minha rua?", ts: "agora", lida: false, papel: "cliente" },
    naoLidas: 2,
    responsavel: "humano",
    statusAtendimento: "humano",
    tags: ["cobertura"],
    prioridade: "alta",
    isLead: true,
    iaInsights: {
      sentimento: "neutro",
      intencao: "Validar cobertura na rua e conhecer planos",
      proximaAcao: "Confirmar endereço, mostrar plano 750M (mais escolhido), oferecer instalação 24h",
      confianca: 88,
      topicos: ["cobertura", "preço"],
    },
  },
  {
    id: "c-002",
    contato: { nome: "João Pereira", iniciais: "JP", identificador: "+55 46 99771-8843", cliente: true },
    canal: "wa",
    protocolo: "FC-2026-04-12340",
    abertoEm: "há 22 min",
    tempoMedio: "00:08:42",
    ultimaMensagem: { texto: "Obrigado! Vou pagar hoje.", ts: "5 min", lida: true, papel: "cliente" },
    naoLidas: 0,
    responsavel: "humano",
    statusAtendimento: "humano",
    tags: ["cobranca"],
    prioridade: "normal",
  },
  {
    id: "c-005",
    contato: { nome: "comercial@empresa.com", iniciais: "EM", identificador: "comercial@empresa.com", cliente: false },
    canal: "email",
    protocolo: "FC-2026-04-12330",
    abertoEm: "há 1 h",
    tempoMedio: "00:33:12",
    ultimaMensagem: { texto: "Solicitação de proposta corporativa", ts: "1 h", lida: true, papel: "cliente" },
    naoLidas: 0,
    responsavel: "humano",
    statusAtendimento: "humano",
    tags: ["b2b"],
    prioridade: "normal",
    isLead: true,
  },
  {
    id: "c-007",
    contato: { nome: "Lucia Mendes", iniciais: "LM", identificador: "+55 46 99550-1144", cliente: true },
    canal: "wa",
    protocolo: "FC-2026-04-12290",
    abertoEm: "há 3 h",
    tempoMedio: "00:14:09",
    ultimaMensagem: { texto: "Recebi a fatura, valeu", ts: "3 h", lida: true, papel: "cliente" },
    naoLidas: 0,
    responsavel: "humano",
    statusAtendimento: "humano",
    prioridade: "baixa",
  },

  // ====== NA FILA (IA transferiu pra humano) ======
  {
    id: "c-004",
    contato: { nome: "Carlos Ribeiro", iniciais: "CR", identificador: "+55 46 98823-7766", cliente: true },
    canal: "voice",
    protocolo: "FC-2026-04-12337",
    abertoEm: "há 48 min",
    tempoMedio: "00:18:55",
    ultimaMensagem: { texto: "[Áudio · 2:34] Cliente solicita cancelamento", ts: "18 min", lida: false, papel: "cliente" },
    naoLidas: 1,
    responsavel: "aguardando",
    statusAtendimento: "fila",
    tags: ["retencao"],
    prioridade: "urgente",
    iaInsights: {
      sentimento: "irritado",
      intencao: "Cancelar serviço imediatamente",
      proximaAcao: "Empatia primeiro. Não defender. Ouvir o problema. Só depois propor retenção.",
      alerta: "Cliente em risco de churn — base há 2 anos. Acionar AG-SUP-06 (Cíntia C. · Anti-Churn).",
      confianca: 92,
      topicos: ["cancelamento", "insatisfação"],
    },
  },
  {
    id: "c-009",
    contato: { nome: "Marina Vieira", iniciais: "MV", identificador: "+55 46 99882-1170", cliente: false },
    canal: "wa",
    protocolo: "FC-2026-05-12410",
    abertoEm: "há 4 min",
    tempoMedio: "00:00:00",
    ultimaMensagem: { texto: "Quero falar com um humano sobre o plano de 1G", ts: "4 min", lida: false, papel: "cliente" },
    naoLidas: 1,
    responsavel: "aguardando",
    statusAtendimento: "fila",
    tags: ["upgrade"],
    prioridade: "alta",
    origemCampanha: "Google Ads · Plano 1G",
    isLead: true,
    iaInsights: {
      sentimento: "positivo",
      intencao: "Avaliar upgrade pro plano 1G",
      proximaAcao: "Atender rápido — interesse claro, veio de campanha. Mostrar economia em 12 meses.",
      confianca: 85,
      topicos: ["upgrade", "preço"],
    },
  },

  // ====== ATENDIDO PELA IA ======
  {
    id: "c-003",
    contato: { nome: "Ana Vargas", iniciais: "AV", identificador: "@ana.vargas", cliente: false },
    canal: "instagram",
    protocolo: "FC-2026-04-12338",
    abertoEm: "há 35 min",
    tempoMedio: "00:04:11",
    ultimaMensagem: { texto: "Vi o post sobre os planos novos!", ts: "12 min", lida: false, papel: "cliente" },
    naoLidas: 1,
    responsavel: "ia",
    statusAtendimento: "ia",
    prioridade: "normal",
    isLead: true,
  },
  {
    id: "c-006",
    contato: { nome: "Visitante #4521", iniciais: "V?", identificador: "Webchat anônimo", cliente: false },
    canal: "webchat",
    protocolo: "FC-2026-04-12325",
    abertoEm: "há 2 h",
    tempoMedio: "00:02:08",
    ultimaMensagem: { texto: "Quanto custa o plano de 1 GB?", ts: "2 h", lida: true, papel: "cliente" },
    naoLidas: 0,
    responsavel: "ia",
    statusAtendimento: "ia",
    prioridade: "normal",
    isLead: true,
  },
  {
    id: "c-008",
    contato: { nome: "Roberto Santos", iniciais: "RS", identificador: "+55 46 99445-3322", cliente: false },
    canal: "wa",
    protocolo: "FC-2026-05-12420",
    abertoEm: "há 2 min",
    tempoMedio: "00:00:42",
    ultimaMensagem: { texto: "Quanto custa?", ts: "agora", lida: false, papel: "cliente" },
    naoLidas: 1,
    responsavel: "ia",
    statusAtendimento: "ia",
    prioridade: "normal",
    origemCampanha: "Meta Ads · Lançamento Plano TOP",
    isLead: true,
    iaInsights: {
      sentimento: "neutro",
      intencao: "Saber preço do Plano TOP",
      proximaAcao: "Preço já enviado. Aguardar 2 min antes de enviar prova social. Se silêncio, pedir endereço.",
      confianca: 78,
      topicos: ["preço", "plano TOP"],
    },
  },

  // ====== ARQUIVADOS ======
  {
    id: "c-100",
    contato: { nome: "Pedro Almeida", iniciais: "PA", identificador: "+55 46 99711-0098", cliente: true },
    canal: "wa",
    protocolo: "FC-2026-04-12100",
    abertoEm: "ontem",
    tempoMedio: "00:09:33",
    ultimaMensagem: { texto: "Perfeito, obrigado!", ts: "ontem", lida: true, papel: "cliente" },
    naoLidas: 0,
    responsavel: "humano",
    statusAtendimento: "arquivado",
    prioridade: "baixa",
  },
];

export const MENSAGENS_POR_CONVERSA: Record<string, MensagemMock[]> = {
  "c-001": [
    { id: "m-1", papel: "cliente", conteudo: "Boa tarde, tudo bem? Aqui é o Rafael da SOLINTEL, estou entrando em contato pela 4ª fatura em aberto em nosso sistema de NOVEMBRO/2025 e ABRIL/2026. Poderíamos alinhar o pagamento dessas boletos o quanto antes? Fico no aguardo da resposta, obrigado!", ts: "14:08" },
    { id: "m-2", papel: "ia", conteudo: "Olá! Me chamo Pan, a Inteligência Artificial da Pandora Internet. Seja Bem-Vindo. Serei responsável por direcionar seu atendimento.", ts: "14:08" },
    { id: "m-3", papel: "ia", conteudo: "Vamos verificar se já é nosso cliente. Um instante.", ts: "14:09" },
    { id: "m-4", papel: "cliente", conteudo: "gostaria de falar com o responsável pelo setor financeiro, por favor", ts: "14:11" },
    { id: "m-5", papel: "sistema", conteudo: "Adriana transferiu o atendimento para Renato", ts: "14:12" },
    { id: "m-6", papel: "atendente", conteudo: "Olá, Me chamo Renato. Desejo em nome da Pandora Internet um excelente dia! Em que posso te ajudar?", ts: "14:13" },
    { id: "m-7", papel: "cliente", conteudo: "Boa tarde Renato, tudo bem?", ts: "14:14" },
    { id: "m-8", papel: "cliente", conteudo: "Aqui é o Rafael da SOLINTEL, estou entrando em contato pela 4ª fatura em aberto em nosso sistema de NOVEMBRO/2025 e ABRIL/2026. Poderíamos alinhar o pagamento dessas boletos o quanto antes?", ts: "14:14" },
  ],
  "c-002": [
    { id: "m-1", papel: "atendente", conteudo: "Bom dia João, segue a 2ª via do boleto vencido.", ts: "09:15" },
    { id: "m-2", papel: "cliente", conteudo: "Recebi, obrigado!", ts: "09:18" },
    { id: "m-3", papel: "cliente", conteudo: "Obrigado! Vou pagar hoje.", ts: "09:20" },
  ],
  "c-008": [
    { id: "m-1", papel: "sistema", conteudo: "Lead capturado · Meta Ads · Lançamento Plano TOP", ts: "agora" },
    { id: "m-2", papel: "cliente", conteudo: "Vi o anúncio do plano de 1G", ts: "agora" },
    { id: "m-3", papel: "ia", conteudo: "Olá! Me chamo Pan, a IA da Pandora Internet. Que bom que se interessou! O Plano TOP vem com Globoplay, Apple TV+ e mais 6 apps inclusos. Posso te passar o valor por R$199,90/mês com R$10 de desconto pagando em dia. Pra confirmar a cobertura, qual a sua rua e número?", ts: "agora" },
    { id: "m-4", papel: "cliente", conteudo: "Quanto custa?", ts: "agora" },
  ],
  "c-009": [
    { id: "m-1", papel: "sistema", conteudo: "Lead capturado · Google Ads · Plano 1G", ts: "há 4 min" },
    { id: "m-2", papel: "ia", conteudo: "Olá! Me chamo Pan da Pandora Internet. Vi que veio do anúncio do Plano 1G. Posso te ajudar com a cobertura ou já quer falar com um consultor?", ts: "há 4 min" },
    { id: "m-3", papel: "cliente", conteudo: "Quero falar com um humano sobre o plano de 1G", ts: "há 4 min" },
    { id: "m-4", papel: "sistema", conteudo: "Pan transferiu o atendimento para a fila comercial · aguardando atendente", ts: "há 4 min" },
  ],
};
