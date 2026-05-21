import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  Headphones,
  DollarSign,
  Bot,
  Activity,
} from "lucide-react";

/**
 * Lista de dashboards disponíveis no DashboardSelector do header.
 *
 * Hoje é hardcoded como esqueleto — vai ser substituída por carga dinâmica
 * (de uma tabela `dashboards` no Supabase, como no Fatto V2) quando a base
 * de dados for plugada. A interface (slug, nome, categoria, icon, href)
 * espelha o schema Fatto V2 pra migração ser trivial.
 */

export interface DashboardItem {
  slug: string;
  nome: string;
  categoria: string;
  icon: LucideIcon;
  href: string;
}

export const DASHBOARDS: DashboardItem[] = [
  {
    slug: "visao-geral",
    nome: "Visão Geral",
    categoria: "Executivo",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    slug: "atendimento",
    nome: "Atendimento",
    categoria: "Operacional",
    icon: Headphones,
    href: "/dashboard/atendimento",
  },
  {
    slug: "comercial",
    nome: "Comercial",
    categoria: "Vendas",
    icon: TrendingUp,
    href: "/dashboard/comercial",
  },
  {
    slug: "contatos",
    nome: "Contatos & Leads",
    categoria: "Vendas",
    icon: Users,
    href: "/dashboard/contatos",
  },
  {
    slug: "financeiro",
    nome: "Financeiro",
    categoria: "Backoffice",
    icon: DollarSign,
    href: "/dashboard/financeiro",
  },
  {
    slug: "agentes-ia",
    nome: "Agentes IA",
    categoria: "IA",
    icon: Bot,
    href: "/dashboard/agentes",
  },
  {
    slug: "atividade",
    nome: "Atividade do Sistema",
    categoria: "Operacional",
    icon: Activity,
    href: "/dashboard/atividade",
  },
];
