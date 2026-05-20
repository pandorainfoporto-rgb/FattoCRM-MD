import { Landmark, FileSearch, AlertTriangle, ShieldCheck, Building2 } from "lucide-react";
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
  title: "BACEN / SCR / Registrato — Contestação de registros junto ao Banco Central",
  description:
    "Análise e contestação de registros no Sistema de Informações de Créditos (SCR) do BACEN via Registrato. Dívidas indevidas, valores incorretos, prescrição. Conformidade Resolução 4.571/2017.",
};

export default function BacenPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <Hero
          eyebrow="Serviço · BACEN / SCR / Registrato"
          headline="Você pediu o Registrato e descobriu dívidas que não reconhece?"
          highlightWord="dívidas"
          subhead="O Sistema de Informações de Créditos (SCR) do BACEN registra suas operações de crédito junto a instituições financeiras. Quando há divergência, a contestação tem rito próprio e prazo. Análise jurídica gratuita."
          whatsappMessage={whatsappMessages.bacen}
          imageSlotId="bacen-dor"
          imageDescription="Pessoa olhando tela do computador com extrato BACEN aberto, expressão de espanto contido. Ambiente de home office. (DOR)"
        />

        <TrustBar />

        <Section
          eyebrow="O que é"
          title="SCR do BACEN — o registro que poucos sabem que existe."
          subtitle="Diferente do Serasa/SPC, o SCR é mantido pelo próprio Banco Central. Bancos consultam ele antes de conceder crédito. Um registro errado aqui pode fechar todas as portas — sem você saber que existe."
          variant="paper"
        >
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-lg bg-white p-8 shadow-md-card">
              <Landmark className="h-10 w-10 text-md-gold" strokeWidth={1.5} />
              <h3 className="mt-6 font-display text-xl font-semibold text-md-navy-deep">
                O que é o SCR
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-md-gray-700">
                Sistema de Informações de Créditos do BACEN. Cadastra operações
                de crédito (empréstimos, financiamentos, cartões, garantias) feitas
                com bancos, financeiras, cooperativas. Regulado pela Resolução
                4.571/2017 do Conselho Monetário Nacional.
              </p>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-md-card">
              <FileSearch className="h-10 w-10 text-md-gold" strokeWidth={1.5} />
              <h3 className="mt-6 font-display text-xl font-semibold text-md-navy-deep">
                O que é o Registrato
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-md-gray-700">
                Portal do BACEN onde qualquer cidadão consulta seus próprios
                registros: SCR (créditos), CCS (contas em bancos), Câmbio,
                outros. Acesso gratuito via gov.br. É de lá que vem o relatório
                que analisamos.
              </p>
            </div>
          </div>
        </Section>

        <Section
          eyebrow="Quando contestar"
          title="Casos típicos no SCR."
          variant="white"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: AlertTriangle,
                title: "Operação que você não reconhece",
                text: "Empréstimo, financiamento ou cartão registrado em seu nome sem que você tenha contratado. Possível fraude — exige notificação imediata ao banco e contestação no SCR.",
              },
              {
                icon: AlertTriangle,
                title: "Valor divergente",
                text: "Valor do saldo devedor incompatível com o real. Pode ser erro de classificação de risco (que afeta seu score) ou de saldo (que afeta seu poder de crédito).",
              },
              {
                icon: AlertTriangle,
                title: "Operação quitada não baixada",
                text: "Você pagou, mas o banco não atualizou no SCR. Continua aparecendo como dívida ativa, prejudicando análises futuras.",
              },
              {
                icon: AlertTriangle,
                title: "Classificação H (prejuízo) indevida",
                text: "Operação foi classificada como 'prejuízo' (rating H) mesmo havendo discussão judicial ou acordo. Trava completamente a tomada de novo crédito.",
              },
              {
                icon: AlertTriangle,
                title: "Coobrigação que não existe",
                text: "Você consta como avalista, fiador ou coobrigado em operação que não assinou. Pode ser erro de cadastro ou uso indevido de dado.",
              },
              {
                icon: ShieldCheck,
                title: "Prescrição",
                text: "Operações com inadimplência muito antiga podem ter ultrapassado o prazo de manutenção no SCR. Há regra específica do CMN para essa hipótese.",
              },
            ].map(({ icon: Icon, title, text }, i) => (
              <div key={i} className="rounded-lg border border-md-gray-200 bg-md-paper p-6">
                <Icon className="h-7 w-7 text-md-gold" strokeWidth={1.5} />
                <h3 className="mt-4 font-display text-lg font-semibold text-md-navy-deep">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-md-gray-700">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="Processo"
          title="O caminho da contestação no BACEN."
          variant="paper"
        >
          <ProcessTimeline
            steps={[
              {
                numero: "01",
                titulo: "Coleta do Registrato",
                descricao:
                  "Você baixa o relatório SCR completo no portal Registrato (gov.br). Nós orientamos como pegar a versão detalhada que precisamos pra análise.",
              },
              {
                numero: "02",
                titulo: "Identificação das divergências",
                descricao:
                  "O advogado responsável faz leitura técnica do relatório e identifica registros passíveis de contestação, classificando por gravidade e estratégia.",
              },
              {
                numero: "03",
                titulo: "Notificação à instituição",
                descricao:
                  "Toda contestação começa com pedido formal de revisão à instituição financeira responsável. Ela tem prazo regulatório para responder.",
              },
              {
                numero: "04",
                titulo: "Escalonamento (BACEN / judicial)",
                descricao:
                  "Se o banco não retificar, escalamos ao próprio BACEN via canal de denúncia formal, e em paralelo avaliamos ação judicial quando cabível.",
              },
            ]}
          />

          <div className="mt-16 flex justify-center">
            <CtaWhatsapp
              message={whatsappMessages.bacen}
              label="Quero analisar meu Registrato"
              size="lg"
            />
          </div>
        </Section>

        <Section
          eyebrow="Esclarecimentos"
          title="Perguntas sobre BACEN/SCR."
          variant="white"
        >
          <div className="mx-auto max-w-3xl">
            <Faq
              items={[
                {
                  pergunta: "O SCR é a mesma coisa que Serasa?",
                  resposta:
                    "Não. O SCR é mantido pelo Banco Central e registra operações de crédito (empréstimo, cartão, financiamento). O Serasa/SPC/Boa Vista são birôs privados que registram inadimplências comerciais e bancárias mais amplas. Bancos consultam os dois — e um problema em qualquer um trava crédito.",
                },
                {
                  pergunta: "Como pego meu Registrato?",
                  resposta:
                    "Pelo portal Registrato (registrato.bcb.gov.br) com login gov.br nível prata ou ouro. É gratuito. Recomendamos a opção 'SCR — Relatório Detalhado'. Se tiver dificuldade, orientamos passo a passo no WhatsApp.",
                },
                {
                  pergunta: "Quanto tempo demora a contestação?",
                  resposta:
                    "Notificação à instituição: 30-90 dias. Escalonamento ao BACEN: mais 30-60 dias. Via judicial: 6-18 meses. Cada etapa é decidida em conjunto com você, com base no parecer do advogado.",
                },
                {
                  pergunta: "O BACEN apaga o registro automaticamente quando contesto?",
                  resposta:
                    "Não. O BACEN é regulador — não é parte da operação. A retificação tem que vir da própria instituição financeira que cadastrou o registro. O BACEN intervém em caso de descumprimento regulatório.",
                },
                {
                  pergunta: "Posso pedir dano moral por registro incorreto no SCR?",
                  resposta:
                    "Sim, quando há prejuízo concreto (crédito negado, financiamento perdido, etc.) e fundamentação técnica. O STJ reconhece essa hipótese, embora seja terreno menos consolidado que Serasa. Avaliamos caso a caso.",
                },
                {
                  pergunta: "E se for fraude de identidade?",
                  resposta:
                    "Caso clássico de exclusão obrigatória. Notificação imediata à instituição, registro de B.O., e exigência de baixa no SCR. Em paralelo, acionamento da instituição por danos morais e materiais. Resolução 4.571/2017 e CDC se aplicam.",
                },
              ]}
            />
          </div>
        </Section>

        <Section variant="navy" className="text-center">
          <div className="mx-auto max-w-2xl">
            <Building2 className="mx-auto h-12 w-12 text-md-gold" strokeWidth={1.5} />
            <h2 className="mt-6 font-display text-h1 font-semibold text-md-paper">
              Vamos ler seu Registrato juntos?
            </h2>
            <p className="mt-4 text-body-lg text-md-paper/80">
              Em até 48h úteis o advogado responsável emite parecer indicando o
              que pode ser contestado e qual o caminho recomendado.
            </p>
            <div className="mt-10 flex justify-center">
              <CtaWhatsapp
                message={whatsappMessages.bacen}
                label="Enviar Registrato pelo WhatsApp"
                size="lg"
              />
            </div>
          </div>
        </Section>
      </main>

      <SiteFooter />
      <FloatingWhatsapp message={whatsappMessages.bacen} />
    </>
  );
}
