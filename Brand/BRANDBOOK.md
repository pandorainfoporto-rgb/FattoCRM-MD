# MD Assessoria — Brandbook v1.0

> Identidade visual e verbal da MD Assessoria e Consultoria. Toda peça produzida (LP, post, email, contrato, dashboard) DEVE seguir este documento. Atualizar quando houver decisão de marca.

---

## 1. Essência

### Promessa
**Quando o banco fechou a porta, o direito ainda tem uma chave.**

### Missão
Devolver o acesso ao crédito e à dignidade financeira de pessoas que foram inscritas em cadastros restritivos, contestadas no BACEN ou avaliadas com rating bancário/comercial prejudicial — com transparência jurídica e tecnologia.

### Visão
Tornar-se a referência de **escritório-tecnologia jurídico-financeiro** no Brasil, escalando a operação MD para múltiplas regiões sem perder a personalização do atendimento.

### Valores
1. **Autoridade humana** — quem assina é advogado, não despachante.
2. **Transparência radical** — cliente vê o andamento do processo em tempo real.
3. **Responsabilidade técnica** — nada é prometido. Tudo é fundamentado.
4. **Empatia operacional** — quem vem aqui está em dor financeira. A linguagem reconhece isso.
5. **LGPD + OAB no DNA** — compliance não é trava, é diferencial.

---

## 2. Arquétipo de marca

**Sábio (Sage)** com sombra de **Cuidador (Caregiver)**.

- O Sábio domina o conhecimento técnico (lei, jurisprudência, processo BACEN, scoring).
- O Cuidador acolhe o cliente em momento de vulnerabilidade.
- Combinação rara em escritórios de advocacia — geralmente são frios (só Sábio) ou populistas (só promessa).

Anti-arquétipo: **Mágico** ("limpamos seu nome em 24h por R$ 99") e **Herói agressivo** ("brigamos com banco").

---

## 3. Paleta

### Primária

| Token | Hex | Uso |
|---|---|---|
| `--md-navy-deep` | `#0B1E3B` | Background principal escuro, headlines em fundo claro |
| `--md-navy` | `#1E3A5F` | Background secundário, navegação |
| `--md-gold` | `#C5A572` | Acento de autoridade, selos, divisores, ícones jurídicos |
| `--md-paper` | `#F8F5EF` | Fundo claro principal (off-white, sensação papel) |
| `--md-ink` | `#0F172A` | Texto principal em fundo claro |

### Estado (sinalização)

| Token | Hex | Uso |
|---|---|---|
| `--md-success` | `#10B981` | Conquista, processo concluído, "nome limpo" |
| `--md-warning` | `#F59E0B` | Pendência, aguardando documentação |
| `--md-danger` | `#DC2626` | Restrição ativa, alerta crítico |
| `--md-info` | `#3B82F6` | Notificação neutra |

### Neutros

| Token | Hex | Uso |
|---|---|---|
| `--md-gray-50` | `#F8FAFC` | Cards sobre fundo paper |
| `--md-gray-200` | `#E2E8F0` | Bordas suaves |
| `--md-gray-400` | `#94A3B8` | Texto secundário |
| `--md-gray-700` | `#334155` | Headlines secundárias |

### Combinações canônicas

- **Hero (LP):** fundo `--md-navy-deep` + headline `--md-paper` + acento `--md-gold` + CTA `--md-success`
- **Card de serviço:** fundo `--md-paper` + título `--md-navy-deep` + ícone `--md-gold` + corpo `--md-gray-700`
- **Selo/badge:** fundo `--md-gold` + texto `--md-navy-deep` (alto contraste autoridade)
- **CTA primário:** fundo `--md-success` + texto branco
- **CTA secundário (WhatsApp):** fundo `#25D366` (verde WA oficial) + texto branco

### Por que essa paleta

- **Navy profundo** = autoridade jurídica clássica (mesma família dos togas, fóruns, instituições de direito).
- **Dourado discreto** = prestígio sem ostentação. Sinaliza "advogado, não banco".
- **Off-white "paper"** = sensação de documento jurídico (não branco frio de software SaaS).
- **Verde-esperança** apenas em conquista/conversão. **Nunca verde "consumo"**.

Evitar: vermelho como cor de marca (associa a alarme/restrição, é justamente o que o cliente quer sair). Roxo (associa a entretenimento). Cinza puro (frio).

---

## 4. Tipografia

### Hierarquia

| Peso | Família | Web font | Uso |
|---|---|---|---|
| Display/Headline | **Fraunces** (serif moderna) | Google Fonts | H1, manchetes hero, citações destacadas |
| UI/Corpo | **Inter** (sans-serif neutra) | Google Fonts | Corpo, navegação, formulários, dashboard |
| Mono (técnico) | **JetBrains Mono** | Google Fonts | Códigos de processo, números de OAB, IDs técnicos |

