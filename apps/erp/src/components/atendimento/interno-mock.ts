/**
 * Mock data pra conversa interna (1-on-1) e grupo interno do CRM.
 *
 * Quando schema entrar:
 *   - usuarios_online_realtime via Supabase Realtime
 *   - tabela `mensagens_internas` (1-on-1)
 *   - tabela `grupos_internos` + `grupo_membros` + `mensagens_grupo`
 *   - cada mensagem fica auditável e contém menção (@usuário) + reação
 */

export type StatusOnline = "online" | "ocupado" | "ausente" | "offline";

export interface UsuarioInterno {
  id: string;
  nome: string;
  iniciais: string;
  cargo: string;
  setor: string;
  status: StatusOnline;
  ultimaInteracao?: string;
  naoLidas?: number;
  ultimaMensagem?: string;
}

export interface GrupoInterno {
  id: string;
  nome: string;
  descricao: string;
  emoji?: string;
  membros: number;
  ultimaInteracao?: string;
  naoLidas?: number;
  ultimaMensagem?: { texto: string; autor: string };
  membrosOnline?: number;
}

export interface MensagemInterna {
  id: string;
  autor: { nome: string; iniciais: string; setor: string };
  conteudo: string;
  ts: string;
  isMine?: boolean;
  reacoes?: { emoji: string; count: number }[];
}

export const STATUS_ONLINE_INFO: Record<StatusOnline, { label: string; cor: string; bg: string }> = {
  online:  { label: "Online",  cor: "bg-emerald-500", bg: "bg-emerald-500/10" },
  ocupado: { label: "Ocupado", cor: "bg-amber-500",   bg: "bg-amber-500/10" },
  ausente: { label: "Ausente", cor: "bg-slate-400",   bg: "bg-slate-500/10" },
  offline: { label: "Offline", cor: "bg-foreground/30", bg: "bg-foreground/[0.05]" },
};

export const USUARIOS_INTERNOS: UsuarioInterno[] = [
  {
    id: "u-001", nome: "Cláudia Lima", iniciais: "CL", cargo: "Atendente Sênior", setor: "Suporte",
    status: "online", ultimaInteracao: "agora", naoLidas: 1,
    ultimaMensagem: "Pode me ajudar com o caso 12345?",
  },
  {
    id: "u-002", nome: "Bruno Mello", iniciais: "BM", cargo: "Closer Comercial", setor: "Comercial",
    status: "online", ultimaInteracao: "5 min",
    ultimaMensagem: "Fechei o cliente! Mais um pra carteira.",
  },
  {
    id: "u-003", nome: "Marina Silva", iniciais: "MS", cargo: "Gestora de CS", setor: "Suporte",
    status: "ocupado", ultimaInteracao: "12 min",
    ultimaMensagem: "Tô em call. Te ligo já já.",
  },
  {
    id: "u-004", nome: "André Costa", iniciais: "AC", cargo: "Analista Financeiro", setor: "Financeiro",
    status: "online", ultimaInteracao: "30 min",
    ultimaMensagem: "DRE de abril fechado.",
  },
  {
    id: "u-005", nome: "Patrícia Souza", iniciais: "PS", cargo: "Marketing", setor: "Marketing",
    status: "ausente", ultimaInteracao: "2 h",
    ultimaMensagem: "Saí pra almoçar, volto 14h",
  },
  {
    id: "u-006", nome: "Lucas Reis", iniciais: "LR", cargo: "Tech Lead", setor: "Tecnologia",
    status: "online", ultimaInteracao: "ontem",
    ultimaMensagem: "Deploy v2.1 ok",
  },
  {
    id: "u-007", nome: "Fernanda Albuquerque", iniciais: "FA", cargo: "RH", setor: "Pessoas",
    status: "offline", ultimaInteracao: "ontem",
  },
  {
    id: "u-008", nome: "Gustavo Pinto", iniciais: "GP", cargo: "DevOps", setor: "Tecnologia",
    status: "online", ultimaInteracao: "1 h",
  },
];

