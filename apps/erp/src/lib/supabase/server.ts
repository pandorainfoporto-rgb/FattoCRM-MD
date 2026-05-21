import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./types";

interface CookieToSet {
  name: string;
  value: string;
  options?: CookieOptions;
}

/**
 * Cliente Supabase pro server (Server Components, Server Actions, Route Handlers).
 *
 * Lê/escreve cookies httpOnly via API do Next 14.
 * Em Server Components, set/remove podem falhar (cookies só são editáveis em
 * Server Actions / Route Handlers) — captura silenciosamente.
 *
 * Uso:
 *   const supabase = createClient();
 *   const { data: { user } } = await supabase.auth.getUser();
 */
export function createClient() {
  const cookieStore = cookies();
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet: CookieToSet[]) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Server Component: cookies não são editáveis. Middleware cuida.
          }
        },
      },
    },
  );
}

/**
 * Cliente com service_role — só usar em rotas server-side de admin.
 * IGNORA RLS. NUNCA expor pro browser.
 */
export function createAdminClient() {
  const cookieStore = cookies();
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {
          /* admin não persiste sessão de usuário */
        },
      },
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}
