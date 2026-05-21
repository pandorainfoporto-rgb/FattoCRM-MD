-- ============================================================
-- FattoCRM-MD — Schema jurídico (vertical advocacia / recuperação de crédito)
-- ============================================================
-- Estende o schema base multi-tenant (20260506_0001_initial_schema).
-- Domínio MD Assessoria: Limpa Nome, BACEN/SCR, Rating Bancário/Comercial.
-- Mesma filosofia: tudo tem tenant_id + RLS via current_tenant_id().
--
-- ⚠️ NÃO aplicada ainda — aguarda criação do projeto Supabase MD (Fase 2b).
--    Refinar campos com o Dr. Marcelo antes de produção.
-- ============================================================

-- ============================================================
-- ENUMS
-- ============================================================
create type public.processo_tipo as enum (
  'limpa_nome', 'bacen', 'rating_pf', 'rating_pj', 'outro'
);

create type public.processo_status as enum (
  'analise',        -- em análise jurídica gratuita (pré-contrato)
  'proposta',       -- parecer entregue, aguardando decisão do cliente
  'contratado',     -- contrato assinado
  'em_andamento',   -- execução (notificação, contestação, ação)
  'aguardando_doc', -- pendência de documentação do cliente
  'concluido',
  'arquivado'
);

create type public.contrato_status as enum (
  'rascunho', 'enviado', 'assinado', 'cancelado'
);

-- ============================================================
-- PROCESSOS — o caso jurídico de um cliente
-- ============================================================
create table public.processos (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  cliente_id uuid references public.clientes(id) on delete set null,
  tipo public.processo_tipo not null,
  status public.processo_status not null default 'analise',
  titulo text not null,
  descricao text,
  valor_honorario numeric(12,2),
  honorario_parcelas int default 1,
  advogado_responsavel text,           -- nome + OAB (texto livre até termos cadastro de advogados)
  prazo_estimado text,                  -- estimativa textual ("30-60 dias")
  origem text,                          -- de onde veio o lead (instagram, indicacao, etc.)
  criado_em timestamptz default now(),
  atualizado_em timestamptz default now()
);

create index idx_processos_tenant on public.processos(tenant_id);
create index idx_processos_cliente on public.processos(cliente_id);
create index idx_processos_status on public.processos(tenant_id, status);

comment on table public.processos is 'Caso jurídico de recuperação de crédito (Limpa Nome, BACEN, Rating).';

-- ============================================================
-- PROCESSO_MOVIMENTACOES — timeline do processo
-- ============================================================
create table public.processo_movimentacoes (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  processo_id uuid not null references public.processos(id) on delete cascade,
  tipo text not null,                   -- 'marco' | 'comunicado' | 'documento' | 'status' | 'nota_interna'
  titulo text not null,
  descricao text,
  visivel_cliente boolean default true, -- aparece no dashboard do cliente (Sprint 5)?
  criado_por text,                      -- quem registrou (advogado/agente IA)
  criado_em timestamptz default now()
);

create index idx_mov_processo on public.processo_movimentacoes(processo_id, criado_em desc);
create index idx_mov_tenant on public.processo_movimentacoes(tenant_id);

comment on table public.processo_movimentacoes is 'Timeline do processo. visivel_cliente controla o que aparece no portal do cliente.';

-- ============================================================
-- PROCESSO_DOCUMENTOS — anexos (Supabase Storage)
-- ============================================================
create table public.processo_documentos (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  processo_id uuid not null references public.processos(id) on delete cascade,
  nome text not null,
  tipo text,                            -- 'rg' | 'cpf' | 'comprovante' | 'extrato_serasa' | 'registrato' | 'contrato' | 'procuracao' | 'outro'
  storage_path text not null,           -- caminho no bucket privado
  tamanho_bytes bigint,
  enviado_por text,                     -- 'cliente' | 'advogado' | nome
  criado_em timestamptz default now()
);

