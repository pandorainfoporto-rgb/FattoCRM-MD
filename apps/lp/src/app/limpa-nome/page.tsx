import { ShieldCheck, AlertCircle, ScrollText, Gavel } from "lucide-react";
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
  title: "Limpa Nome — Contestação jurídica de negativações SPC, Serasa e Boa Vista",
  description:
    "Análise jurídica gratuita de negativação. Contestação de inscrições irregulares no SPC, Serasa e Boa Vista. CDC art. 43, Súmula 385 STJ, prescrição quinquenal. Sem promessa, com fundamentação.",
};

export default function LimpaNomePage() {
  return (
    <>
      <SiteHeader />

      <main>
        <Hero
          eyebrow="Serviço · Limpa Nome"
          headline="Seu nome foi negativado de forma irregular? A lei está do seu lado."
          highlightWord="lei"
          subhead="Contestamos inscrições no SPC, Serasa e Boa Vista quando há fundamento jurídico — inclusão indevida, dívida prescrita, valor incorreto, ausência de notificação prévia. Análise gratuita em até 48h úteis."
          whatsappMessage={whatsappMessages.limpaNome}
          imageSlotId="limpa-nome-dor"
          imageDescription="Pessoa em mesa de cozinha à noite olhando carta de cobrança, expressão de cansaço. Iluminação amarelada baixa. (DOR)"
        />

        <TrustBar />

        <Section
          eyebrow="O que estamos vendo"
          title="A negativação pesa. Mas nem toda é regular."
          subtitle="Existem hipóteses específicas em que a inscrição em cadastro restritivo pode ser contestada juridicamente. A análise técnica identifica qual se aplica ao seu caso — antes de qualquer promessa."
          variant="paper"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: AlertCircle,
                title: "Inscrição sem notificação prévia",
                text: "O CDC (art. 43, §2º) exige notificação por escrito antes da inscrição. A ausência dela é causa típica de contestação e, em alguns casos, indenização por dano moral.",
              },
              {
                icon: ScrollText,
                title: "Dívida prescrita",
                text: "Dívidas têm prazo prescricional (geralmente 5 anos para cobrança em cadastros). Após esse período, a manutenção da inscrição é irregular.",
              },
              {
                icon: AlertCircle,
                title: "Valor incorreto ou inflado",
                text: "Quando há cobrança de juros abusivos, multas indevidas ou valor que não corresponde ao débito original, a inscrição pode ser questionada.",
              },
              {
                icon: AlertCircle,
                title: "Dívida quitada ou negociada",
                text: "Pagou ou renegociou mas a inscrição permanece? Caso clássico de contestação imediata com pedido de indenização.",
              },
              {
                icon: AlertCircle,
                title: "Fraude / identidade",
                text: "Inscrição decorrente de fraude (uso indevido de CPF, abertura de conta falsa) é causa de exclusão obrigatória e responsabilização da instituição.",
              },
              {
                icon: ShieldCheck,
                title: "Súmula 385 STJ",
                text: "Mesmo com inscrição preexistente, novas inscrições irregulares geram dano moral autônomo. Cada caso é avaliado individualmente.",
              },
            ].map(({ icon: Icon, title, text }, i) => (
              <div key={i} className="rounded-lg border border-md-gray-200 bg-white p-6">
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

          <p className="mt-12 text-center text-sm italic text-md-gray-400">
            Lista não exaustiva. Outras hipóteses são avaliadas caso a caso na análise jurídica.
          </p>
        </Section>

        <Section
          eyebrow="Da dor à decisão"
          title="O que muda quando você é atendido por advogado."
          variant="white"
        >
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <div className="rounded-lg border-l-4 border-md-danger bg-md-danger/5 p-6">
                <h4 className="font-display text-base font-semibold text-md-danger">
                  Sem advogado
                </h4>
                <p className="mt-2 text-sm text-md-gray-700">
                  Você liga pra credora, eles dizem "tem que pagar tudo".
                  Negocia desconto sem saber se a dívida é exigível. Paga,
                  fica registrado como devedor, perde direito de contestar.
                </p>
              </div>

              <div className="rounded-lg border-l-4 border-md-success bg-md-success/5 p-6">
                <h4 className="font-display text-base font-semibold text-md-success">
                  Com advogado
                </h4>
                <p className="mt-2 text-sm text-md-gray-700">
                  Análise técnica: a dívida é exigível? A inscrição é regular?
                  Houve notificação? Há prescrição? Só depois disso decidimos
                  juntos a estratégia — contestação, negociação, ou ação
                  judicial com pedido de dano moral.
                </p>
              </div>
            </div>

            <ImageSlot
              slotId="limpa-nome-consulta"
              description="Cliente consultando advogado em ambiente formal de escritório, ambos olhando documento na mesa, luz natural. (TRANSIÇÃO)"
              tone="transicao"
              aspect="aspect-[4/5]"
            />
          </div>
        </Section>

        <Section
          eyebrow="Processo"
          title="Como funciona, etapa por etapa."
          variant="paper"
        >
          <ProcessTimeline
            steps={[
              {
                numero: "01",
                titulo: "Análise gratuita",
                descricao:
                  "Você nos envia o extrato Serasa/SPC e documentação básica. Em até 48h úteis o advogado responsável avalia se há fundamento jurídico.",
              },
              {
                numero: "02",
                titulo: "Parecer técnico",
                descricao:
                  "Recebe relatório indicando: tipo de inscrição, fundamentação aplicável, estratégia recomendada (extrajudicial ou judicial) e prazo estimado.",
              },
              {
                numero: "03",
                titulo: "Contrato e procuração",
                descricao:
                  "Decidindo prosseguir, assinatura eletrônica do contrato de honorários com valores claros, e da procuração para representação.",
              },
              {
                numero: "04",
                titulo: "Execução e acompanhamento",
                descricao:
                  "Notificações, contestações e (se aplicável) ação judicial. Você acompanha cada passo no painel do cliente — sem print por WhatsApp.",
              },
            ]}
          />

          <div className="mt-16 flex justify-center">
            <CtaWhatsapp
              message={whatsappMessages.limpaNome}
              label="Pedir análise jurídica gratuita"
              size="lg"
            />
          </div>
        </Section>

        <Section
          eyebrow="Esclarecimentos"
          title="Perguntas frequentes sobre Limpa Nome."
          variant="white"
        >
          <div className="mx-auto max-w-3xl">
            <Faq
              items={[
                {
                  pergunta: "Existe garantia de que o nome será limpo?",
                  resposta:
                    "Não. Garantia de resultado é vedada pela OAB. O que oferecemos é análise técnica, fundamentação jurídica e representação séria. Em muitos casos a contestação é vitoriosa; em outros não há fundamento e dizemos isso honestamente.",
                },
                {
                  pergunta: "Quanto tempo leva?",
                  resposta:
                    "Via extrajudicial: 15-60 dias após notificação à instituição. Via judicial: 3-12 meses, dependendo da comarca e complexidade. A análise inicial estima o prazo realista do seu caso específico.",
                },
                {
                  pergunta: "Posso pedir dano moral?",
                  resposta:
                    "Sim, quando há fundamentação. Inscrição irregular, ausência de notificação prévia, manutenção após pagamento — todas são causas reconhecidas pelo STJ para indenização. O valor varia caso a caso e é definido pelo juízo.",
                },
                {
                  pergunta: "Se eu tiver várias dívidas, vocês cuidam de todas?",
                  resposta:
                    "Sim — cada inscrição é analisada separadamente. Algumas podem ser contestadas, outras negociadas, outras simplesmente aguardam prescrição. A estratégia é montada caso a caso e você decide o escopo.",
                },
                {
                  pergunta: "E a Súmula 385 do STJ? Isso me impede de pedir indenização?",
                  resposta:
                    "Não necessariamente. A Súmula 385 diz que inscrição preexistente afasta dano moral 'desde que não cancelada'. Mas se a nova inscrição for irregular E houver discussão judicial sobre a primeira, a tese evolui. Analisamos caso a caso.",
                },
                {
                  pergunta: "Vocês cobram antes da análise?",
                  resposta:
                    "Não. A análise inicial é gratuita. Honorário só é discutido após o parecer técnico, com contrato escrito e valores claros antes de qualquer pagamento.",
                },
              ]}
            />
          </div>
        </Section>

        <Section variant="navy" className="text-center">
          <div className="mx-auto max-w-2xl">
            <Gavel className="mx-auto h-12 w-12 text-md-gold" strokeWidth={1.5} />
            <h2 className="mt-6 font-display text-h1 font-semibold text-md-paper">
              Comece pela análise. Sem compromisso.
            </h2>
            <p className="mt-4 text-body-lg text-md-paper/80">
              Envie pelo WhatsApp seu extrato Serasa/SPC. Em até 48h úteis você
              recebe o parecer técnico do advogado responsável.
            </p>
            <div className="mt-10 flex justify-center">
              <CtaWhatsapp
                message={whatsappMessages.limpaNome}
                label="Enviar pelo WhatsApp"
                size="lg"
              />
            </div>
          </div>
        </Section>
      </main>

      <SiteFooter />
      <FloatingWhatsapp message={whatsappMessages.limpaNome} />
    </>
  );
}
