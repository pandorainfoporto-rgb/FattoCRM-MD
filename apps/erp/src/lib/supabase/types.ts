/**
 * Types do schema Supabase.
 *
 * Placeholder até `supabase gen types typescript` rodar contra o projeto real.
 * Por enquanto Database é `any` — sem inferência de colunas mas o supabase-js
 * funciona. Quando rodar:
 *
 *   npx supabase gen types typescript --project-id frbssmiyfmhsclhibqje \
 *     > apps/erp/src/lib/supabase/database.types.ts
 *
 * E aí substitui esse arquivo importando o tipo gerado.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Database = any;
