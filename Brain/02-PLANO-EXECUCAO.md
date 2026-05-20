# 02 — Plano de Execução

> Roadmap sprint a sprint. Atualizar ao fim de cada sprint com decisões, entregáveis e o que ficou pra próxima.

## Visão geral

| Sprint | Foco | Status | Duração estimada |
|---|---|---|---|
| 1 | Branding + 4 LPs + domínio | 🟡 em curso | 3-5 dias |
| 2 | Fork ERP + Supabase + auth | ⏳ pendente | 7-10 dias |
| 3 | Squad de agentes IA jurídicos | ⏳ pendente | 5-7 dias |
| 4 | Integrações (pagamento/consulta/contrato) | ⏳ pendente | 7-10 dias |
| 5 | Dashboard do cliente | ⏳ pendente | 5-7 dias |
| 6 | Migração Kommo + Meta WhatsApp Cloud | ⏳ pendente | 3-5 dias |

Total estimado: ~6 semanas se executado em série. Paralelizável se mais de uma pessoa atuar.

---

## Sprint 1 — Branding + LPs (em curso)

**Objetivo:** colocar `limpanomemd.com.br` no ar com 4 LPs convertendo via WhatsApp, sem aguardar nenhuma credencial.

### Entregáveis

- [x] `Brain/00-NORTE.md` ← orientação estratégica
- [x] `Brain/02-PLANO-EXECUCAO.md` ← este arquivo
- [x] `Brand/BRANDBOOK.md` ← identidade visual completa
- [x] `Brand/imagens-referencia/README.md` ← briefing de produção
- [x] `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `tsconfig.base.json` ← monorepo
- [x] `apps/lp/` ← Next 14 com Tailwind + Fraunces + Inter
- [x] `apps/lp/src/components/site/` ← Header, Footer, Hero, Section, CtaWhatsapp, ImageSlot, ServiceCard, ProcessTimeline, Faq, TrustBar
- [x] `apps/lp/src/lib/cn.ts` + `lib/contact.ts` ← utilidades
- [x] LP `/` ← institucional (hero + 4 serviços + por que MD + processo + FAQ + CTA)
- [x] LP `/limpa-nome` ← serviço Limpa Nome
- [x] LP `/bacen` ← serviço BACEN/SCR
- [x] LP `/rating-bancario` ← rating bancário + comercial (seção #comercial)
- [x] `/politica-de-privacidade` + `/termos-de-uso` ← esqueletos LGPD (revisão MD pendente)
- [x] `README.md` ← instruções dev + deploy
- [x] `.gitignore` + `apps/lp/.env.example`
- [ ] Imagens placeholder substituídas (aguardando produção — opção A/B/C em `Brand/imagens-referencia/`)
- [ ] Registro do domínio `limpanomemd.com.br` no registro.br (Renato)
- [ ] Deploy Vercel + DNS apontado
- [ ] Push inicial pro GitHub

### Pendências do cliente pra fechar Sprint 1

1. **Logo MD em vetor (SVG/EPS)** ou alta resolução
2. **Telefone WhatsApp principal** (formato internacional, ex.: `5511987654321`)
3. **Email institucional** (`contato@limpanomemd.com.br` ou outro)
4. **OAB do advogado responsável** + nome
5. **Endereço físico** (rua, número, cidade/UF)
6. **CNPJ** (rodapé + compliance)
7. **Foto profissional do advogado** (LP institucional)
8. **Decidir opção de imagens** (A banco, B IA, C ensaio)

Sem esses dados o site sobe com placeholders. Substituição é trivial (env vars + 1 arquivo de slots).

---

## Sprint 2 — Fork ERP + Supabase + Auth

**Objetivo:** trazer o esqueleto do FattoCRM pra dentro do FattoCRM_MD, customizado para a operação MD.

### Plano

1. Copiar do `FattoCRM/`:
   - `apps/erp/` → `apps/erp/` (porta 3600 dev, rebranding visual MD via tokens Tailwind)
   - `packages/providers/core/` (manter como base)
   - `packages/providers/ixc/` (caso MD venha a integrar provedor de telecom — opcional)
   - `supabase/migrations/` → recriar schema base + adicionar tabelas jurídicas
2. Renomear pacotes: `@fattocrm/*` → `@md/*`
3. Substituir paleta CSS vars no `globals.css` do ERP por tokens MD do BRANDBOOK
4. Criar projeto Supabase MD (novo) — região `sa-east-1` (São Paulo)
5. Adaptar Auth: login por email/senha + magic link, RLS por org/user
6. Schema MD-específico:
   - `processos` (tipo: limpa_nome | bacen | rating_pf | rating_pj | outros)
   - `processo_movimentacoes` (timeline)
   - `processo_documentos` (FK Storage)
   - `contratos` + `contratos_versoes`
   - `pareceres` (parecer técnico inicial pré-contratação)
   - `clientes` + `clientes_dados_bancarios` (criptografados)
   - `consultas` (Serasa/BACEN/Boa Vista — log de chamadas API)
   - Reuso do schema base `ag_*` (agentes), `at_*` (atendimento), `kb_*` (knowledge base)

### Dependências

- Conta Supabase com projeto MD criado
- Vercel project pro ERP (subdomínio `app.limpanomemd.com.br`)

---

## Sprint 3 — Squad de agentes IA jurídicos

**Objetivo:** adaptar os 132 agentes do FattoCRM ao contexto jurídico-financeiro MD.

### Squad inicial proposta

| Agente | Função | Equivalente FattoCRM |
|---|---|---|
| **Marina** | Atendimento inicial / qualificação | Mestre da Vendas / Sophia |
| **Dr. Rafael** | Specialist Limpa Nome | KB: CDC art. 43, Súmula 385 STJ, jurisprudência STJ/STF |
| **Dra. Larissa** | Specialist BACEN/SCR | KB: Resolução CMN 4.571/2017, manual Registrato |
| **Dr. Bruno** | Specialist Rating PF/PJ | KB: critérios Serasa/Quod/Boa Vista, Cadastro Positivo |
| **Camila** | Documentos / contratos / petições | KB: templates de contrato, procuração, notificação |
| **Helena** | Pós-venda / acompanhamento | Helena (mantém nome) — adapta KB pra timeline jurídica |
| **Sofia** | Cobrança não-coerciva | Sofia (mantém nome) |
| **Compliance Watcher** | Monitor OAB/LGPD | Guard novo: bloqueia frases proibidas em tempo real |

### Compliance crítico

- **Guard hardcoded** que intercepta toda fala de agente IA antes do envio. Lista de frases proibidas no BRANDBOOK §6. Se acionado: agente regenera ou escala pra humano.
- **Toda escrita IA crítica** (notificação, contestação, parecer) vai por `ag_acoes_propostas` → humano aprova.
- **Identificação clara**: agente IA sempre se apresenta como "assistente virtual" no primeiro contato, oferecendo escalonamento pra advogado humano.

### KB (Knowledge Base) jurídico necessário

- Artigos do CDC pertinentes (43, 39, 51, etc.)
- Súmulas STJ aplicáveis (385, 359, 404, etc.)
- Resolução CMN 4.571/2017 (SCR)
- Lei 13.709/2018 (LGPD)
- Provimento OAB 205/2021
- Glossário jurídico-financeiro
- 30+ objeções típicas com resposta-padrão revisada por advogado

### Dependências

- Conteúdo KB redigido/revisado pelo advogado responsável MD
- API Anthropic plugada (Claude Haiku pro grosso + Opus pra parecer técnico)

---

## Sprint 4 — Integrações

**Objetivo:** plugar serviços externos necessários pra operação.

### Pagamento

Avaliar e escolher 1:
- **Asaas** (PJ brasileira, ótimo pra advocacia, boleto + PIX + cartão + recorrência)
- **Stripe** (internacional, melhor DX, sem boleto BR nativo)
- **PagSeguro / Mercado Pago** (BR, ampla aceitação, fees médios)

Recomendação: **Asaas** pela aderência ao mercado jurídico BR + automação de cobrança recorrente.

### Consulta de dados

- **Serasa Experian B2B** (custo alto, dados completos) — preferencial
- **Boa Vista QueryNet** (alternativa)
- **BACEN Registrato** (sem API oficial — cliente baixa e envia)
- **Receita Federal** — via SintegraWS, BigDataCorp ou DataValid (CNPJ/CPF)
- **Quod** (score positivo)

Avaliar custo/mês × volume de leads. Começar com 1 provedor (Serasa) e expandir.

### Assinatura eletrônica

- **ZapSign** (brasileira, integração simples) — recomendado
- **Clicksign** (alternativa, mais cara)
- **D4Sign** (alternativa)

### Meta WhatsApp Cloud API

- Cliente já tem WABA e BM ativos. Aguardando credenciais (`whatsapp_business_account_id`, `phone_number_id`, `access_token` permanente via System User).
- Plug via edge function (padrão do FattoCRM herdado).

### Pixels e tracking

- **Meta Pixel + CAPI** server-side (padrão FattoCRM herdado)
- **Google Analytics 4 + GTM** (lead conversion event)
- **TikTok Pixel** (se Renato decidir explorar) — opcional

---

## Sprint 5 — Dashboard do cliente

**Objetivo:** portal `app.limpanomemd.com.br` (ou subpath `/app`) onde cada cliente acompanha seu próprio processo.

### Funcionalidades

- Login por CPF + OTP via WhatsApp (zero atrito)
- Dashboard com timeline visual do processo (marcos: análise → contrato → notificação → resposta → encerramento)
- Documentos recebidos/enviados (Storage Supabase, RLS por cliente)
- Próximos passos e prazos (notificações por email + WhatsApp)
- Comunicados do advogado (markdown, com lido/não-lido)
- Chat direto (mesmo inbox da MD via FattoCRM)
- Download de contrato/procuração/sentenças

### Stack

- Mesmo monorepo, novo app `apps/cliente/` (porta 3800 dev)
- Compartilha Supabase com ERP
- UI simplificada (não tem sidebar de admin — tem só "Meus processos")

---

## Sprint 6 — Migração Kommo + Meta

**Objetivo:** trazer histórico do Kommo e ativar Meta WhatsApp Cloud sem perder continuidade.

### Plano

1. Solicitar export do Kommo (leads, contatos, conversas, deals)
2. Mapear schema Kommo → MD (consultoria de campos)
3. Script de import (one-shot, idempotente)
4. Plug Meta WhatsApp Cloud API (já em Sprint 4) — DNS verification + webhook
5. Migrar templates de WhatsApp aprovados (Meta exige aprovação por template)
6. **6 templates iniciais propostos** (todos com prefixo "Olá {{1}}" — ver memória sobre rejeição Meta):
   - `boas_vindas` (após lead capturado)
   - `confirmacao_analise` (parecer pronto)
   - `cobranca_documento` (documento pendente)
   - `marco_processo` (avanço no processo)
   - `pesquisa_satisfacao` (pós-encerramento)
   - `reativacao` (lead frio)

### Risco identificado

Memória relata que Meta rejeita templates com `{{1}}` no início ou fim do BODY. Todos os templates devem ter prefixo natural ("Olá {{1}}", "Oi {{1}}").

---

## Convenções de execução

- **PT-BR sempre** (UI, copy, commits, docs)
- **Commits semânticos:** `feat(lp): hero institucional`, `fix(brand): paleta gold contraste`, `docs(brain): atualizar plano sprint 1`
- **Push após cada commit** (padrão FattoCRM)
- **Schemas Zod fora de arquivos `"use server"`**
- **Server actions** exportam só `async functions`
- **Toda escrita IA crítica** vai por `ag_acoes_propostas`

## Histórico

- **2026-05-20** — Plano criado. Sprint 1 iniciada com bootstrap monorepo + LPs.
