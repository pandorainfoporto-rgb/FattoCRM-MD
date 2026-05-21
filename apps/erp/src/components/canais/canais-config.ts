import type { LucideIcon } from "lucide-react";
import {
  MessageCircle,
  Instagram,
  Facebook,
  Mail,
  MessageSquare,
  Send,
  Phone,
  PhoneCall,
  Globe,
} from "lucide-react";

/**
 * Catálogo de canais de entrada suportados pelo CRM.
 *
 * Cada canal vira um card na página `/ferramentas/integracoes/canais`.
 * Hoje é catálogo estático — quando backend entrar, cada canal terá
 * múltiplas instâncias (uma WA Business Cloud por número, várias contas
 * Instagram/Facebook, etc), e o `status` virá do banco em vez de hardcoded.
 */

export type CanalStatus = "conectado" | "desconectado" | "configurando" | "erro";

export interface Canal {
  id: string;
  nome: string;
  descricao: string;
  icon: LucideIcon;
  cor: string;          // tailwind text color class
  bgClass: string;      // tailwind bg class do tile do ícone
  status: CanalStatus;
  detalhe?: string;     // ex: "+55 46 2021-0152" ou "@pandora.internet"
  metricas?: { mensagens24h?: number; sessoesAtivas?: number };
  comingSoon?: boolean;
}

export const CANAIS: Canal[] = [
  {
    id: "wa-cloud",
    nome: "WhatsApp Business (Cloud API)",
    descricao: "Oficial Meta. Recomendado pra volume e templates HSM.",
    icon: MessageCircle,
    cor: "text-emerald-500",
    bgClass: "bg-emerald-500/10",
    status: "desconectado",
  },
  {
    id: "wa-business",
    nome: "WhatsApp Business (não-oficial)",
    descricao: "Conexão via QR Code. Bom pra começar; sujeito a banimento da Meta.",
    icon: MessageCircle,
    cor: "text-emerald-600",
    bgClass: "bg-emerald-500/10",
    status: "desconectado",
  },
  {
    id: "instagram",
    nome: "Instagram Direct",
    descricao: "Mensagens diretas e respostas em stories.",
    icon: Instagram,
    cor: "text-pink-500",
    bgClass: "bg-pink-500/10",
    status: "desconectado",
  },
  {
    id: "facebook",
    nome: "Facebook Messenger",
    descricao: "Mensagens da página oficial no Facebook.",
    icon: Facebook,
    cor: "text-blue-500",
    bgClass: "bg-blue-500/10",
    status: "desconectado",
  },
  {
    id: "email",
    nome: "E-mail",
    descricao: "Caixa de entrada IMAP/SMTP. Suporta múltiplas contas.",
    icon: Mail,
    cor: "text-sky-500",
    bgClass: "bg-sky-500/10",
    status: "desconectado",
  },
  {
    id: "webchat",
    nome: "Chat no Site (Webchat)",
    descricao: "Widget pra LP / site. Captura visitante anônimo + identifica.",
    icon: Globe,
    cor: "text-indigo-500",
    bgClass: "bg-indigo-500/10",
    status: "desconectado",
  },
  {
    id: "telegram",
    nome: "Telegram",
    descricao: "Bot oficial via BotFather. Comum em B2B e suporte técnico.",
    icon: Send,
    cor: "text-cyan-500",
    bgClass: "bg-cyan-500/10",
    status: "desconectado",
  },
  {
    id: "sms",
    nome: "SMS",
    descricao: "Disparo e recebimento via gateway (Twilio / Zenvia / TotalVoice).",
    icon: MessageSquare,
    cor: "text-amber-500",
    bgClass: "bg-amber-500/10",
    status: "desconectado",
  },
  {
    id: "voice",
    nome: "Voz / Telefonia",
    descricao: "PABX próprio (Asterisk) + tronco SIP. IA atende ligação 24/7.",
    icon: PhoneCall,
    cor: "text-rose-500",
    bgClass: "bg-rose-500/10",
    status: "desconectado",
  },
];

export const STATUS_COR: Record<CanalStatus, { dot: string; label: string; ring: string }> = {
  conectado: { dot: "bg-emerald-500", label: "Conectado", ring: "ring-emerald-500/30" },
  desconectado: { dot: "bg-foreground/30", label: "Desconectado", ring: "ring-foreground/10" },
  configurando: { dot: "bg-amber-500 animate-pulse", label: "Configurando", ring: "ring-amber-500/30" },
  erro: { dot: "bg-rose-500", label: "Com erro", ring: "ring-rose-500/30" },
};
