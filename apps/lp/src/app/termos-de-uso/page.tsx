import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Section } from "@/components/site/section";

export const metadata = {
  title: "Termos de Uso",
  description: "Termos de Uso do site da MD Assessoria e Consultoria.",
};

// ⚠️ PLACEHOLDER LEGAL ⚠️ Ver Brain/00-NORTE §Compliance.
export default function TermosUsoPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Section variant="navy" className="pt-32 pb-12">
          <h1 className="font-display text-h1 font-semibold text-md-paper">
            Termos de Uso
          </h1>
          <p className="mt-3 text-md-paper/70">
            Última atualização: a definir · Versão: 0.1 — esqueleto.
          </p>
        </Section>

        <Section variant="paper">
          <article className="prose prose-slate mx-auto max-w-3xl">
            <p className="rounded-md border border-md-warning/30 bg-md-warning/10 p-4 text-sm text-md-gray-700">
              <strong>Esqueleto em revisão.</strong> Versão definitiva após revisão
              do advogado responsável da MD.
            </p>

            <h2 className="mt-8 font-display text-h2 text-md-navy-deep">1. Aceite</h2>
            <p>
              Ao acessar este site você declara estar ciente destes termos e da
              Política de Privacidade.
            </p>

            <h2 className="mt-8 font-display text-h2 text-md-navy-deep">2. Natureza do conteúdo</h2>
            <p>
              Conteúdo meramente informativo, em conformidade com o Provimento
              205/2021 do Conselho Federal da OAB. Não constitui parecer
              jurídico, consultoria nem oferta de serviço sem prévia análise.
            </p>

            <h2 className="mt-8 font-display text-h2 text-md-navy-deep">3. Contratação</h2>
            <p>
              Prestação de serviço advocatício depende de contrato escrito
              específico, procuração e análise prévia do caso pelo advogado
              responsável.
            </p>

            <h2 className="mt-8 font-display text-h2 text-md-navy-deep">4. Limitação de responsabilidade</h2>
            <p>
              Nenhum conteúdo do site garante resultado, sucesso ou prazo. Cada
              caso é avaliado individualmente.
            </p>

            <h2 className="mt-8 font-display text-h2 text-md-navy-deep">5. Propriedade intelectual</h2>
            <p>
              Todo o conteúdo, marca e identidade visual são protegidos. Uso não
              autorizado é vedado.
            </p>

            <h2 className="mt-8 font-display text-h2 text-md-navy-deep">6. Foro</h2>
            <p>
              Fica eleito o foro da comarca da sede do escritório para dirimir
              eventuais controvérsias.
            </p>
          </article>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
