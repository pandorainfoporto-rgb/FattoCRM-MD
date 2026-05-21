# Imagens — referência e briefing de produção

> Slots referenciados em `apps/lp/src/components/site/image-slot.tsx` (`data-slot=`).
> Cada slot é placeholder visual com gradient. Substituir por `<Image>` (next/image) quando arte chegar.

## Filosofia visual

**Jornada DOR → TRANSIÇÃO → REALIZAÇÃO.** Ver `Brand/BRANDBOOK.md` §8.

- **Nada estático sem vida.** Sempre pessoas em ação ou estado emocional verdadeiro.
- **Iluminação natural.** Não estúdio frio. Sombras suaves, luz contextual.
- **Diversidade real BR.** Fenótipos, idades 25-65, classe C/B. Roupa cotidiana.
- **Sem stock óbvio.** Evitar fotos batidas (handshake corporativo genérico, mulher sorrindo pra notebook).

## Imagens em produção (Unsplash — curadoria 2026-05-20)

Mapeadas em `apps/lp/src/lib/images.ts`. Licença Unsplash (uso comercial, sem atribuição obrigatória). Pra trocar por arte própria: subir em `apps/lp/public/images/` e editar a `url` no `lib/images.ts`.

| slotId | Unsplash ID | Cena |
|---|---|---|
| `hero-institucional` | `photo-1758523418820-a492bf647c63` | Casal preocupado com boletos à mesa (DOR) |
| `limpa-nome-dor` | `photo-1758611971935-331135af686d` | Homem cansado diante do computador (DOR) |
| `bacen-dor` | `photo-1758876019043-cedb0b6f56ea` | Pessoa preocupada analisando finanças (DOR) |
| `rating-dor` | `photo-1700190614797-1054d4c8996e` | Homem desanimado, crédito negado (DOR) |
| `advogado-mesa` | `photo-1614605844432-731c32334c49` | Advogada analisando documentos (TRANSIÇÃO) |
| `limpa-nome-consulta` | `photo-1758520144427-ddb02ac74e9d` | Cliente e advogada apertando mãos (TRANSIÇÃO) |
| `realizacao-handshake` | `photo-1758691031979-6128d4029604` | Aperto de mãos fechando acordo (REALIZAÇÃO) |
| `realizacao-sorriso` | `photo-1714482128431-617b379f69bd` | Mulher sorrindo aliviada no celular (REALIZAÇÃO) |
| `realizacao-caminhada` | `photo-1693891320020-366cb3c9e6d7` | Pessoa caminhando confiante na cidade (REALIZAÇÃO) |

> Substitutos futuros (qualidade > Unsplash): ensaio fotográfico BR dedicado ou geração IA (fal.ai) com brand-refs. Slots de DOR usam fotos de estresse genérico — trocar por cenas mais específicas BR fortalece a conversão.

## Slots originais (briefing — descrição-alvo)

| slotId | Página | Tom | Descrição |
|---|---|---|---|
| `hero-institucional` | `/` (hero) | DOR | Pessoa em mesa de cozinha à noite, boleto vencido na mão, expressão preocupada contida. Luz amarelada de luminária. Não desespero — angústia silenciosa. |
| `advogado-mesa` | `/` (por que MD) | TRANSIÇÃO | Advogado(a) e cliente lado a lado em mesa de escritório examinando documento. Luz natural lateral. Cliente atento, advogado concentrado. |
| `realizacao-handshake` | `/` (realização) | REALIZAÇÃO | Aperto de mão entre cliente e advogado, escritório claro. Sorriso contido de alívio (não festa). Ambiente sóbrio. |
| `realizacao-sorriso` | `/` (realização) | REALIZAÇÃO | Pessoa de 40-50 anos olhando celular com sorriso genuíno e leve, à mesa em casa. Luz da manhã. |
| `realizacao-caminhada` | `/` (realização) | REALIZAÇÃO | Pessoa caminhando em rua urbana, postura ereta, luz do fim da tarde, expressão tranquila. Sem celebração — só dignidade. |
| `limpa-nome-dor` | `/limpa-nome` (hero) | DOR | Pessoa em mesa de cozinha à noite olhando carta de cobrança, expressão de cansaço. Mãos com a carta, pouca luz, café frio na mesa. |
| `limpa-nome-consulta` | `/limpa-nome` (transição) | TRANSIÇÃO | Cliente consultando advogado em escritório, ambos olhando documento. Luz natural. Cliente fazendo pergunta, advogado escutando com atenção. |
| `bacen-dor` | `/bacen` (hero) | DOR | Pessoa em home office, tela do computador mostrando relatório do Registrato/BACEN. Expressão de espanto contido. Mão na testa. |
| `rating-dor` | `/rating-bancario` (hero) | DOR | Celular na mão mostrando "crédito negado" ou tela de score baixo. Ambiente em penumbra. Foco no celular, rosto desfocado. |