create index idx_doc_processo on public.processo_documentos(processo_id);
create index idx_doc_tenant on public.processo_documentos(tenant_id);

comment on table public.processo_documentos is 'Documentos do processo. storage_path aponta pra bucket privado com RLS.';

-- ============================================================
-- PARECERES — parecer técnico inicial (pré-contratação)
-- ============================================================
create table public.pareceres (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  processo_id uuid not null references public.processos(id) on delete cascade,
  conteudo text not null,               -- texto do parecer
  fundamentacao text,                   -- base legal citada (CDC art X, Súmula Y)
  viavel boolean,                       -- há fundamento jurídico?
  prazo_estimado text,
  gerado_por_ia boolean default false,  -- rascunho IA aguardando aprovação humana?
  aprovado_por text,                    -- advogado que validou (compliance OAB)
  aprovado_em timestamptz,
  criado_em timestamptz default now()
);

create index idx_parecer_processo on public.pareceres(processo_id);
create index idx_parecer_tenant on public.pareceres(tenant_id);

comment on table public.pareceres is 'Parecer técnico do caso. Se gerado_por_ia, exige aprovação humana antes de enviar (compliance OAB).';

-- ============================================================
-- CONTRATOS — contrato de honorários + assinatura eletrônica
-- ============================================================
create table public.contratos (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  processo_id uuid not null references public.processos(id) on delete cascade,
  cliente_id uuid references public.clientes(id) on delete set null,
  status public.contrato_status not null default 'rascunho',
  valor numeric(12,2),
  condicoes text,                       -- condições de pagamento, escopo
  assinatura_provedor text,             -- 'zapsign' | 'clicksign' | 'd4sign'
  assinatura_doc_id text,               -- id do documento no provedor
  documento_path text,                  -- PDF gerado/assinado no Storage
  enviado_em timestamptz,
  assinado_em timestamptz,
  criado_em timestamptz default now(),
  atualizado_em timestamptz default now()
);

create index idx_contrato_processo on public.contratos(processo_id);
create index idx_contrato_tenant on public.contratos(tenant_id);
create index idx_contrato_status on public.contratos(tenant_id, status);

comment on table public.contratos is 'Contrato de honorários + rastreio de assinatura eletrônica (ZapSign/Clicksign).';

-- ============================================================
-- RLS — isolamento por tenant (mesmo padrão do schema base)
-- ============================================================
alter table public.processos enable row level security;
alter table public.processo_movimentacoes enable row level security;
alter table public.processo_documentos enable row level security;
alter table public.pareceres enable row level security;
alter table public.contratos enable row level security;

create policy "tenant_isolation_processos" on public.processos
  using (tenant_id = public.current_tenant_id())
  with check (tenant_id = public.current_tenant_id());

create policy "tenant_isolation_movimentacoes" on public.processo_movimentacoes
  using (tenant_id = public.current_tenant_id())
  with check (tenant_id = public.current_tenant_id());

create policy "tenant_isolation_documentos" on public.processo_documentos
  using (tenant_id = public.current_tenant_id())
  with check (tenant_id = public.current_tenant_id());

create policy "tenant_isolation_pareceres" on public.pareceres
  using (tenant_id = public.current_tenant_id())
  with check (tenant_id = public.current_tenant_id());

create policy "tenant_isolation_contratos" on public.contratos
  using (tenant_id = public.current_tenant_id())
  with check (tenant_id = public.current_tenant_id());

-- ============================================================
-- TRIGGER — atualizado_em automático
-- ============================================================
create or replace function public.touch_atualizado_em()
returns trigger language plpgsql as $$
begin
  new.atualizado_em = now();
  return new;
end;
$$;

create trigger trg_processos_touch before update on public.processos
  for each row execute function public.touch_atualizado_em();
create trigger trg_contratos_touch before update on public.contratos
  for each row execute function public.touch_atualizado_em();
