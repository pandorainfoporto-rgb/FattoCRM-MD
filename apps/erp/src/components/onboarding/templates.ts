import type { LucideIcon } from "lucide-react";
import {
  Wifi,
  Sofa,
  ShoppingBag,
  Scale,
  Stethoscope,
  Sparkles,
} from "lucide-react";

/**
 * Templates de configuração inicial por vertical.
 *
 * Cada vertical é um "preset" — quando o user escolhe no wizard, todos
 * os outros steps já vêm com defaults sensatos pro setor.
 *
 * Quando o backend entrar, esses templates viram seeds que rodam ao criar
 * uma nova empresa (tenants.empresa_config).
 */

export type VerticalKey =
  | "isp"
  | "moveis_premium"
  | "ecommerce"
  | "advocacia"
  | "telemed"
  | "outro";

export interface VerticalTemplate {
  key: VerticalKey;
  nome: string;
  icon: LucideIcon;
  cor: string;
  descricao: string;
  /** Softwares de gestão relevantes pro vertical (keys correspondem aos packages/providers/*) */
  softwares: Array<{ key: string; nome: string; status: "disponivel" | "em-breve" }>;
  /** Canais que o vertical normalmente usa */
  canaisSugeridos: string[];
  /** Departamentos default — viram seeds da tabela equipes */
  departamentos: string[];
  /** Etiquetas pré-criadas */
  etiquetas: string[];
  /** Motivos de encerramento */
  motivos: string[];
  /** Mensagens rápidas pré-criadas */
  mensagens: Array<{ atalho: string; texto: string }>;
}