export const GRUPOS_INTERNOS: GrupoInterno[] = [
  {
    id: "g-001", nome: "Geral", descricao: "Canal aberto pra toda a empresa", emoji: "🏢",
    membros: 24, membrosOnline: 12, ultimaInteracao: "agora", naoLidas: 3,
    ultimaMensagem: { texto: "Lançamento do plano novo na sexta!", autor: "Patrícia Souza" },
  },
  {
    id: "g-002", nome: "Comercial · Plantão", descricao: "Coordenação do time comercial em tempo real", emoji: "💼",
    membros: 8, membrosOnline: 5, ultimaInteracao: "5 min", naoLidas: 0,
    ultimaMensagem: { texto: "Lead da Carla foi pra mim, valeu!", autor: "Bruno Mello" },
  },
  {
    id: "g-003", nome: "Suporte · N1/N2", descricao: "Coordenação técnica entre níveis de suporte", emoji: "🛟",
    membros: 6, membrosOnline: 4, ultimaInteracao: "12 min", naoLidas: 2,
    ultimaMensagem: { texto: "OS 3421 escalada — sinal baixo no bairro X", autor: "Cláudia Lima" },
  },
  {
    id: "g-004", nome: "Liderança", descricao: "Managers + diretoria", emoji: "🎯",
    membros: 5, membrosOnline: 2, ultimaInteracao: "1 h", naoLidas: 0,
    ultimaMensagem: { texto: "Reunião segunda 9h, ok pra todos?", autor: "Renato" },
  },
  {
    id: "g-005", nome: "Tecnologia", descricao: "Devs, QA, DevOps", emoji: "⚙️",
    membros: 7, membrosOnline: 3, ultimaInteracao: "2 h",
    ultimaMensagem: { texto: "Sub PR pro fix do bug do cache", autor: "Lucas Reis" },
  },
];

export const MENSAGENS_INTERNAS: Record<string, MensagemInterna[]> = {
  "u-001": [
    { id: "im-1", autor: { nome: "Cláudia Lima", iniciais: "CL", setor: "Suporte" }, conteudo: "Oi! Tô com um cliente reclamando de cobrança duplicada", ts: "10:42" },
    { id: "im-2", autor: { nome: "Cláudia Lima", iniciais: "CL", setor: "Suporte" }, conteudo: "Pode me ajudar com o caso 12345?", ts: "10:43" },
    { id: "im-3", autor: { nome: "Você", iniciais: "VC", setor: "Suporte" }, conteudo: "Olha aí, vou ver agora.", ts: "10:44", isMine: true },
  ],
  "u-002": [
    { id: "im-1", autor: { nome: "Bruno Mello", iniciais: "BM", setor: "Comercial" }, conteudo: "Fechei o cliente! Mais um pra carteira.", ts: "09:55", reacoes: [{ emoji: "🎉", count: 3 }, { emoji: "🔥", count: 1 }] },
  ],
  "g-001": [
    { id: "gm-1", autor: { nome: "Patrícia Souza", iniciais: "PS", setor: "Marketing" }, conteudo: "Lançamento do plano novo na sexta!", ts: "11:02" },
    { id: "gm-2", autor: { nome: "Bruno Mello", iniciais: "BM", setor: "Comercial" }, conteudo: "Top demais, posso já começar a oferecer pra base?", ts: "11:03" },
    { id: "gm-3", autor: { nome: "Patrícia Souza", iniciais: "PS", setor: "Marketing" }, conteudo: "Espera o briefing oficial que sai amanhã 🙏", ts: "11:04", reacoes: [{ emoji: "👍", count: 2 }] },
  ],
  "g-002": [
    { id: "gm-1", autor: { nome: "Bruno Mello", iniciais: "BM", setor: "Comercial" }, conteudo: "Lead da Carla foi pra mim, valeu!", ts: "10:38", reacoes: [{ emoji: "🤝", count: 2 }] },
  ],
  "g-003": [
    { id: "gm-1", autor: { nome: "Cláudia Lima", iniciais: "CL", setor: "Suporte" }, conteudo: "OS 3421 escalada — sinal baixo no bairro X", ts: "10:31" },
    { id: "gm-2", autor: { nome: "Iara (IA N2)", iniciais: "IA", setor: "Suporte IA" }, conteudo: "Confirmado. 3 ONUs offline no mesmo POP. Sugiro abrir manutenção preventiva.", ts: "10:32" },
  ],
};
