// Mapa de imagens por slotId. Fonte atual: Unsplash (curadoria 2026-05-20).
// Licença Unsplash permite uso comercial sem atribuição obrigatória.
// Créditos e IDs documentados em Brand/imagens-referencia/README.md.
//
// Pra trocar por imagem própria: subir arquivo em apps/lp/public/images/
// e mudar a `url` aqui pra "/images/nome.jpg". Nada mais muda.

export type SlotImage = {
  url: string;
  alt: string;
};

const U = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`;

export const slotImages: Record<string, SlotImage> = {
  // DOR
  "hero-institucional": {
    url: U("photo-1758523418820-a492bf647c63"),
    alt: "Casal preocupado revisando contas e boletos vencidos à mesa de casa",
  },
  "limpa-nome-dor": {
    url: U("photo-1758611971935-331135af686d"),
    alt: "Homem cansado diante do computador lidando com cobranças e dívidas",
  },
  "bacen-dor": {
    url: U("photo-1758876019043-cedb0b6f56ea"),
    alt: "Pessoa preocupada analisando informações financeiras no computador",
  },
  "rating-dor": {
    url: U("photo-1700190614797-1054d4c8996e"),
    alt: "Homem desanimado diante do laptop após ter o crédito negado",
  },

  // TRANSIÇÃO
  "advogado-mesa": {
    url: U("photo-1614605844432-731c32334c49"),
    alt: "Advogada analisando documentos jurídicos sobre a mesa do escritório",
  },
  "limpa-nome-consulta": {
    url: U("photo-1758520144427-ddb02ac74e9d"),
    alt: "Cliente e advogada apertando as mãos em reunião de consultoria",
  },

  // REALIZAÇÃO
  "realizacao-handshake": {
    url: U("photo-1758691031979-6128d4029604"),
    alt: "Aperto de mãos entre cliente e advogado fechando acordo no escritório",
  },
  "realizacao-sorriso": {
    url: U("photo-1714482128431-617b379f69bd"),
    alt: "Mulher sorrindo aliviada ao ver uma boa notícia no celular",
  },
  "realizacao-caminhada": {
    url: U("photo-1693891320020-366cb3c9e6d7"),
    alt: "Pessoa caminhando confiante por uma rua da cidade ao entardecer",
  },
};
