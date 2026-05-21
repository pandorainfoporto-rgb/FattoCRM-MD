import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "./types";

interface CookieToSet {
  name: string;
  value: string;
  options?: CookieOptions;
}

/**
 * Middleware utility pra refresh da sessão Supabase em toda navegação.
 *
 * Padrão recomendado pelo @supabase/ssr — sem isso, sessões expiradas
 * não renovam e o user é deslogado silenciosamente.
 */
export async function updateSession(request: NextRequest) {
  // Bypass total se Supabase ainda não configurado — evita quebrar dev/deploy
  // antes do projeto Supabase ser criado e .env preenchido.
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return NextResponse.next({ request });
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet: CookieToSet[]) => {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Refresh do JWT — se expirado, renova via cookies. Se inválido, limpa.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Rotas públicas (sem auth)
  const PUBLICAS = ["/login", "/signup", "/auth/callback"];
  const path = request.nextUrl.pathname;
  const ePublica = PUBLICAS.some((p) => path === p || path.startsWith(`${p}/`));

  // Onboarding: só logado pode ativar tenant
  const eOnboarding = path === "/onboarding" || path.startsWith("/onboarding/");

  if (!user && !ePublica) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", path);
    return NextResponse.redirect(url);
  }

  // Logged user em rota pública (ex: /login) → manda pro dashboard
  if (user && ePublica && path !== "/auth/callback") {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // Logged user sem tenant ativo → força onboarding (exceto se já tá lá)
  // (TODO: checar tenant_membros — por ora deixa passar; lógica vai pro layout do dashboard)

  return response;
}
