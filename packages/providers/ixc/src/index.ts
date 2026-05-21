export {
  IXCClient,
  IXCError,
  createIXCClientFromEnv,
  type IXCClientOptions,
  type IXCListParams,
  type IXCListResponse,
  type IXCMode,
} from "./client";

export type {
  IXCCliente,
  IXCClienteContrato,
  IXCBoleto,
  IXCONU,
  IXCChamadoOS,
  IXCRadUsuario,
  IXCManutencao,
} from "./types";

export { IXCProviderAdapter } from "./adapter";
