# 00 — NORTE MD Assessoria

> Documento canônico vivo. Leia primeiro numa nova sessão. Toda decisão que mexe em escopo/arquitetura atualiza este arquivo.

## O que é este repo

`FattoCRM-MD` é um **fork físico standalone** do FattoCRM, customizado para a **MD Assessoria e Consultoria** (escritório de advocacia especializado em recuperação de crédito e reabilitação financeira).

Tecnicamente é um produto vertical do "CRM Jurídico" — a primeira instância concreta de uma plataforma que será revendida para outros escritórios jurídico-financeiros. MD é cliente recorrente, Renato (Pandora Informática) é dono do produto.

## Posição

```
Desktop/FattoCredito/
├── FattoCreditoV2/      (ERP consórcio — vertical Fatto Crédito)
├── FattoCRM/            (plataforma-base genérica)
└── FattoCRM_MD/         (este repo — vertical MD)
```

- **Repo remoto:** `github.com/pandorainfoporto-rgb/FattoCRM-MD`
- **Domínio:** `limpanomemd.com.br` (disponível em 2026-05-20, registrar)
- **Supabase:** projeto próprio (criar quando Sprint 2 entrar — CRM)
- **Vercel:** projeto próprio (criar na Sprint 1 pra LPs)

## Cliente: MD Assessoria

