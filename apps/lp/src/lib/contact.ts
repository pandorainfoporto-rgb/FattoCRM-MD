// Config central de contato. Tudo plugado em env vars pra trocar sem mexer em código.
// Quando dados oficiais da MD chegarem, atualizar .env.local. Brand/00-NORTE.md lista as pendências.

export const contact = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://limpanomemd.com.br",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5500000000000",
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "(00) 00000-0000",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "contato@limpanomemd.com.br",
  oabResponsavel:
    process.env.NEXT_PUBLIC_OAB_RESPONSAVEL ?? "Dr(a). Nome — OAB/XX XXXXX",
  address: process.env.NEXT_PUBLIC_ADDRESS ?? "Endereço a confirmar",
  instagram:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ??
    "https://instagram.com/mdassessoriaeconsultoria",
} as const;

export function buildWhatsappUrl(message: string): string {
  const text = encodeURIComponent(message);
  return `https://wa.me/${contact.whatsappNumber}?text=${text}`;
}

// Mensagens pré-formatadas por serviço — cada CTA do site dispara uma diferente
// pra Marina (agente IA / atendente humana) já saber o contexto da entrada.
export const whatsappMessages = {
  institucional:
    "Olá! Vim pelo site da MD Assessoria. Quero entender melhor os serviços de vocês.",
  limpaNome:
    "Olá! Vim pelo site da MD e gostaria de uma análise jurídica sobre Limpa Nome (negativação Serasa/SPC).",
  bacen:
    "Olá! Vim pelo site da MD e preciso de orientação sobre registro no BACEN/Registrato/SCR.",
  ratingBancario:
    "Olá! Vim pelo site da MD e quero entender como melhorar meu rating bancário para reabertura de crédito.",
  ratingComercial:
    "Olá! Vim pelo site da MD e quero entender como recuperar meu rating comercial.",
} as const;
