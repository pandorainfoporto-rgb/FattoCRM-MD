import { NextResponse } from "next/server";
import { IXCClient, type IXCCliente } from "@md/providers-ixc";

export const dynamic = "force-dynamic";
export const maxDuration = 60; // sync pode demorar — Vercel hobby = 10s, pro = 60s

/**
 * POST /api/ixc/sync
 * Body: { baseUrl?, userId?, tokenHash?, pageSize?, maxPages? }
 *
 * Pagina /cliente do IXC e retorna a lista. NÃO escreve no banco ainda
 * (Supabase não plugado) — devolve os dados pro front-end exibir/persistir
 * em memória local.
 *
 * Quando schema entrar:
 *   - upsert em public.clientes_ixc batch de 200
 *   - registra ag_polling_ixc com timestamp + total + status
 *   - dispara realtime pra atualizar a UI sem refresh
 */
export async function POST(req: Request) {
  const t0 = Date.now();
  const body = await req.json().catch(() => ({}));

  const baseUrl = body?.baseUrl ?? process.env.IXC_BASE_URL;
  const userId = body?.userId ?? process.env.IXC_USER_ID;
  const tokenHash = body?.tokenHash ?? process.env.IXC_TOKEN_HASH;
  const pageSize: number = Number(body?.pageSize ?? 200);
  const maxPages: number = Number(body?.maxPages ?? 50);

  if (!baseUrl || !userId || !tokenHash) {
    return NextResponse.json(
      { ok: false, error: "Credenciais IXC ausentes." },
      { status: 400 },
    );
  }

  try {
    const client = new IXCClient({
      baseUrl: String(baseUrl),
      userId: String(userId),
      tokenHash: String(tokenHash),
      timeoutMs: 30_000,
    });

    const clientes = await client.listAll<IXCCliente>("cliente", { pageSize, maxPages });
    const latencyMs = Date.now() - t0;

    return NextResponse.json({
      ok: true,
      total: clientes.length,
      latencyMs,
      clientes,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