export const TEMPLATES: VerticalTemplate[] = [
  {
    key: "isp",
    nome: "Provedor de Internet (ISP)",
    icon: Wifi,
    cor: "text-[var(--color-azure-500)] bg-[var(--color-azure-500)]/10 border-[var(--color-azure-500)]/30",
    descricao: "Operação de fibra/banda larga. Suporte 24/7, vendas ativas, cobrança recorrente.",
    softwares: [
      { key: "ixc", nome: "IXC Provedor", status: "disponivel" },
      { key: "mk", nome: "MK Solutions", status: "em-breve" },
      { key: "voalle", nome: "Voalle", status: "em-breve" },
      { key: "sgp", nome: "SGP", status: "em-breve" },
      { key: "hubsoft", nome: "Hubsoft", status: "em-breve" },
    ],
    canaisSugeridos: ["whatsapp", "voz", "email"],
    departamentos: ["Comercial", "Suporte Técnico", "Financeiro", "Cobrança", "Pós-venda"],
    etiquetas: ["Plano novo", "Suporte técnico", "Cobrança", "Cancelamento", "Mudança de plano"],
    motivos: [
      "Lentidão / sem conexão",
      "Negociação de plano",
      "Mudança de endereço",
      "Cancelamento",
      "2ª via de boleto",
    ],
    mensagens: [
      { atalho: "/oi", texto: "Olá! Aqui é o atendimento do provedor. Como posso ajudar?" },
      { atalho: "/aguarde", texto: "Vou verificar sua conexão, um momento." },
      { atalho: "/tecnico", texto: "Já estou abrindo um chamado técnico. Em até 4h um técnico entra em contato." },
    ],
  },
  {
    key: "moveis_premium",
    nome: "Móveis Premium / Varejo Alto Padrão",
    icon: Sofa,
    cor: "text-amber-600 bg-amber-500/10 border-amber-500/30",
    descricao: "Showroom, projetos sob medida, pós-venda longo. Cliente exigente, ticket alto.",
    softwares: [
      { key: "bling", nome: "Bling", status: "em-breve" },
      { key: "tiny", nome: "Tiny ERP", status: "em-breve" },
      { key: "omie", nome: "Omie", status: "em-breve" },
    ],
    canaisSugeridos: ["whatsapp", "instagram", "email"],
    departamentos: ["Atendimento", "Vendas Showroom", "Projeto", "Pós-venda", "Garantia", "Logística"],
    etiquetas: ["Orçamento", "Visita técnica", "Em produção", "Pós-venda", "Garantia", "Reclamação"],
    motivos: [
      "Pedido de informações",
      "Visita ao showroom",
      "Status do pedido",
      "Defeito / garantia",
      "Devolução",
      "Logística / entrega",
    ],
    mensagens: [
      { atalho: "/oi", texto: "Olá! Obrigada pelo contato. Em que posso ajudar?" },
      { atalho: "/visita", texto: "Posso agendar uma visita ao nosso showroom? Trabalhamos de seg a sáb, 9h às 18h." },
      { atalho: "/pedido", texto: "Vou consultar o status do seu pedido. Pode me confirmar o número?" },
    ],
  },
  {
    key: "ecommerce",
    nome: "E-commerce",
    icon: ShoppingBag,
    cor: "text-fuchsia-500 bg-fuchsia-500/10 border-fuchsia-500/30",
    descricao: "Volume alto de pedidos, pré e pós-venda, trocas e devoluções. SLA curto.",
    softwares: [
      { key: "shopify", nome: "Shopify", status: "em-breve" },
      { key: "vtex", nome: "VTEX", status: "em-breve" },
      { key: "nuvemshop", nome: "Nuvemshop", status: "em-breve" },
      { key: "bling", nome: "Bling", status: "em-breve" },
      { key: "tiny", nome: "Tiny ERP", status: "em-breve" },
    ],
    canaisSugeridos: ["whatsapp", "instagram", "email"],
    departamentos: ["Atendimento", "Trocas e Devoluções", "Logística", "Cobrança"],
    etiquetas: ["Pré-venda", "Pós-venda", "Troca", "Devolução", "Cobrança", "Reclamação"],
    motivos: [
      "Dúvida sobre produto",
      "Status do pedido",
      "Trocar / devolver",
      "Cobrança / cartão",
      "Reclamação",
    ],
    mensagens: [
      { atalho: "/oi", texto: "Olá! Sua loja agradece o contato. Como posso ajudar?" },
      { atalho: "/rastreio", texto: "Posso rastrear seu pedido. Me passa o número que começa com #?" },
      { atalho: "/troca", texto: "Pra troca/devolução em até 7 dias após o recebimento, sem custo. Posso te ajudar?" },
    ],
  },
  {
    key: "advocacia",
    nome: "Escritório de Advocacia",
    icon: Scale,
    cor: "text-violet-500 bg-violet-500/10 border-violet-500/30",
    descricao: "Múltiplas áreas (cível, trabalhista, tributário). Atendimento consultivo. Confidencialidade.",
    softwares: [
      { key: "projuris", nome: "ProJuris", status: "em-breve" },
      { key: "astrea", nome: "Astrea", status: "em-breve" },
      { key: "cppro", nome: "CP-Pro", status: "em-breve" },
    ],
    canaisSugeridos: ["whatsapp", "email"],
    departamentos: ["Recepção", "Cível", "Trabalhista", "Tributário"],
    etiquetas: ["Novo cliente", "Audiência", "Cobrança honorários", "Diligência", "Pessoal"],
    motivos: [
      "Consulta inicial",
      "Andamento de processo",
      "Documentação",
      "Cobrança / honorários",
    ],
    mensagens: [
      { atalho: "/oi", texto: "Olá. Sou da recepção do escritório. Como posso ajudar?" },
      { atalho: "/agendar", texto: "Posso agendar uma consulta com o(a) advogado(a) responsável. Qual sua disponibilidade?" },
    ],
  },
  {
    key: "telemed",
    nome: "Telemedicina / Clínica",
    icon: Stethoscope,
    cor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
    descricao: "Triagem, agendamento, prescrição digital. Sigilo médico, LGPD reforçada.",
    softwares: [
      { key: "conexa", nome: "Conexa Saúde", status: "em-breve" },
      { key: "memed", nome: "Memed", status: "em-breve" },
    ],
    canaisSugeridos: ["whatsapp", "email", "voz"],
    departamentos: ["Triagem", "Agendamento", "Suporte Médico"],
    etiquetas: ["Agendamento", "Receita", "Exames", "Pós-consulta", "Urgente"],
    motivos: [
      "Marcar consulta",
      "2ª via de receita",
      "Resultado de exame",
      "Cancelamento de consulta",
    ],
    mensagens: [
      { atalho: "/oi", texto: "Olá! Aqui é da clínica. Como posso ajudar você hoje?" },
      { atalho: "/agendar", texto: "Vamos agendar sua consulta. Qual a especialidade desejada?" },
      { atalho: "/receita", texto: "Pra 2ª via da receita, preciso confirmar seu CPF e data de nascimento." },
    ],
  },
  {
    key: "outro",
    nome: "Outro / Personalizado",
    icon: Sparkles,
    cor: "text-foreground/65 bg-foreground/[0.05] border-foreground/15",
    descricao: "Vertical não listado. Você preenche tudo manualmente nas configurações.",
    softwares: [],
    canaisSugeridos: ["whatsapp", "email"],
    departamentos: ["Atendimento"],
    etiquetas: ["Geral"],
    motivos: ["Dúvida", "Reclamação", "Outros"],
    mensagens: [{ atalho: "/oi", texto: "Olá! Como posso ajudar?" }],
  },
];

export const CANAIS_DISPONIVEIS = [
  { key: "whatsapp", label: "WhatsApp", desc: "Texto + mídia (Meta Cloud API)" },
  { key: "whatsapp-call", label: "WhatsApp Calling", desc: "Voz e vídeo via WA Business" },
  { key: "instagram", label: "Instagram Direct", desc: "DMs no Instagram Business" },
  { key: "messenger", label: "Facebook Messenger", desc: "Mensagens da página FB" },
  { key: "email", label: "E-mail", desc: "SMTP / IMAP corporativo" },
  { key: "voz", label: "Voz (PSTN)", desc: "Telefone fixo via SIP trunk" },
  { key: "telegram", label: "Telegram", desc: "Bot do Telegram (bot.father)" },
  { key: "webchat", label: "Web Chat", desc: "Widget no seu site" },
];

export function findTemplate(key: VerticalKey): VerticalTemplate {
  return TEMPLATES.find((t) => t.key === key) ?? TEMPLATES[TEMPLATES.length - 1]!;
}