- **Razão social:** MD Assessoria e Consultoria (a confirmar — escritório de advocacia)
- **Instagram:** [@mdassessoriaeconsultoria](https://instagram.com/mdassessoriaeconsultoria)
- **Link in bio atual:** [sandwiche.me/mdassessoria](https://sandwiche.me/mdassessoria)
- **Domínio antigo:** venceu (não recuperar; novo é `limpanomemd.com.br`)
- **Stack atual:** Kommo (CRM), WhatsApp API Meta, Meta Business, Instagram tráfego pago
- **Migração necessária:** Kommo → FattoCRM-MD com export de leads/contatos/conversas

## Serviços oferecidos (definem produto + LPs + agentes)

1. **Limpa Nome** — remoção de negativações Serasa/SPC/Boa Vista (judicial + extrajudicial)
2. **BACEN / Registrato / SCR** — consulta e contestação de registros no Sistema de Informações de Créditos do BACEN
3. **Rating Bancário** — recuperação/melhoria de scoring para reabertura de crédito em bancos
4. **Rating Comercial** — recuperação/melhoria de scoring para crédito comercial (fornecedores, B2B)
5. **Demais serviços advocatícios** — perfil do escritório, escopo aberto

## Posicionamento

**"Quando o banco fechou a porta, o direito ainda tem uma chave."**

Posicionar como **escritório-tecnologia**: autoridade jurídica tradicional + execução digital ágil + transparência total no andamento do processo via dashboard do cliente.

Diferencial vs. concorrência genérica "limpa nome":
- Advogado responsável (não despachante)
- Dashboard do cliente em tempo real (concorrência envia screenshot por WhatsApp)
- Compliance LGPD + OAB (não promete resultado, segue Provimento 205/2021)
- Atendimento por agente IA jurídico-treinado 24/7

## Arquitetura — visão geral

### Sprint 1 (esta semana) — LPs + branding

```
FattoCRM_MD/
├── Brain/                   docs estratégicos (este arquivo aqui)
├── Brand/                   brandbook completo
├── apps/lp/                 Next 14 — 4 landing pages
│   └── src/app/
│       ├── page.tsx                  → institucional
│       ├── limpa-nome/page.tsx       → conversão Limpa Nome
│       ├── bacen/page.tsx            → conversão BACEN
│       └── rating-bancario/page.tsx  → conversão Rating
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

**Sem backend nesta fase.** CTAs vão para `wa.me/55XX...` direto. Conversão é WhatsApp.

### Sprint 2 (próximas 2-4 semanas) — CRM forkado

Copiar do FattoCRM:
- `apps/erp/` → `apps/erp/` (rebranding MD, porta 3600 dev)
- `packages/providers/` → manter `core` + `ixc` (caso MD use no futuro) + adicionar `serasa`, `bacen-registrato`, `quod`, etc.
- `supabase/migrations/` → schema base + extensões jurídicas (processos, contratos, documentos)

### Sprint 3 — agentes IA jurídicos

Adaptar squad do FattoCRM (132 agentes) para contexto MD:
- **Vendas/atendimento:** "Marina" (Mestre da Vendas adaptada — não promete, qualifica)
- **Limpa Nome Specialist:** "Dr. Rafael" — conhece CDC art. 43, Súmula 385 STJ, jurisprudência
- **BACEN Specialist:** "Dra. Larissa" — conhece Registrato, Resolução 4.571/2017, procedimento de contestação
- **Rating Bancário/Comercial Specialist:** "Dr. Bruno" — conhece score Serasa/Quod, Score Cadastro Positivo
- **Compliance Watcher:** monitora todas as falas IA pra não infringir OAB (frases proibidas: "100% de sucesso", "garantia de limpeza", etc.)
- **Documentos:** "Camila" — gera contratos, procurações, petições padrão
- **Pós-venda:** "Helena" — acompanha cliente na timeline, alerta sobre próximos passos
- **Cobrança:** "Sofia" — recupera parcelas em atraso com tom não-coercivo

### Sprint 4 — integrações

- **Pagamento:** Asaas ou Stripe (consulta prévia paga + parcelamento de honorário)
- **Consulta de dados:** Serasa B2B, Boa Vista QueryNet, BACEN Registrato (via DataValid/BigDataCorp), Receita Federal (CNPJ/CPF via SintegraWS)
- **Assinatura eletrônica:** ZapSign ou Clicksign (contratos + procurações)
- **Meta:** plug WhatsApp Cloud API (já tem WABA do cliente) + Pixel CAPI server-side

### Sprint 5 — dashboard cliente

Portal `app.limpanomemd.com.br` (ou `cliente.`):
- Login por CPF + OTP via WhatsApp
- Timeline do processo com marcos
- Documentos recebidos/enviados
- Próximos passos e prazos
- Comunicados do advogado
- Chat direto (mesmo inbox da MD via FattoCRM)

## Compliance — não negociável

**OAB (Provimento 205/2021):**
- ❌ Não anunciar resultado garantido
- ❌ Não usar caso concreto sem autorização do cliente
- ❌ Não fazer captação direta agressiva (cold call sem opt-in)
- ✅ Marketing informativo e moderado
- ✅ Identificação clara do advogado responsável (OAB + número)

**LGPD (Lei 13.709/2018):**
- Termo de uso + Política de privacidade
- Consentimento explícito por finalidade
- DPO designado
- Base legal: execução de contrato (cliente) + interesse legítimo (lead qualificado) + consentimento (marketing)
- Direitos do titular: acesso, correção, exclusão, portabilidade

**CDC + Direito do Consumidor:**
- Súmula 385 STJ (preexistência da inscrição não impede dano moral por nova inscrição irregular)
- CDC art. 43 (consumidor tem direito ao acesso a informações cadastrais)
- Prazo prescricional 5 anos para SPC/Serasa

Texto jurídico final SEMPRE redigido/revisado pelo advogado MD. Squad só faz esqueleto.

## Sprint 1 — entregáveis concretos

- [ ] `Brain/00-NORTE.md` ← este arquivo
- [ ] `Brand/BRANDBOOK.md` — paleta + tipografia + tom + logo + aplicações
- [ ] `apps/lp/` — Next 14 com 4 rotas
- [ ] LP `/` (institucional) — quem somos, serviços, contato
- [ ] LP `/limpa-nome` — conversão
- [ ] LP `/bacen` — conversão
- [ ] LP `/rating-bancario` — conversão
- [ ] Componentes compartilhados: Header, Footer, HeroPattern, ServiceCard, TestimonialBlock, CTAWhatsApp, FAQ, ProcessTimeline
- [ ] Imagens — placeholders Unsplash + lista de briefing pra produção (jornada DOR → SOLUÇÃO)
- [ ] Deploy Vercel + apontar limpanomemd.com.br
- [ ] README com instruções de dev + deploy
- [ ] Push inicial pro GitHub

## Pendências do cliente (aguardando)

1. **Logo oficial em alta** (extrair do Instagram ou pedir arquivo vetorial)
2. **Endereço físico + CNPJ + OAB responsável** (rodapé, contratos, compliance)
3. **Foto profissional do advogado** (LP institucional + autoridade)
4. **3-5 cases reais** com autorização (depoimentos LPs — observar OAB)
5. **Credenciais Meta Business + WhatsApp Cloud API** (Sprint 4)
6. **Export Kommo** (Sprint 2)
7. **Telefone WhatsApp principal** (já existe na bio? confirmar)
8. **Cidade/região de atuação** (SEO local)

## Histórico de decisões

- **2026-05-20** — Criação do repo. Decisões: fork físico standalone (não vertical no monorepo); Renato dono do produto, MD cliente recorrente; Sprint 1 = LPs+brand, sem aguardar credenciais.

---

**Última atualização:** 2026-05-20 — sessão inicial de bootstrap.
