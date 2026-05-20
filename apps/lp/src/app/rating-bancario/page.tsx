import { TrendingUp, Briefcase, BarChart3, ArrowUpRight, AlertCircle } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { FloatingWhatsapp, CtaWhatsapp } from "@/components/site/cta-whatsapp";
import { Hero } from "@/components/site/hero";
import { Section } from "@/components/site/section";
import { ProcessTimeline } from "@/components/site/process-timeline";
import { Faq } from "@/components/site/faq";
import { TrustBar } from "@/components/site/trust-bar";
import { ImageSlot } from "@/components/site/image-slot";
import { whatsappMessages } from "@/lib/contact";

export const metadata = {
  title: "Rating Bancário e Comercial — Estratégia jurídica para reabertura de crédito",
  description:
    "Recuperação de score Serasa, Quod, Boa Vista e SCR/BACEN. Atuação na origem dos apontamentos. Pessoa física (rating bancário) e pessoa jurídica (rating comercial). Sem milagre — com fundamento.",
};

export default function RatingBancarioPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <Hero
          eyebrow="Serviço · Rating bancário e comercial"
          headline="Score zerado fecha porta. Recuperá-lo é processo, não milagre."
          highlightWord="processo"
          subhead="Estratégia jurídica em camadas para reabilitar seu rating bancário (pessoa física) ou comercial (pessoa jurídica). Atuamos na origem — negativações, SCR, dívidas indevidas — não na superfície. Sem produto de score por R$ 99."
          whatsappMessage={whatsappMessages.ratingBancario}
          imageSlotId="rating-dor"
          imageDescription="Tela de celular mostrando 'crédito negado' ou 'score baixo', mãos segurando, ambiente penumbra. (DOR)"
        />

        <TrustBar />

        <Section
          eyebrow="O problema real"
          title="O score não sobe sozinho. E quase nunca por produto vendido."
          subtitle="Score é resultado — não causa. Quem te oferece 'aumento de score em 30 dias por R$ 99' está vendendo placebo. Score só recupera quando você ataca o que o derrubou: negativações irregulares, registros antigos no SCR, dívidas com instituições financeiras, cobrança indevida."
          variant="paper"
        >
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                titulo: "O que NÃO recupera score",
                items: [
                  "Cadastro Positivo isolado",
                  "Plano de assinatura de score",
                  "Pagamento de boleto irrelevante",
                  "Empréstimo pequeno só pra 'movimentar'",
                ],
                tom: "danger" as const,
              },
              {
                titulo: "O que pode recuperar",
                items: [
                  "Exclusão de negativações irregulares",
                  "Contestação de SCR/BACEN incorreto",
                  "Negociação de dívidas com instituições",
                  "Tempo + comportamento financeiro saudável",
                ],
                tom: "success" as const,
              },
              {
                titulo: "O papel do advogado",
                items: [
                  "Análise jurídica dos apontamentos",
                  "Contestação fundamentada em CDC + jurisprudência",
                  "Ação judicial quando cabível (dano moral, exclusão)",
                  "Estratégia de longo prazo, não pacote rápido",
                ],
                tom: "gold" as const,
              },
            ].map((bloco, i) => (
              <div
                key={i}
                className={
                  "rounded-lg border bg-white p-6 " +
                  (bloco.tom === "danger"
                    ? "border-md-danger/30"
                    : bloco.tom === "success"
                      ? "border-md-success/30"
                      : "border-md-cyan/40")
                }
              >
                <h3
                  className={
                    "font-display text-lg font-semibold " +
                    (bloco.tom === "danger"
                      ? "text-md-danger"
                      : bloco.tom === "success"
                        ? "text-md-success"
                        : "text-md-cyan")
                  }
                >
                  {bloco.titulo}
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-md-gray-700">
                  {bloco.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span
                        className={
                          "mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full " +
                          (bloco.tom === "danger"
                            ? "bg-md-danger"
                            : bloco.tom === "success"
                              ? "bg-md-success"
                              : "bg-md-cyan")
                        }
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="comercial"
          eyebrow="Pessoa física vs Pessoa jurídica"
          title="Rating bancário e rating comercial — diferenças que importam."
          variant="white"
        >
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-lg border border-md-gray-200 bg-md-paper p-8">
              <TrendingUp className="h-10 w-10 text-md-cyan" strokeWidth={1.5} />
              <h3 className="mt-6 font-display text-h3 font-semibold text-md-navy-deep">
                Rating Bancário (PF)
              </h3>
              <p className="mt-3 text-sm text-md-gray-700">
                Pessoas físicas. Score Serasa, Quod, Boa Vista + classificação no
                SCR/BACEN. Afeta tomada de crédito pessoal, financiamento
                imobiliário, cartão, cheque especial.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-md-gray-700">
                <li className="flex items-start gap-2">
                  <ArrowUpRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-md-cyan" strokeWidth={1.5} />
                  <span>Diagnóstico Serasa + Boa Vista + Quod</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowUpRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-md-cyan" strokeWidth={1.5} />
                  <span>Leitura do Registrato (SCR/BACEN)</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowUpRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-md-cyan" strokeWidth={1.5} />
                  <span>Contestação de negativações + ação judicial</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowUpRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-md-cyan" strokeWidth={1.5} />
                  <span>Plano de comportamento financeiro pós-limpeza</span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-md-gray-200 bg-md-paper p-8">
              <Briefcase className="h-10 w-10 text-md-cyan" strokeWidth={1.5} />
              <h3 className="mt-6 font-display text-h3 font-semibold text-md-navy-deep">
                Rating Comercial (PJ)
              </h3>
              <p className="mt-3 text-sm text-md-gray-700">
                Pessoas jurídicas. Score Serasa Experian PJ, Quod PJ, Boa Vista
                CenPro + análise de comportamento corporativo. Afeta linhas de
                crédito empresarial, fornecedores B2B, fiança, factoring.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-md-gray-700">
                <li className="flex items-start gap-2">
                  <ArrowUpRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-md-cyan" strokeWidth={1.5} />
                  <span>Diagnóstico Serasa PJ + Boa Vista CenPro</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowUpRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-md-cyan" strokeWidth={1.5} />
                  <span>Análise de protestos, ações judiciais ativas</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowUpRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-md-cyan" strokeWidth={1.5} />
                  <span>Contestação + sustação de protesto</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowUpRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-md-cyan" strokeWidth={1.5} />
                  <span>Estratégia tributária + societária quando integrada</span>
                </li>
              </ul>
            </div>
          </div>
        </Section>

        <Section
          eyebrow="Processo"
          title="A engenharia da reabilitação de crédito."
          variant="paper"
        >
          <ProcessTimeline
            steps={[
              {
                numero: "01",
                titulo: "Diagnóstico completo",
                descricao:
                  "Levantamos extrato Serasa, Boa Vista, Quod, Registrato BACEN e (PJ) Cenprot/CenPro. Mapeamos todos os apontamentos e classificamos por origem.",
              },
              {
                numero: "02",
                titulo: "Parecer e estratégia",
                descricao:
                  "Identificamos quais apontamentos têm fundamento jurídico de contestação, quais exigem negociação, e quais aguardam prescrição. Você recebe relatório completo.",
              },
              {
                numero: "03",
                titulo: "Ação coordenada",
                descricao:
                  "Atuamos em frentes paralelas: contestação Serasa/Boa Vista, notificação ao BACEN/instituições, sustação de protesto, ação judicial quando cabível.",
              },
              {
                numero: "04",
                titulo: "Manutenção e blindagem",
                descricao:
                  "Pós-limpeza, orientação técnica sobre comportamento financeiro saudável + monitoramento periódico para evitar reincidência.",
              },
            ]}
          />

          <div className="mt-16 flex justify-center">
            <CtaWhatsapp
              message={whatsappMessages.ratingBancario}
              label="Diagnosticar meu rating"
              size="lg"
            />
          </div>
        </Section>

        <Section
          eyebrow="Comparativo"
          title="MD vs vendedores de score."
          variant="white"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-md-gray-200 text-xs uppercase tracking-wider text-md-gray-400">
                <tr>
                  <th className="px-4 py-3"></th>
                  <th className="px-4 py-3 text-center">Vendedor de pacote</th>
                  <th className="px-4 py-3 text-center text-md-cyan">MD Assessoria</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-md-gray-200">
                {[
                  ["Quem te atende", "Vendedor", "Advogado(a) OAB"],
                  ["O que oferece", "Pacote fixo", "Análise jurídica primeiro"],
                  ["Cobra antes de analisar?", "Sim", "Não"],
                  ["Garante resultado?", "Sim (irregular)", "Não (vedado OAB)"],
                  ["Atua em SCR/BACEN", "Não", "Sim"],
                  ["Ação judicial quando cabível", "Não", "Sim"],
                  ["Compliance OAB / LGPD", "Pouco claro", "Premissa"],
                  ["Painel de acompanhamento", "Não", "Sim"],
                ].map(([label, sem, com], i) => (
                  <tr key={i}>
                    <td className="px-4 py-4 font-medium text-md-navy-deep">{label}</td>
                    <td className="px-4 py-4 text-center text-md-gray-700">{sem}</td>
                    <td className="px-4 py-4 text-center font-medium text-md-success">{com}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section
          eyebrow="Esclarecimentos"
          title="Perguntas sobre rating."
          variant="paper"
        >
          <div className="mx-auto max-w-3xl">
            <Faq
              items={[
                {
                  pergunta: "Em quanto tempo meu score sobe?",
                  resposta:
                    "Não há fórmula. Score sobe quando os apontamentos que o derrubaram são removidos OU quando o tempo + comportamento financeiro saudável o reconstroem. Trabalhamos na primeira frente (jurídica) e orientamos a segunda (comportamental). Resultados visíveis costumam aparecer entre 60 e 180 dias após a limpeza.",
                },
                {
                  pergunta: "Vocês conseguem fazer meu score chegar a 800?",
                  resposta:
                    "Ninguém honesto pode prometer pontuação específica. O score depende de variáveis fora do nosso controle (histórico bancário, idade do CPF, score interno de cada birô). O que entregamos é a remoção fundamentada dos apontamentos negativos — o que abre caminho pro score subir.",
                },
                {
                  pergunta: "Cadastro Positivo ajuda?",
                  resposta:
                    "Sim, mas pouco se houver negativações ativas. O Cadastro Positivo agrega histórico de pagamento de contas (luz, água, telefone). Isso melhora o score em alguns pontos, mas não resolve o problema raiz se há SCR ruim ou Serasa negativado.",
                },
                {
                  pergunta: "Vocês atendem PJ (empresa)?",
                  resposta:
                    "Sim. Rating Comercial é uma frente própria. Analisamos Serasa Experian PJ, Boa Vista CenPro, protestos no Cenprot, e (quando aplicável) Score do sócio. Estratégia pode envolver sustação de protesto, reorganização tributária e jurídica.",
                },
                {
                  pergunta: "Quanto custa?",
                  resposta:
                    "Honorário depende do número de apontamentos, complexidade e frentes envolvidas. O diagnóstico inicial é gratuito. Honorário discutido após parecer, com contrato escrito e valores fixos ou parcelados. Sem cobrança antecipada.",
                },
                {
                  pergunta: "E se eu não tiver dinheiro pra processar agora?",
                  resposta:
                    "Algumas frentes (notificação extrajudicial, contestação direta nos birôs) têm custo baixo e podem ser priorizadas. Ação judicial pode ser parcelada. Em alguns casos, justiça gratuita é cabível. Discutimos sempre o que faz sentido para o seu momento.",
                },
              ]}
            />
          </div>
        </Section>

        <Section variant="navy" className="text-center">
          <div className="mx-auto max-w-2xl">
            <BarChart3 className="mx-auto h-12 w-12 text-md-cyan" strokeWidth={1.5} />
            <h2 className="mt-6 font-display text-h1 font-semibold text-md-paper">
              Vamos diagnosticar seu rating?
            </h2>
            <p className="mt-4 text-body-lg text-md-paper/80">
              Análise gratuita do seu Serasa, Boa Vista e Registrato. Parecer
              técnico em até 48h úteis, com estratégia recomendada.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <CtaWhatsapp
                message={whatsappMessages.ratingBancario}
                label="Diagnóstico PF (rating bancário)"
                size="lg"
              />
              <CtaWhatsapp
                message={whatsappMessages.ratingComercial}
                label="Diagnóstico PJ (rating comercial)"
                size="lg"
                variant="ghost-light"
              />
            </div>
          </div>
        </Section>
      </main>

      <SiteFooter />
      <FloatingWhatsapp message={whatsappMessages.ratingBancario} />
    </>
  );
}