### Escala (Tailwind)

| Token | Tamanho | Uso |
|---|---|---|
| `text-display` | 64-80px | Hero H1 |
| `text-h1` | 48px | Page title |
| `text-h2` | 32px | Section title |
| `text-h3` | 24px | Card title |
| `text-body-lg` | 18px | Texto introdutório, lead |
| `text-body` | 16px | Corpo padrão |
| `text-body-sm` | 14px | Metadado, legenda |
| `text-caption` | 12px | Microcopy, disclaimer |

### Regras

- Headlines: Fraunces, peso 500-600, tracking apertado (-0.02em).
- Corpo: Inter, peso 400, line-height 1.6, tracking neutro.
- Botões: Inter, peso 500, tracking 0.02em, sem ALL CAPS (autoridade > grito).
- Não misturar mais que 2 famílias por peça.

---

## 5. Logo

### Status atual
Aguardando arquivo vetorial oficial. Logo do Instagram tem resolução baixa (não usar em LP).

### Pedido ao cliente
- SVG ou EPS (vetor)
- PNG transparente 2000px+ pra fallback
- Versões: positiva (sobre claro), negativa (sobre escuro), símbolo isolado (favicon)

### Placeholder enquanto isso
Wordmark "MD" em Fraunces 600, navy deep, com underline dourado. Vide `Brand/logos/placeholder/`.

### Aplicação
- **Espaçamento mínimo:** altura do "M" em todos os lados (clear space).
- **Tamanho mínimo:** 24px de altura em digital, 12mm em impresso.
- **Cores:** navy-deep sobre paper. Paper sobre navy-deep. Nunca colorido em fundo colorido.
- **Proibido:** distorcer proporção, aplicar sombra/glow, rotacionar, criar variações de cor não aprovadas.

---

## 6. Tom de voz

### 3 traços canônicos

1. **Empático** — reconhece a dor antes de oferecer solução.
2. **Autoridade** — fundamenta tecnicamente, cita lei/súmula quando relevante.
3. **Transparente** — fala o que pode e não pode fazer. Sem promessa.

### Exemplos canônicos

**Headline LP Limpa Nome:**
- ✅ "Seu nome foi negativado de forma irregular? A lei está do seu lado."
- ❌ "Limpamos seu nome em 24h. 100% garantido."

**Mensagem WhatsApp inicial (agente IA):**
- ✅ "Olá, {nome}. Aqui é a Marina, do escritório MD. Você acabou de pedir uma consulta sobre Limpa Nome. Antes de qualquer coisa, preciso entender sua situação. Pode me contar o que aconteceu?"
- ❌ "Oi! Tudo bem? Você quer limpar seu nome? Nosso pacote é R$ 497."

**Email pós-conversão:**
- ✅ "Recebemos sua documentação. Em até 48h úteis o advogado responsável vai analisar e te enviar um parecer com os passos do seu caso. Você pode acompanhar tudo em [link]."
- ❌ "PARABÉNS! Seu processo já começou! Em breve você estará LIVRE!"

### Palavras que usamos

- "Análise jurídica" (não "análise gratuita milagrosa")
- "Parecer técnico" (não "diagnóstico secreto")
- "Procedimento" (não "magia jurídica")
- "Restabelecimento de crédito" (não "limpeza expressa")
- "Contestação" (não "remoção")
- "Direito do consumidor", "Código de Defesa", "Súmula" (não evitar termos técnicos — eles geram autoridade)

### Palavras proibidas (compliance OAB)

- ❌ "Garantia", "garantido", "100%", "certo", "infalível"
- ❌ "Em 24h", "imediato", "agora", "rápido" (sem contexto jurídico)
- ❌ "Limpamos", "removemos" (sem qualificar "judicialmente quando irregular")
- ❌ "Banco roubou", "banco te enganou" (acusação genérica sem fundamentação)
- ❌ Promessa de resultado financeiro específico

### Frases-âncora (usar consistentemente)

- "O direito ainda tem uma chave."
- "Análise jurídica antes da promessa."
- "Você vê cada passo do seu processo."
- "Compliance LGPD + OAB no DNA."

---

## 7. Iconografia

- **Estilo:** linear, peso 1.5, cantos arredondados levemente.
- **Biblioteca padrão:** `lucide-react` (já usado no FattoCRM base).
- **Tamanho default:** 24px.
- **Cor padrão:** `--md-gold` em fundo escuro, `--md-navy-deep` em fundo claro.

