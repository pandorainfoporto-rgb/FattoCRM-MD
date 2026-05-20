# 03 — Deploy Vercel

> Guia pra ativar `limpanomemd.com.br` no ar. Pegadinhas documentadas pra não queimar tempo. Stack: Vercel + Next 14 + pnpm + Turbo monorepo.

## Pré-requisitos

- [x] Repo no GitHub: `github.com/pandorainfoporto-rgb/FattoCRM-MD`
- [x] Branch `main` com Sprint 1 mergeado
- [ ] Conta Vercel logada com a mesma org/usuário que tem acesso ao repo
- [ ] (Opcional Sprint 1) Domínio `limpanomemd.com.br` registrado no registro.br

## Passo a passo

### 1. Importar o projeto no Vercel

1. Vercel → **Add New** → **Project**
2. **Import Git Repository** → selecionar `pandorainfoporto-rgb/FattoCRM-MD`
3. **Framework Preset:** `Next.js` (Vercel detecta automaticamente)

### 2. ⚠️ Configurar Root Directory — PEGADINHA

**Esta é a parte que já queimou tempo em projeto irmão.** Em monorepo Turbo, há duas escolhas erradas e uma certa:

| Opção | Root Directory | Resultado |
|---|---|---|
| ❌ Errado | `apps/lp` | Vercel não enxerga `pnpm-workspace.yaml` da raiz, `@md/*` quebra |
| ❌ Errado | (deixar vazio padrão = `apps/lp` ou outro) | Idem |
| ✅ **Correto** | `.` (raiz) **+ Build Command override** | Turbo resolve workspace, build do app certo |

**Configuração final:**

- **Root Directory:** `.` (deixar em branco OU explicitamente `.`)
- **Build Command (override):** `cd apps/lp && pnpm build` *ou* `turbo build --filter=@md/lp`
- **Output Directory (override):** `apps/lp/.next`
- **Install Command:** `pnpm install` (padrão Vercel detecta)
- **Development Command (override):** `cd apps/lp && pnpm dev`

Alternativa (mais Vercel-native): usar `turbo` direto:

```
Build:    turbo build --filter=@md/lp
Output:   apps/lp/.next
Install:  pnpm install
```

### 3. Variáveis de ambiente

No painel **Environment Variables** do projeto Vercel, adicionar (todos como `Production, Preview, Development`):

| Variável | Valor inicial (placeholder) | Atualizar quando |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://fattocrm-md.vercel.app` (provisório) → `https://limpanomemd.com.br` | Domínio configurado |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `5500000000000` | Cliente enviar número |
| `NEXT_PUBLIC_PHONE_DISPLAY` | `(00) 00000-0000` | Idem |
| `NEXT_PUBLIC_EMAIL` | `contato@limpanomemd.com.br` | Email institucional criado |
| `NEXT_PUBLIC_OAB_RESPONSAVEL` | `Dr(a). Nome — OAB/XX XXXXX` | Cliente confirmar |
| `NEXT_PUBLIC_ADDRESS` | `Endereço a confirmar` | Idem |
| `NEXT_PUBLIC_INSTAGRAM_URL` | `https://instagram.com/mdassessoriaeconsultoria` | Já preenchido |

⚠️ **Importante:** as env vars `NEXT_PUBLIC_*` já estão declaradas em `turbo.json:build.env`. Sem isso, o Turbo no Vercel não passa elas pro Next no build. Já configurado neste repo.

### 4. Deploy

- Clicar **Deploy**
- Esperar build (~2-3 min)
- URL provisória: `https://fattocrm-md-<hash>.vercel.app`

### 5. Domínio próprio (depois de registrar limpanomemd.com.br)

1. Registrar `limpanomemd.com.br` no [registro.br](https://registro.br) (já validado disponível 2026-05-20, ~R$ 40/ano)
2. Vercel → projeto → **Settings** → **Domains** → adicionar `limpanomemd.com.br` e `www.limpanomemd.com.br`
3. Vercel mostra os registros DNS necessários:
   - `A` apontando para `76.76.21.21` (ou o IP atual da Vercel)
   - `CNAME` `www` → `cname.vercel-dns.com`
4. No painel do registro.br, configurar DNS pra esses valores
5. Propagação DNS: 15min a 24h (geralmente < 1h)
6. Vercel emite certificado SSL automaticamente
7. **Atualizar** `NEXT_PUBLIC_SITE_URL` pra `https://limpanomemd.com.br` e redeploy

### 6. Validações pós-deploy

- [ ] `https://limpanomemd.com.br/` carrega (institucional)
- [ ] `/limpa-nome`, `/bacen`, `/rating-bancario` carregam
- [ ] `/politica-de-privacidade` e `/termos-de-uso` carregam
- [ ] CTA WhatsApp abre `wa.me/...` com a mensagem certa por página
- [ ] OAB no rodapé exibe corretamente
- [ ] Lighthouse: Performance > 90, SEO > 95, Accessibility > 90
- [ ] Open Graph preview no link share (testar com [opengraph.xyz](https://opengraph.xyz))

## Como atualizar produção

```bash
# Local
git add -A
git commit -m "feat(lp): ajuste headline limpa-nome"
git push

# Vercel detecta push em main → deploy automático em ~2min
```

Branches que não são `main` viram preview deployments automáticos (útil pra revisar mudanças antes de mergear).

## Pegadinhas conhecidas (de projetos irmãos)

1. **Vercel CLI v53 bugado em Preview** (memória registra). Se usar CLI, fixar versão estável.
2. **Esquecer de declarar env var em `turbo.json:build.env`** = variável não chega no build do Next. Já corrigido aqui.
3. **Linkar Vercel do app interno** (`apps/lp`) em vez da raiz = quebra workspace. Já documentado acima.
4. **Tipos das env vars:** todas `NEXT_PUBLIC_*` ficam expostas no client. Não colocar segredos aí. Segredos (Supabase service role, Anthropic key, etc.) ficam sem prefixo `NEXT_PUBLIC_` — chegam Sprint 2.

## Histórico

- **2026-05-20** — Guia criado pré-deploy. Aguardando ativação pelo Renato.
