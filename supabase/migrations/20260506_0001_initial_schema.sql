-- ============================================================
-- FattoCRM v0.1 — Schema inicial multi-tenant
-- ============================================================
-- Filosofia: TUDO tem tenant_id + RLS isolando.
-- auth.uid() → tenant_membros → libera linhas do tenant.
-- ============================================================

-- ============================================================
-- EXTENSIONS
-- ============================================================
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";
create extension if not exists "vector";

-- ============================================================
-- TENANTS (empresa-cliente)
-- ============================================================
create table public.tenants (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  nome text not null,
  vertical text not null check (vertical in ('isp','moveis_premium','ecommerce','advocacia','telemed','outro')),
  software_gestao text,
  tagline text,
  cor_primaria text default '#0052FF',
  cor_secundaria text default '#00D1FF',
  ativo boolean default true,
  criado_em timestamptz default now(),
  ativado_em timestamptz
);

comment on table public.tenants is 'Empresa-cliente do FattoCRM. 1 row por wizard ativado.';

-- ============================================================
-- TENANT_MEMBROS (auth.users <-> tenants)
-- ============================================================
create type public.tenant_role as enum ('owner','admin','gestor','atendente','consultor');

create table public.tenant_membros (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.tenant_role not null default 'atendente',
  ativo boolean default true,
  criado_em timestamptz default now(),
  unique (tenant_id, user_id)
);

create index idx_tenant_membros_user on public.tenant_membros(user_id);
create index idx_tenant_membros_tenant on public.tenant_membros(tenant_id);

-- ============================================================
-- HELPER: current_tenant_id() — usado por todas as RLS policies
-- ============================================================
create or replace function public.current_tenant_id()
returns uuid
language sql stable security definer
set search_path = public
as $$
  select tenant_id
  from public.tenant_membros
  where user_id = auth.uid() and ativo = true
  order by criado_em asc
  limit 1
$$;

-- ============================================================
-- PROVIDER_CONFIG (IXC, Bling, Shopify, etc — 1 ativo por tenant)
-- ============================================================
create table public.provider_config (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  provider_key text not null,
  conectado boolean default false,
  config_publica jsonb default '{}'::jsonb,
  config_secreta_cifrada bytea,
  ultima_conexao_ok timestamptz,
  ultima_conexao_erro text,
  criado_em timestamptz default now(),
  atualizado_em timestamptz default now(),
  unique (tenant_id, provider_key)
);

comment on column public.provider_config.config_secreta_cifrada is
  'Credenciais cifradas com pgsodium ou vault. Nunca expor por RLS direta.';

-- ============================================================
-- CANAIS (omnichannel)
-- ============================================================
create table public.canais (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  tipo text not null check (tipo in ('whatsapp','whatsapp-call','voz','instagram','messenger','email','telegram','webchat')),
  nome text not null,
  ativo boolean default true,
  config jsonb default '{}'::jsonb,
  criado_em timestamptz default now(),
  unique (tenant_id, tipo, nome)
);

-- ============================================================
-- CONFIGS DE TENANT — copiadas do template no onboarding
-- ============================================================
create table public.departamentos (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  nome text not null,
  ordem int default 0,
  criado_em timestamptz default now(),
  unique (tenant_id, nome)
);

create table public.etiquetas (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  nome text not null,
  cor text default '#0052FF',
  criado_em timestamptz default now(),
  unique (tenant_id, nome)
);

create table public.motivos (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  nome text not null,
  ordem int default 0,
  criado_em timestamptz default now(),
  unique (tenant_id, nome)
);

create table public.mensagens_rapidas (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  atalho text not null,
  texto text not null,
  criado_em timestamptz default now(),
  unique (tenant_id, atalho)
);

-- ============================================================
-- CLIENTES (sincronizados de provider OU criados manual)
-- ============================================================
create table public.clientes (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  provider_key text,
  provider_id text,
  nome text not null,
  cnpj_cpf text,
  email text,
  telefone text,
  whatsapp text,
  cidade text,
  uf text,
  endereco text,
  ativo boolean default true,
  raw jsonb,
  criado_em timestamptz default now(),
  atualizado_em timestamptz default now()
);

create unique index uniq_clientes_provider on public.clientes(tenant_id, provider_key, provider_id)
  where provider_key is not null and provider_id is not null;
create index idx_clientes_tenant on public.clientes(tenant_id);
create index idx_clientes_busca on public.clientes(tenant_id, lower(nome));

