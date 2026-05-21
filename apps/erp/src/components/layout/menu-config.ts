export type TopNavItem = {
  label: string;
  href: string;
};

export const TOP_NAV: TopNavItem[] = [
  { label: "Atendimento", href: "/atendimento/inbox" },
  { label: "Contatos", href: "/contatos/clientes" },
  { label: "Agentes IA", href: "/ferramentas/ia/agentes" },
  { label: "Fluxos", href: "/ferramentas/ia/fluxos" },
  { label: "Knowledge Base", href: "/ferramentas/ia/kb" },
  { label: "Configurações", href: "/configuracoes" },
];