Ícones canônicos por serviço:
- Limpa Nome → `shield-check`
- BACEN → `landmark`
- Rating Bancário → `trending-up`
- Rating Comercial → `briefcase`
- Acompanhamento → `clipboard-list`
- Documentos → `file-text`
- Advogado responsável → `scale` ou `gavel`

---

## 8. Fotografia e imagem

### Jornada visual canônica (DOR → SOLUÇÃO → REALIZAÇÃO)

Toda LP segue essa progressão:

**Bloco 1 — DOR (hero/abertura):**
- Pessoa olhando boleto vencido com expressão preocupada
- Tela de celular mostrando "crédito negado"
- Pessoa cabisbaixa em mesa de cozinha à noite
- Mãos esfregando o rosto em sinal de cansaço financeiro
- Documentos vencidos espalhados
- **Sentimento:** angústia, isolamento, vergonha — mas com luz suave (não desespero gritante)

**Bloco 2 — TRANSIÇÃO (meio da LP):**
- Pessoa abrindo notebook num escritório limpo (decisão de buscar ajuda)
- Cliente sentado em frente ao advogado (consulta)
- Mãos assinando documento
- Conversa por videochamada com profissional
- **Sentimento:** alívio inicial, esperança, confiança crescendo

**Bloco 3 — REALIZAÇÃO (final/CTA):**
- **Aperto de mão** entre cliente e advogado (canônica)
- Sorriso genuíno olhando celular (consulta crédito aprovada)
- Família reunida em momento leve (sem festa exagerada — leveza cotidiana)
- Pessoa caminhando na rua com postura ereta, sol suave
- Mãos guardando carteira nova / cartão de crédito
- **Sentimento:** dignidade restaurada, leveza, futuro aberto

### Diretrizes

- **Nada estático sem vida.** Sempre pessoas reais em ação.
- **Iluminação natural** (não estúdio frio).
- **Diversidade real BR** — fenótipos, idades 25-65, classe C/B.
- **Roupa cotidiana** (não terno-engravatado, não traje formal — gente comum).
- **Sem stock óbvio.** Evitar fotos batidas (handshake corporativo genérico).

### Produção
- **Sprint 1:** placeholders Unsplash com IDs específicos (lista em `Brand/imagens-referencia/`)
- **Sprint 2+:** produção via fal.ai (Flux/Ideogram) com Claude rewriter + brand-refs, OU contratação de fotógrafo BR pra ensaio dedicado (recomendado pra autenticidade)

---

## 9. Aplicações

### Landing pages
- Hero com paleta primária (navy deep + paper + gold)
- Fundo escuro hero, transição pra paper nas seções
- CTAs success-green (consultoria) e wa-green (WhatsApp)
- Disclaimer OAB no rodapé (advogado responsável + OAB + dispensa de garantia)

### Email
- Header com wordmark MD em navy
- Corpo em paper background, texto navy-deep/gray-700
- CTA em success-green
- Assinatura: nome do advogado + OAB + telefone + selo dourado discreto

### Dashboard do cliente (Sprint 5)
- Tema claro padrão (paper) — sensação documento jurídico
- Toggle pra dark mode (navy-deep)
- Timeline do processo com nós dourados (marcos) e linhas navy
- Status verdes/amarelos/vermelhos para etapas

### Social media
- Posts feed: 1080x1350 (vertical), paper background ou navy deep, headline Fraunces grande
- Stories: 1080x1920, vídeo curto com legenda em Fraunces
- Reels: tom empático na voz, autoridade no recurso visual

### Contratos e documentos jurídicos
- Papel timbrado: wordmark + linha dourada superior + OAB rodapé
- Fonte Fraunces no título da peça, Inter no corpo
- Margens generosas (sensação documento formal)

### Assinatura email padrão
```
Dr(a). [Nome]
OAB/[UF] [número]
MD Assessoria e Consultoria
limpanomemd.com.br · (XX) XXXXX-XXXX
[selo dourado]
```

---

## 10. O que NÃO fazer

- ❌ Usar logo do FattoCRM ou Fatto Crédito (marca diferente)
- ❌ Usar emoji em peças formais (LP/email/contrato). OK em chat WhatsApp moderado.
- ❌ Promessa de resultado em qualquer copy
- ❌ Stock photo de handshake corporativo genérico
- ❌ Cores vibrantes além da paleta canônica
- ❌ Vermelho como cor de marca (só sinalização)
- ❌ Fraunces no corpo de texto (cansa leitura)
- ❌ Inter em headlines hero (perde autoridade)
- ❌ Logo distorcido, com efeito, ou em cor não canônica

---

**Última atualização:** 2026-05-20 — v1.0 inicial. Logo aguardando arquivo oficial do cliente.
