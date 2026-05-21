# Supabase — FattoCRM

Schema multi-tenant com RLS isolando dados por `tenant_id`.

## Aplicar a migration inicial

### Opção 1 — SQL Editor (mais fácil pra começar)

1. Abre `https://supabase.com/dashboard/project/<seu-projeto>/sql/new`
2. Cola o conteúdo de `migrations/20260506_0001_initial_schema.sql`
3. Run

### Opção 2 — Supabase CLI

```bash
npx supabase link --project-ref <seu-project-ref>
npx supabase db push
```

### Opção 3 — MCP (depois de configurar)

Adicionar segundo MCP `supabase-fattocrm` em `~/.claude/.mcp.json`:

```json
{
  "supabase-fattocrm": {
    "command": "npx",
    "args": ["-y", "@supabase/mcp-server-supabase"],
    "env": {
      "SUPABASE_URL": "https://xxx.supabase.co",
      "SUPABASE_SERVICE_ROLE_KEY": "..."
    }
  }
}
```

## Estrutura

- `tenants` — empresa-cliente
- `tenant_membros` — link `auth.users` ↔ `tenants` com role
- `provider_config` — qual provider o tenant usa (IXC/MK/Bling/etc)
- `canais` — canais omnichannel ativos
- `departamentos` / `etiquetas` / `motivos` / `mensagens_rapidas` — configs do tenant
- `clientes` — base de clientes (sync de provider ou manual)
- `atendimentos` + `mensagens` — inbox
- `agentes_ia` + `agente_tools` + `agente_escalonamento` — squad IA configurável
- `kb_artigos` + `kb_categorias` — KB com pgvector
- `auditoria_eventos` — log

## RLS

Função helper `public.current_tenant_id()` lê `auth.uid()` → `tenant_membros`.
Toda tabela com `tenant_id` tem policy `tenant_id = current_tenant_id()`.

## Próximos passos depois de aplicar

1. Gerar types TS: `npx supabase gen types typescript --project-id XXX > apps/erp/src/lib/supabase/database.types.ts`
2. Substituir `Database = unknown` em `apps/erp/src/lib/supabase/types.ts` pelo gerado
3. Plugar wizard `/onboarding` salvando tenant + departamentos/etiquetas/motivos do template
4. Criar páginas `/login` e `/signup`
5. Substituir mocks por queries Supabase
