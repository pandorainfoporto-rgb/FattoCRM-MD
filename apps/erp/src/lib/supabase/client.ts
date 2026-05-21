"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";

/**
 * Cliente Supabase pro browser (Client Components).
 *
 * Usa cookies httpOnly do Next 14 — não armazena nada em localStorage.
 * Auth state sincronizado pelo middleware (apps/erp/src/middleware.ts).
 *
 * Uso:
 *   const supabase = createClient();
 *   const { data } = await supabase.from("clientes").select("*");
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