-- ============================================================
-- AGENTES IA + TOOLS
-- ============================================================
create type public.agente_status as enum ('ativo','treinando','pausado');

create table public.agentes_ia (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  nome text not null,
  setor text not null,
  cargo text,
  modelo text not null default 'claude-haiku-4-5',
  temperatura real default 0.4,
  status public.agente_status default 'ativo',
  system_prompt text not null,
  canais text[] default '{}',
  capacidades text[] default '{}',
  cor text,
  criado_em timestamptz default now(),
  atualizado_em timestamptz default now(),
  unique (tenant_id, nome)
);

create table public.agente_tools (
  id uuid primary key default uuid_generate_v4(),
  agente_id uuid not null references public.agentes_ia(id) on delete cascade,
  tool_key text not null,
  config jsonb default '{}',
  unique (agente_id, tool_key)
);

create table public.agente_escalonamento (
  id uuid primary key default uuid_generate_v4(),
  agente_id uuid not null references public.agentes_ia(id) on delete cascade,
  departamento_id uuid not null references public.departamentos(id) on delete cascade,
  ordem int default 0,
  unique (agente_id, departamento_id)
);

-- ============================================================
-- ATENDIMENTOS / MENSAGENS
-- ============================================================
create type public.atendimento_status as enum ('aberto','em_atendimento','aguardando','encerrado','arquivado');
create type public.atendimento_canal as enum ('whatsapp','whatsapp-call','voz','instagram','messenger','email','telegram','webchat');

create table public.atendimentos (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  protocolo text not null,
  cliente_id uuid references public.clientes(id) on delete set null,
  canal public.atendimento_canal not null,
  status public.atendimento_status not null default 'aberto',
  prioridade text default 'normal',
  assigned_to uuid references auth.users(id) on delete set null,
  agente_ia_id uuid references public.agentes_ia(id) on delete set null,
  departamento_id uuid references public.departamentos(id) on delete set null,
  etiquetas uuid[] default '{}',
  ultima_mensagem_em timestamptz,
  aberto_em timestamptz default now(),
  encerrado_em timestamptz,
  unique (tenant_id, protocolo)
);

create index idx_atendimentos_tenant_status on public.atendimentos(tenant_id, status);
create index idx_atendimentos_cliente on public.atendimentos(cliente_id);

create type public.mensagem_papel as enum ('cliente','atendente','ia','sistema');

create table public.mensagens (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  atendimento_id uuid not null references public.atendimentos(id) on delete cascade,
  papel public.mensagem_papel not null,
  autor_user_id uuid references auth.users(id) on delete set null,
  autor_agente_ia_id uuid references public.agentes_ia(id) on delete set null,
  texto text,
  midia_url text,
  midia_tipo text,
  criado_em timestamptz default now()
);

create index idx_mensagens_atendimento on public.mensagens(atendimento_id, criado_em);

-- ============================================================
-- KB (Knowledge Base) com pgvector
-- ============================================================
create table public.kb_categorias (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  nome text not null,
  descricao text,
  ordem int default 0,
  criado_em timestamptz default now(),
  unique (tenant_id, nome)
);

create table public.kb_artigos (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  categoria_id uuid references public.kb_categorias(id) on delete set null,
  titulo text not null,
  conteudo text not null,
  tags text[] default '{}',
  embedding vector(1536),
  ativo boolean default true,
  criado_em timestamptz default now(),
  atualizado_em timestamptz default now()
);

create index idx_kb_artigos_tenant on public.kb_artigos(tenant_id);
-- Índice de similaridade vetorial (ivfflat) — exige populá-lo após inserir dados:
--   create index ... using ivfflat (embedding vector_cosine_ops) with (lists = 100);
-- Por enquanto índice básico por embedding null/not-null:
create index idx_kb_artigos_tem_embedding on public.kb_artigos(tenant_id) where embedding is not null;

-- ============================================================
-- AUDITORIA
-- ============================================================
create table public.auditoria_eventos (
  id bigserial primary key,
  tenant_id uuid references public.tenants(id) on delete set null,
  user_id uuid references auth.users(id) on delete set null,
  acao text not null,
  recurso text,
  recurso_id text,
  payload jsonb,
  criado_em timestamptz default now()
);

create index idx_auditoria_tenant_data on public.auditoria_eventos(tenant_id, criado_em desc);

-- ============================================================
-- TRIGGER: touch atualizado_em
-- ============================================================
create or replace function public.touch_atualizado_em()
returns trigger language plpgsql as $$
begin
  new.atualizado_em := now();
  return new;
