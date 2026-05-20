# FattoCRM-MD

Vertical jurídico-financeiro do FattoCRM para **MD Assessoria e Consultoria** — escritório de advocacia especializado em Limpa Nome, BACEN, Rating Bancário e Rating Comercial.

> **Status:** v0.1.0 — Sprint 1 em execução (LPs + branding).
> **Stack:** Next.js 14 · Tailwind v3 · npm workspaces · TypeScript strict.
> **Repo:** [pandorainfoporto-rgb/FattoCRM-MD](https://github.com/pandorainfoporto-rgb/FattoCRM-MD)
> **Domínio:** `limpanomemd.com.br` (disponível, registrar).

> **Nota técnica:** monorepo via npm workspaces (não pnpm/Turbo).
> Decisão tomada em 2026-05-20 após 5 tentativas frustradas de build do Vercel
> com `ERR_INVALID_THIS` (bug do runtime Node do Vercel com URLSearchParams).
> Ver `Brain/03-DEPLOY-VERCEL.md §Pegadinhas`.

## Estrutura

```
FattoCRM_MD/
├── Brain/              docs estratégicos e operacionais (NORTE, PRD, plano)
├── Brand/              brandbook + paleta + imagens-referencia
├── apps/
│   └── lp/             Next.js 14 — landing pages (porta 3700)
├── package.json        npm workspaces
├── tsconfig.base.json
└── vercel.json         deploy config
```

## Como rodar

```bash
# Instalar (raiz)
npm install

# Dev — Sprint 1 só tem 1 app (LP)
npm run dev

# Ou diretamente
npm run dev --workspace=@md/lp
```

Abre em [http://localhost:3700](http://localhost:3700).

## Sprint 1 — escopo

- [x] `Brain/00-NORTE.md` — orientação estratégica
- [x] `Brand/BRANDBOOK.md` — identidade visual + tom de voz
- [ ] `apps/lp/` — 4 landing pages (institucional + Limpa Nome + BACEN + Rating)
- [ ] Deploy Vercel + apontar `limpanomemd.com.br`
- [ ] Imagens placeholder + briefing de produção

## Variáveis de ambiente

`apps/lp/.env.local` (copiar de `.env.example`):

```
NEXT_PUBLIC_SITE_URL=https://limpanomemd.com.br
NEXT_PUBLIC_WHATSAPP_NUMBER=55XXXXXXXXXXX
NEXT_PUBLIC_PHONE_DISPLAY=(XX) XXXXX-XXXX
NEXT_PUBLIC_EMAIL=contato@limpanomemd.com.br
NEXT_PUBLIC_OAB=OAB/XX XXXXX (Dr(a). Nome)
NEXT_PUBLIC_ADDRESS=Rua ..., Cidade/UF
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/mdassessoriaeconsultoria
```

## Roadmap

1. **Sprint 1 (em curso) — LPs + brand**
2. Sprint 2 — fork ERP FattoCRM, adaptar pra MD, schema Supabase
3. Sprint 3 — squad de agentes IA jurídicos (8-10 agentes adaptados)
4. Sprint 4 — integrações: Asaas/Stripe (pagamento), Serasa/BACEN/Boa Vista (consulta), ZapSign (contratos), Meta WhatsApp Cloud
5. Sprint 5 — dashboard do cliente (timeline do processo)
6. Sprint 6 — migração dos dados do Kommo

Ver `Brain/00-NORTE.md` para detalhamento de cada sprint e pendências.

## Padrões herdados do FattoCRM (não repensar)

- **PT-BR sempre** — UI, copy, commits
- **Server actions** em `"use server"` exportam só `async functions`
- **Schemas Zod** fora de arquivos `"use server"`
- **Push após cada commit**
- **Comunicação cliente↔atendente sempre pelo CRM** (nunca WhatsApp pessoal do advogado)
- **Toda escrita IA crítica** vai por `ag_acoes_propostas` (proposta → humano aprova) quando backend entrar

## Compliance — não negociável

- OAB Provimento 205/2021 — proibido prometer resultado, exigência de transparência publicitária
- LGPD Lei 13.709/2018 — consentimento explícito, DPO, base legal por finalidade
- Texto jurídico final SEMPRE revisado pelo advogado responsável MD

## Licença

Proprietário — todos os direitos reservados. Renato Rufatto / Pandora Informática.
