import type {
  BoletoUnificado,
  ChamadoUnificado,
  ClienteUnificado,
  ContratoUnificado,
  ListParams,
  ListResponse,
  PedidoUnificado,
  PingResult,
  ProdutoUnificado,
  ProviderInfo,
} from "./types";

/**
 * ProviderAdapter — contrato comum a todos os providers do FattoCRM.
 *
 * Cada provider implementa só o que seu domínio cobre. ISPs implementam
 * Cliente/Contrato/Boleto/Chamado; e-commerce implementa Cliente/Pedido/Produto;
 * ERPs implementam Cliente/Produto/Boleto.
 *
 * UI/agentes IA inspecionam quais métodos existem e adaptam o que mostram.
 */
export interface ProviderAdapter {
  readonly info: ProviderInfo;

  /** Health check — todos os providers implementam. */
  ping(): Promise<PingResult>;

  // ===== Comum a quase todos =====
  listarClientes?(params?: ListParams): Promise<ListResponse<ClienteUnificado>>;

  // ===== ISP / SaaS recorrente =====
  listarContratos?(params?: ListParams): Promise<ListResponse<ContratoUnificado>>;
  listarBoletos?(params?: ListParams): Promise<ListResponse<BoletoUnificado>>;
  listarChamados?(params?: ListParams): Promise<ListResponse<ChamadoUnificado>>;

  // ===== E-commerce =====
  listarPedidos?(params?: ListParams): Promise<ListResponse<PedidoUnificado>>;

  // ===== ERP / inventário / e-commerce =====
  listarProdutos?(params?: ListParams): Promise<ListResponse<ProdutoUnificado>>;
}

/**
 * Helper pra UI — lista os "recursos" disponíveis num adapter,
 * pra construir telas dinâmicas.
 */
export function recursosDoAdapter(a: ProviderAdapter): string[] {
  const recursos: string[] = [];
  if (a.listarClientes) recursos.push("clientes");
  if (a.listarContratos) recursos.push("contratos");
  if (a.listarBoletos) recursos.push("boletos");
  if (a.listarChamados) recursos.push("chamados");
  if (a.listarPedidos) recursos.push("pedidos");
  if (a.listarProdutos) recursos.push("produtos");
  return recursos;
}