end;
$$;

create trigger trg_clientes_updated before update on public.clientes
  for each row execute function public.touch_atualizado_em();
create trigger trg_provider_config_updated before update on public.provider_config
  for each row execute function public.touch_atualizado_em();
create trigger trg_agentes_ia_updated before update on public.agentes_ia
  for each row execute function public.touch_atualizado_em();
create trigger trg_kb_artigos_updated before update on public.kb_artigos
  for each row execute function public.touch_atualizado_em();

-- ============================================================
-- ENABLE RLS
-- ============================================================
alter table public.tenants enable row level security;
alter table public.tenant_membros enable row level security;
alter table public.provider_config enable row level security;
alter table public.canais enable row level security;
alter table public.departamentos enable row level security;
alter table public.etiquetas enable row level security;
alter table public.motivos enable row level security;
alter table public.mensagens_rapidas enable row level security;
alter table public.clientes enable row level security;
alter table public.atendimentos enable row level security;
alter table public.mensagens enable row level security;
alter table public.agentes_ia enable row level security;
alter table public.agente_tools enable row level security;
alter table public.agente_escalonamento enable row level security;
alter table public.kb_categorias enable row level security;
alter table public.kb_artigos enable row level security;
alter table public.auditoria_eventos enable row level security;

-- ============================================================
-- RLS POLICIES — usuário só vê dados do seu tenant
-- ============================================================

-- TENANTS: vê só os tenants em que é membro
create policy "tenants_select_own" on public.tenants
  for select to authenticated
  using (id in (select tenant_id from public.tenant_membros where user_id = auth.uid() and ativo = true));

-- TENANTS: insert livre pra authenticated (wizard cria; user é vinculado em seguida)
create policy "tenants_insert_authenticated" on public.tenants
  for insert to authenticated
  with check (true);

-- TENANTS: update só owner/admin
create policy "tenants_update_owner_admin" on public.tenants
  for update to authenticated
  using (
    id in (
      select tenant_id from public.tenant_membros
      where user_id = auth.uid() and ativo = true and role in ('owner','admin')
    )
  );

-- TENANT_MEMBROS: vê próprios membros do tenant
create policy "membros_select_same_tenant" on public.tenant_membros
  for select to authenticated
  using (tenant_id = public.current_tenant_id() OR user_id = auth.uid());

create policy "membros_insert_self_or_admin" on public.tenant_membros
  for insert to authenticated
  with check (
    -- usuário pode criar a própria associação na hora do onboarding
    user_id = auth.uid()
    -- ou owner/admin pode adicionar outros
    OR tenant_id in (
      select tenant_id from public.tenant_membros
      where user_id = auth.uid() and ativo = true and role in ('owner','admin')
    )
  );

-- Tabelas com tenant_id direto: política CRUD igual pra todas
do $$
declare
  t text;
  tabelas text[] := array[
    'provider_config','canais','departamentos','etiquetas','motivos','mensagens_rapidas',
    'clientes','atendimentos','mensagens','agentes_ia','kb_categorias','kb_artigos'
  ];
begin
  foreach t in array tabelas loop
    execute format('
      create policy %I on public.%I
      for all to authenticated
      using (tenant_id = public.current_tenant_id())
      with check (tenant_id = public.current_tenant_id())
    ', t || '_tenant_isolation', t);
  end loop;
end $$;

-- agente_tools / agente_escalonamento: ligam via agente_id (sem tenant_id direto)
create policy "agente_tools_tenant_isolation" on public.agente_tools
  for all to authenticated
  using (agente_id in (select id from public.agentes_ia where tenant_id = public.current_tenant_id()))
  with check (agente_id in (select id from public.agentes_ia where tenant_id = public.current_tenant_id()));

create policy "agente_escalonamento_tenant_isolation" on public.agente_escalonamento
  for all to authenticated
  using (agente_id in (select id from public.agentes_ia where tenant_id = public.current_tenant_id()))
  with check (agente_id in (select id from public.agentes_ia where tenant_id = public.current_tenant_id()));

-- AUDITORIA: select só do próprio tenant; insert via service_role (logs sistema)
create policy "auditoria_select_own" on public.auditoria_eventos
  for select to authenticated
  using (tenant_id = public.current_tenant_id());

create policy "auditoria_insert_authenticated" on public.auditoria_eventos
  for insert to authenticated
  with check (tenant_id is null OR tenant_id = public.current_tenant_id());