## Briefing de produção (3 opções)

### A. Banco de imagens (rápido, baixo custo)
Buscar em Unsplash / Pexels / Pixabay com queries:

- `worried man at kitchen table at night bills`
- `lawyer client consultation desk natural light`
- `handshake lawyer client office`
- `brazilian woman smile relief phone`
- `walking street evening light brazil`
- `home office computer screen worry`

Curadoria deve evitar fotos batidas (handshake corporativo, mulher genérica de headset). Priorizar autenticidade BR.

### B. Geração IA (médio custo, alta consistência)
Stack: **fal.ai Flux Pro 1.1** + brand-refs + Claude rewriter (padrão `marketing pipeline v2` — ver memória).

Prompts (template a refinar):
```
Brazilian {age} year old {gender}, sitting at kitchen table at night,
holding a paper bill, soft warm lamp light, expression of quiet worry not despair,
natural skin texture, photorealistic, 35mm film grain, shallow depth of field,
documentary style, no smile, contemplative
```

Para REALIZAÇÃO trocar pra:
```
…light morning sun, slight relieved smile, looking at phone showing approved credit,
dignified posture, photorealistic, documentary…
```

Brand-refs: fotos previamente curadas que definem o "look" MD (paleta sóbria, luz natural, sem estética stock).

### C. Ensaio fotográfico dedicado (alto custo, máxima autenticidade) — RECOMENDADO
Contratar fotógrafo BR pra ensaio de 1 dia com:
- 3-4 atores reais (não modelos)
- 2 cenários: casa (cozinha + sala) + escritório do advogado
- Direção emocional pelo BRANDBOOK
- Entregáveis: 30-40 fotos editadas em alta + 5 selecionadas pra LP

Custo estimado: R$ 3-8k. Permite reuso em social, ads, materiais offline.

## Especificações técnicas

- **Hero:** 1600×2000px (4:5 portrait), JPEG quality 85, peso < 200KB com next/image
- **Cards 3:4:** 1200×1500px
- **Square (realização):** 1200×1200px
- **Formato:** JPEG progressivo OU WebP. AVIF se Vercel suportar bem.
- **Color profile:** sRGB
- **Acessibilidade:** sempre passar `alt` descritivo no `<Image alt=...>` (não decorativo)

## Quando substituir os placeholders

No componente `<ImageSlot slotId="X" />` trocar por:

```tsx
import Image from "next/image";

<Image
  src="/images/hero-institucional.jpg"
  alt="Pessoa em mesa de cozinha olhando boleto vencido"
  width={1600}
  height={2000}
  priority   // só no hero
  className="rounded-lg shadow-md-card-lg object-cover aspect-[4/5]"
/>
```

Colocar imagens em `apps/lp/public/images/`.

## Slots futuros (Sprint 2-5)

- `dashboard-cliente-mockup` — preview do painel de acompanhamento
- `processo-bacen-timeline` — diagrama explicativo
- `cases-grid` — depoimentos com foto (apenas com autorização escrita do cliente — exigência OAB)
- `advogado-foto-profissional` — foto institucional do advogado responsável

---

**Última atualização:** 2026-05-20. Atualizar quando imagens forem produzidas.
