/**
 * Tipos unificados — usados por TODOS os adapters de provider.
 *
 * Cada adapter mapeia o formato cru do seu provedor (IXC, MK, Bling, Shopify,
 * etc) pra esses tipos comuns. UI e agentes IA consomem só esses tipos —
 * nunca o formato cru — pra ser provider-agnóstico.
 *
 * `raw` carrega os dados originais quando precisar de algo específico do
 * provedor que ainda não foi unificado.
 */

export type Vertical = "isp" | "erp" | "ecommerce" | "custom";

export interface ProviderInfo {
  /** Identificador estável do provider, ex: 'ixc', 'mk', 'bling'. */
  key: string;
  /** Nome amigável, ex: 'IXC Provedor', 'MK Solutions', 'Bling'. */
  nome: string;
  /** Vertical principal — orienta agrupamento na UI. */
  vertical: Vertical;
  /** Site oficial do provedor. */
  site?: string;
  /** Curto, 1-2 linhas pra explicar o que faz. */
  descricao?: string;
}

export interface ListParams {
  page?: number;
  pageSize?: number;
  query?: string;
  filters?: Record<string, string | number | boolean>;
}

export interface ListResponse<T> {
  registros: T[];
  total: number;
  page: number;
  hasMore: boolean;
}

export interface PingResult {
  ok: boolean;
  latencyMs: number;
  error?: string;
  detail?: Record<string, unknown>;
}

/** Cliente unificado — base, válido pra qualquer vertical. */
export interface ClienteUnificado {
  id: string;
  nome: string;
  cnpjOuCpf?: string;
  email?: string;
  telefone?: string;
  ativo: boolean;
  cidade?: string;
  uf?: string;
  raw: unknown;
}

/** Contrato/serviço — ISPs e SaaSes. */
export interface ContratoUnificado {
  id: string;
  clienteId: string;
  descricao: string;
  ativo: boolean;
  valorMensal?: number;
  inicioEm?: string;
  raw: unknown;
}

/** Boleto/título financeiro. */
export interface BoletoUnificado {
  id: string;
  clienteId: string;
  vencimento: string;
  valor: number;
  pago: boolean;
  raw: unknown;
}

/** Pedido — e-commerce. */
export interface PedidoUnificado {
  id: string;
  clienteId: string;
  total: number;
  status: string;
  criadoEm: string;
  raw: unknown;
}

/** Produto — e-commerce / ERP. */
export interface ProdutoUnificado {
  id: string;
  sku?: string;
  nome: string;
  precoBase?: number;
  estoque?: number;
  raw: unknown;
}

/** Chamado/atendimento técnico — ISPs e suporte. */
export interface ChamadoUnificado {
  id: string;
  clienteId: string;
  titulo: string;
  status: string;
  abertoEm: string;
  raw: unknown;
}
