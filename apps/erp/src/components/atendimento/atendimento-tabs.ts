import type { LucideIcon } from "lucide-react";
import {
  Home,
  BarChart3,
  Users,
  Headphones,
  Bot,
  Archive,
  MessagesSquare,
  Hash,
  PhoneCall,
  HelpCircle,
} from "lucide-react";

export type AtendimentoTab =
  | "inicial"
  | "estatisticas"
  | "fila"
  | "em_atendimento"
  | "ia"
  | "arquivados"
  | "conversa_interna"
  | "grupo_interno"
  | "telefonia_ia"
  | "faq";

export interface TabAtendimento {
  key: AtendimentoTab;
  label: string;
  icon: LucideIcon;
  count?: number;
}

export const ATENDIMENTO_TABS: TabAtendimento[] = [
  { key: "inicial", label: "Área inicial", icon: Home },
  { key: "estatisticas", label: "Estatísticas", icon: BarChart3 },
  { key: "fila", label: "Na fila", icon: Users, count: 3 },
  { key: "em_atendimento", label: "Em atendimento", icon: Headphones, count: 4 },
  { key: "ia", label: "Atendido pela IA", icon: Bot, count: 2 },
  { key: "arquivados", label: "Arquivados", icon: Archive },
  { key: "conversa_interna", label: "Conversa interna", icon: MessagesSquare },
  { key: "grupo_interno", label: "Grupo interno", icon: Hash },
  { key: "telefonia_ia", label: "Telefonia IA", icon: PhoneCall },
  { key: "faq", label: "FAQ", icon: HelpCircle },
];
