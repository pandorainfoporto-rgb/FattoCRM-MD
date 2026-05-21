/**
 * IXC API Client — FattoCRM
 *
 * Cliente HTTP tipado pra API IXC Provedor (IXC Soft).
 * Auth Basic: <id_usuario>:<token_hash> em base64.
 * Header peculiar `ixcsoft` controla modo de busca:
 *   - 'listar'  → listagem com filtros
 *   - 'parcial' → busca fuzzy (LIKE)
 *
 * Sem webhook nativo — detecção de mudanças via polling
 * (cron 1-5min lendo deltas de cada entidade).
 *
 * Setup do token (lado IXC):
 *   1. Login no IXC
 *   2. Configurações → Usuários
 *   3. Editar usuário (ou criar dedicado, ex: "fattocrm_ia")
 *   4. Seção API → marcar "Permite acesso a API"
 *   5. Token aparece formato `id:hash` (ex: 59:abc123…)
 *   6. URL = domínio do IXC com `webservice/v1` no fim
 */

export type IXCMode = "listar" | "parcial";

export interface IXCClientOptions {
  baseUrl: string;
  userId: string;
  tokenHash: string;
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
}

export interface IXCListParams {
  qtype?: string;
  query?: string;
  oper?: "=" | "<" | ">" | "L";
  page?: number;
  rp?: number;
  sortname?: string;
  sortorder?: "asc" | "desc";
}

export interface IXCListResponse<T> {
  page: string;
  total: string;
  registros: T[];
}

export class IXCError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public body?: unknown,
  ) {
    super(`IXC API error ${status}: ${statusText}`);
    this.name = "IXCError";
  }
}

export class IXCClient {
  private readonly baseUrl: string;
  private readonly authHeader: string;
  private readonly fetchImpl: typeof fetch;
  private readonly timeoutMs: number;

  constructor(opts: IXCClientOptions) {
    this.baseUrl = opts.baseUrl.replace(/\/$/, "");
    const credentials = `${opts.userId}:${opts.tokenHash}`;
    this.authHeader = `Basic ${Buffer.from(credentials, "utf8").toString("base64")}`;
    this.fetchImpl = opts.fetchImpl ?? fetch;
    this.timeoutMs = opts.timeoutMs ?? 15_000;
  }

  /**
   * Lista registros de uma entidade IXC.
   * Ex: client.list<IXCCliente>('cliente', { rp: 50 })
   */
  async list<T>(
    entity: string,
    params: IXCListParams = {},
    mode: IXCMode = "listar",
  ): Promise<IXCListResponse<T>> {
    const body = {
      qtype: params.qtype ?? `${entity}.id`,
      query: params.query ?? "",
      oper: params.oper ?? "=",
      page: String(params.page ?? 1),
      rp: String(params.rp ?? 20),
      sortname: params.sortname ?? `${entity}.id`,
      sortorder: params.sortorder ?? "asc",
    };

    return this.request<IXCListResponse<T>>("POST", `/${entity}`, body, mode);
  }

  /**
   * Busca por ID (helper).
   */
  async findById<T>(entity: string, id: string | number): Promise<T | null> {
    const res = await this.list<T>(entity, {
      qtype: `${entity}.id`,
      query: String(id),
      oper: "=",
      rp: 1,
    });
    return res.registros[0] ?? null;
  }

  /**
   * Pagina toda a entidade — útil pro "Atualizar base".
   * Cuidado com volume — IXC pode ter milhares de registros.
   * pageSize default 200, hardstop em 50 páginas (10k regs) por segurança.
   */
  async listAll<T>(
    entity: string,
    options: { pageSize?: number; maxPages?: number; query?: IXCListParams } = {},
  ): Promise<T[]> {
    const pageSize = options.pageSize ?? 200;
    const maxPages = options.maxPages ?? 50;
    const all: T[] = [];

    for (let page = 1; page <= maxPages; page++) {
      const res = await this.list<T>(entity, {
        ...options.query,
        page,
        rp: pageSize,
      });
      all.push(...res.registros);
      const total = Number(res.total) || 0;
      if (all.length >= total || res.registros.length < pageSize) break;
    }

    return all;
  }

  /** GET cru. */
  async get<T>(path: string): Promise<T> {
    return this.request<T>("GET", path);
  }

  /** POST cru. */
  async post<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>("POST", path, body);
  }

  /** Health check rápido — pega 1 cliente. Usado pelo "Testar conexão". */
  async ping(): Promise<{ ok: true; total: number } | { ok: false; error: string }> {
    try {
      const res = await this.list<unknown>("cliente", { rp: 1 });
      return { ok: true, total: Number(res.total) || 0 };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return { ok: false, error: msg };
    }
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
    mode?: IXCMode,
  ): Promise<T> {
    const url = `${this.baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), this.timeoutMs);

    try {
      const headers: Record<string, string> = {
        Authorization: this.authHeader,
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      if (mode) headers["ixcsoft"] = mode;

      const res = await this.fetchImpl(url, {
        method,
        headers,
        body: body !== undefined ? JSON.stringify(body) : undefined,
        signal: ctrl.signal,
      });

      const text = await res.text();
      let parsed: unknown;
      try {
        parsed = text ? JSON.parse(text) : null;
      } catch {
        parsed = text;
      }

      if (!res.ok) {
        throw new IXCError(res.status, res.statusText, parsed);
      }
      return parsed as T;
    } finally {
      clearTimeout(t);
    }
  }
}

/**
 * Cria cliente a partir de variáveis de ambiente.
 * Espera IXC_BASE_URL, IXC_USER_ID, IXC_TOKEN_HASH em process.env.
 */
export function createIXCClientFromEnv(): IXCClient {
  const baseUrl = process.env.IXC_BASE_URL;
  const userId = process.env.IXC_USER_ID;
  const tokenHash = process.env.IXC_TOKEN_HASH;

  if (!baseUrl || !userId || !tokenHash) {
    throw new Error(
      "IXC env vars ausentes. Defina IXC_BASE_URL, IXC_USER_ID, IXC_TOKEN_HASH em .env.local",
    );
  }

  return new IXCClient({ baseUrl, userId, tokenHash });
}
