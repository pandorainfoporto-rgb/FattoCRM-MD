import { ShieldCheck, Landmark, TrendingUp, Briefcase, Scale, FileCheck2 } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { FloatingWhatsapp, CtaWhatsapp } from "@/components/site/cta-whatsapp";
import { Hero } from "@/components/site/hero";
import { Section } from "@/components/site/section";
import { ServiceCard } from "@/components/site/service-card";
import { ProcessTimeline } from "@/components/site/process-timeline";
import { Faq } from "@/components/site/faq";
import { TrustBar } from "@/components/site/trust-bar";
import { ImageSlot } from "@/components/site/image-slot";
import { Reveal } from "@/components/site/reveal";
import { whatsappMessages } from "@/lib/contact";

export const metadata = {
  title: "MD Assessoria — Limpa Nome, BACEN, Rating Bancário e Comercial",
  description:
    "Escritório-tecnologia em recuperação de crédito. Limpa Nome, contestação BACEN/SCR, rating bancário e comercial. Análise jurídica antes da promessa. Compliance OAB e LGPD no DNA.",
};

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main>
        <Hero
          eyebrow="Escritório-tecnologia · MD Assessoria"
          headline="Quando o banco fechou a porta, o direito ainda tem uma chave."
          highlightWord="chave"
          subhead="Recuperação de crédito feita por advogados, com transparência em cada passo do processo. Limpa Nome, contestação BACEN, rating bancário e comercial — fundamentados em lei, sem promessa de resultado."
          whatsappMessage={whatsappMessages.institucional}
          imageSlotId="hero-institucional"
          imageDescription="Pessoa olhando boleto vencido em mesa de cozinha à noite — preocupação contida, luz suave. (DOR)"
        />

        <TrustBar />

        {/* Faixa de credibilidade — órgãos de crédito */}
        <div className="border-b border-md-gray-200 bg-white py-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-md-gray-400">
              Atuamos junto aos principais cadastros de crédito do país
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-12">
              {["Serasa", "SPC Brasil", "Boa Vista", "BACEN / SCR", "Quod", "Registrato"].map(
                (orgao) => (
                  <span
                    key={orgao}
                    className="font-display text-lg font-semibold text-md-navy-deep/40 transition hover:text-md-navy-deep/70"
                  >
                    {orgao}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        <Section
          id="servicos"
          eyebrow="O que fazemos"
          title="Quatro frentes. Um único método."
          subtitle="Cada caso começa com análise jurídica gratuita. Só depois disso falamos sobre escopo e honorário. Sem pacote fechado vendido por telefone, sem promessa antes da análise."
          align="center"
          variant="paper"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Reveal delay={0}>
              <ServiceCard
                icon={ShieldCheck}
                title="Limpa Nome"
                description="Contestação de negativações no SPC, Serasa e Boa Vista. Análise da regularidade da inscrição, prazo prescricional e indenização por dano moral quando cabível."
                href="/limpa-nome"
                cta="Saber mais"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <ServiceCard
                icon={Landmark}
                title="BACEN / SCR"
                description="Contestação de registros no Sistema de Informações de Créditos do Banco Central via Registrato. Verificação de dívidas indevidas, valores incorretos e prescrição."
                href="/bacen"
                cta="Saber mais"
              />
            </Reveal>
            <Reveal delay={0.2}>
              <ServiceCard
                icon={TrendingUp}
                title="Rating Bancário"
                description="Estratégia jurídica para recuperação do score e reabertura de crédito em bancos. Atuação na origem dos apontamentos — não na superfície."
                href="/rating-bancario"
                cta="Saber mais"
              />
            </Reveal>
            <Reveal delay={0.3}>
              <ServiceCard
                icon={Briefcase}
                title="Rating Comercial"
                description="Recuperação de score para crédito B2B junto a fornecedores, distribuidores e instituições. Diagnóstico Quod, Serasa Experian e Boa Vista."
                href="/rating-bancario#comercial"
                cta="Saber mais"
              />
            </Reveal>
          </div>
        </Section>

        <Section
          eyebrow="Por que MD"
          title="Escritório tradicional. Operação digital."
          variant="white"
        >
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <ImageSlot
                slotId="advogado-mesa"
                description="Advogado em mesa de escritório examinando documentos com cliente ao lado, expressão concentrada, luz natural lateral. (TRANSIÇÃO)"
                tone="transicao"
                aspect="aspect-[4/5]"
              />
            </div>

            <div className="space-y-6">
              <div>
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-md bg-md-navy-deep/5">
                  <Scale className="h-5 w-5 text-md-navy-deep" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl font-semibold text-md-navy-deep">
                  Quem assina é advogado
                </h3>
                <p className="mt-2 text-md-gray-700">
                  Sem despachante, sem consultor sem formação jurídica.
                  Você é atendido e representado por advogado(a) inscrito(a) na
                  OAB, responsável pelo seu caso.
                </p>
              </div>

              <div>
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-md bg-md-navy-deep/5">
                  <FileCheck2 className="h-5 w-5 text-md-navy-deep" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl font-semibold text-md-navy-deep">
                  Transparência em tempo real
                </h3>
                <p className="mt-2 text-md-gray-700">
                  Cada cliente tem acesso a um painel próprio com o andamento do
                  processo, documentos enviados, próximos passos e prazos. Sem
                  print de tela por WhatsApp, sem "está em andamento".
                </p>
              </div>

              <div>
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-md bg-md-navy-deep/5">
                  <ShieldCheck className="h-5 w-5 text-md-navy-deep" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl font-semibold text-md-navy-deep">
                  Compliance no DNA
                </h3>
                <p className="mt-2 text-md-gray-700">
                  Provimento 205/2021 da OAB e LGPD não são selo — são premissa.
                  Não prometemos resultado, não usamos seu caso sem autorização,
                  não armazenamos dado fora da base legal.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="processo"
          eyebrow="Como atendemos"
          title="Quatro etapas. Sem ruído entre elas."
          variant="paper"
        >
          <ProcessTimeline
            steps={[
              {
                numero: "01",
                titulo: "Contato",
                descricao:
                  "Você fala com a equipe pelo WhatsApp. Coletamos documentos básicos (RG, CPF, comprovantes) e descrevemos a situação atual sem nenhum compromisso.",
              },
              {
                numero: "02",
                titulo: "Análise jurídica",
                descricao:
                  "Em até 48h úteis o advogado responsável emite parecer técnico: o que pode ser feito, com que fundamentação legal e qual o tempo estimado.",
              },
              {
                numero: "03",
                titulo: "Contrato e procuração",
                descricao:
                  "Caso decida prosseguir, assinatura eletrônica do contrato de honorários e da procuração. Tudo formalizado, com cláusulas LGPD.",
              },
              {
                numero: "04",
                titulo: "Execução com acompanhamento",
                descricao:
                  "Iniciamos o procedimento e você acompanha cada movimentação no painel do cliente. Comunicação centralizada — nada de mensagem solta.",
              },
            ]}
          />

          <div className="mt-16 flex justify-center">
            <CtaWhatsapp
              message={whatsappMessages.institucional}
              label="Começar pela análise jurídica"
              size="lg"
            />
          </div>
        </Section>

        <Section
          eyebrow="Realização"
          title="O objetivo: você de volta no controle."
          subtitle="Não vendemos felicidade — vendemos acesso. Nome restabelecido junto aos órgãos competentes. Crédito reabilitado quando juridicamente possível. Tranquilidade pra você voltar a planejar."
          align="center"
          variant="white"
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <ImageSlot
              slotId="realizacao-handshake"
              description="Aperto de mão entre cliente e advogado, ambiente claro de escritório — sorriso contido de alívio. (REALIZAÇÃO)"
              tone="realizacao"
              aspect="aspect-square"
            />
            <ImageSlot
              slotId="realizacao-sorriso"
              description="Pessoa de 40-50 anos olhando celular com sorriso genuíno e leve, à mesa em casa. (REALIZAÇÃO)"
              tone="realizacao"
              aspect="aspect-square"
            />
            <ImageSlot
              slotId="realizacao-caminhada"
              description="Pessoa caminhando em rua urbana com postura ereta, luz do fim da tarde, expressão tranquila. (REALIZAÇÃO)"
              tone="realizacao"
              aspect="aspect-square"
            />
          </div>
        </Section>

        <Section
          eyebrow="Perguntas frequentes"
          title="Sem rodeios."
          align="center"
          variant="paper"
        >
          <div className="mx-auto max-w-3xl">
            <Faq
              items={[
                {
                  pergunta: "Vocês garantem que vão limpar meu nome?",
                  resposta:
                    "Não. E nenhum escritório de advocacia sério no Brasil pode prometer resultado — é vedado pelo Provimento 205/2021 da OAB. O que garantimos é a análise jurídica fundamentada, a representação técnica e a transparência sobre o que pode e o que não pode ser feito no seu caso específico.",
                },
                {
                  pergunta: "Quanto custa?",
                  resposta:
                    "Honorário só é discutido depois da análise gratuita do seu caso. Trabalhamos com contrato escrito, valores fixos ou parcelados, e nunca cobramos antes do contrato assinado. Você terá o valor exato antes de qualquer pagamento.",
                },
                {
                  pergunta: "Em quanto tempo meu nome é limpo?",
                  resposta:
                    "Depende do tipo de inscrição, da via escolhida (extrajudicial ou judicial) e da resposta da contraparte. Prazos típicos variam de 15 dias a 6 meses. Na análise inicial damos uma estimativa realista do seu caso — sem fantasia.",
                },
                {
                  pergunta: "Vocês atendem online ou presencial?",
                  resposta:
                    "Os dois. A maior parte do atendimento é digital (WhatsApp, painel do cliente, videochamada e assinatura eletrônica). Atendimento presencial disponível na sede do escritório mediante agendamento.",
                },
                {
                  pergunta: "Meus dados estão seguros?",
                  resposta:
                    "Sim. Operamos em conformidade com a LGPD. Dados são tratados apenas para a finalidade contratada, armazenados em ambiente seguro, e você tem direito de solicitar acesso, correção ou exclusão a qualquer momento. Detalhes na nossa Política de Privacidade.",
                },
                {
                  pergunta: "E se meu caso não tiver solução jurídica?",
                  resposta:
                    "Falamos isso na análise inicial. Nem todo apontamento é irregular, nem toda dívida tem como ser contestada. Se não houver fundamento técnico, dizemos com franqueza e indicamos os caminhos possíveis (negociação direta, planejamento financeiro, prazo prescricional).",
                },
              ]}
            />
          </div>
        </Section>

        <Section variant="navy" className="text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display text-h1 font-semibold text-md-paper">
              Vamos analisar seu caso?
            </h2>
            <p className="mt-4 text-body-lg text-md-paper/80">
              A primeira conversa é gratuita e sem compromisso. Em até 48h úteis
              você recebe o parecer técnico do advogado responsável.
            </p>
            <div className="mt-10 flex justify-center">
              <CtaWhatsapp
                message={whatsappMessages.institucional}
                label="Iniciar análise pelo WhatsApp"
                size="lg"
              />
            </div>
          </div>
        </Section>
      </main>

      <SiteFooter />
      <FloatingWhatsapp message={whatsappMessages.institucional} />
    </>
  );
}
