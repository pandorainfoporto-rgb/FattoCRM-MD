import type {
  ClienteUnificado,
  ListParams,
  ListResponse,
  PingResult,
  ProviderAdapter,
  ProviderInfo,
} from "@md/providers-core";
import { IXCClient, type IXCClientOptions } from "./client";
import type { IXCCliente } from "./types";

const INFO: ProviderInfo = {
  key: "ixc",
  nome: "IXC Provedor",
  vertical: "isp",
  site: "https://ixcsoft.com.br",
  descricao: "Sistema de gestão para provedores de internet (clientes, contratos, financeiro, OSS).",
};

export class IXCProviderAdapter implements ProviderAdapter {
  readonly info = INFO;
  private readonly client: IXCClient;

  constructor(opts: IXCClientOptions) {
    this.client = new IXCClient(opts);
  }

  async ping(): Promise<PingResult> {
    const t0 = Date.now();
    const r = await this.client.ping();
    const latencyMs = Date.now() - t0;
    if (r.ok) return { ok: true, latencyMs, detail: { totalClientes: r.total } };
    return { ok: false, latencyMs, error: r.error };
  }

  async listarClientes(params: ListParams = {}): Promise<ListResponse<ClienteUnificado>> {
    const page = params.page ?? 1;
    const pageSize = params.pageSize ?? 50;
    const res = await this.client.list<IXCCliente>("cliente", {
      page,
      rp: pageSize,
      query: params.query,
    });

    const registros: ClienteUnificado[] = res.registros.map((c) => ({
      id: String(c.id),
      nome: c.razao,
      cnpjOuCpf: c.cnpj_cpf,
      email: c.email,
      telefone: c.telefone_celular ?? c.telefone_secundario,
      ativo: c.ativo === "S",
      cidade: c.cidade,
      uf: c.uf,
      raw: c,
    }));

    const total = Number(res.total) || 0;
    return {
      registros,
      total,
      page,
      hasMore: page * pageSize < total,
    };
  }
}
