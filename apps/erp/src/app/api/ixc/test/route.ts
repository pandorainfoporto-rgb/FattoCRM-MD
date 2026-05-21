import { NextResponse } from "next/server";
import { IXCClient } from "@md/providers-ixc";

export const dynamic = "force-dynamic";

/**
 * POST /api/ixc/test
 * Body: { baseUrl, userId, tokenHash } — opcional. Se não vier, usa env vars.
 *
 * Faz um ping no IXC (lista 1 cliente) pra validar credenciais.
 * Retorna { ok, total, latencyMs, error? }
 */
export async function POST(req: Request) {
  const t0 = Date.now();
  const body = await req.json().catch(() => ({}));

  const baseUrl = body?.baseUrl ?? process.env.IXC_BASE_URL;
  const userId = body?.userId ?? process.env.IXC_USER_ID;
  const tokenHash = body?.tokenHash ?? process.env.IXC_TOKEN_HASH;

  if (!baseUrl || !userId || !tokenHash) {
    return NextResponse.json(
      {
        ok: false,
        error: "Credenciais IXC ausentes. Preencha URL, user_id e token_hash.",
      },
      { status: 400 },
    );
  }

  try {
    const client = new IXCClient({
      baseUrl: String(baseUrl),
      userId: String(userId),
      tokenHash: String(tokenHash),
      timeoutMs: 10_000,
    });
    const result = await client.ping();
    const latencyMs = Date.now() - t0;

    if (!result.ok) {
      return NextResponse.json({ ok: false, error: result.error, latencyMs }, { status: 502 });
    }
    return NextResponse.json({ ok: true, total: result.total, latencyMs });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
