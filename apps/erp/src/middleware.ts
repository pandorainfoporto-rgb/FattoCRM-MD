import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * Middleware Next 14 — roda em toda navegação.
 * Refresh de sessão Supabase + guards de rota (público/protegido).
 */
export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match em todas as rotas exceto:
     * - _next/static (arquivos estáticos)
     * - _next/image (otimização de imagem)
     * - favicon.ico, sitemap.xml, robots.txt
     * - api/ixc/* (já tem auth própria via env)
     * - assets de imagem
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api/ixc|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
