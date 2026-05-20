import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Section } from "@/components/site/section";

export const metadata = {
  title: "Política de Privacidade",
  description: "Política de Privacidade da MD Assessoria e Consultoria — conformidade LGPD (Lei 13.709/2018).",
};

// ⚠️ PLACEHOLDER LEGAL ⚠️
// Este texto é esqueleto inicial. ANTES DE PUBLICAR em produção:
//  1. Advogado responsável da MD revisar e ajustar ao caso concreto
//  2. Preencher DPO, base legal específica por finalidade, prazo de retenção
//  3. Validar contra Lei 13.709/2018 e Resolução CD/ANPD 4/2024
export default function PoliticaPrivacidadePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Section variant="navy" className="pt-32 pb-12">
          <h1 className="font-display text-h1 font-semibold text-md-paper">
            Política de Privacidade
          </h1>
          <p className="mt-3 text-md-paper/70">
            Última atualização: a definir · Versão: 0.1 — esqueleto.
          </p>
        </Section>

        <Section variant="paper">
          <article className="prose prose-slate mx-auto max-w-3xl">
            <p className="rounded-md border border-md-warning/30 bg-md-warning/10 p-4 text-sm text-md-gray-700">
              <strong>Esqueleto em revisão.</strong> Esta versão é um rascunho técnico
              e será substituída pelo texto definitivo após análise do advogado
              responsável da MD Assessoria. O conteúdo aqui não constitui ainda
              um documento legalmente vinculante.
            </p>

            <h2 className="mt-8 font-display text-h2 text-md-navy-deep">1. Quem somos</h2>
            <p>
              A <strong>MD Assessoria e Consultoria</strong> é o controlador dos
              dados pessoais coletados por meio deste site e dos canais de
              atendimento.
            </p>

            <h2 className="mt-8 font-display text-h2 text-md-navy-deep">2. Dados que coletamos</h2>
            <ul>
              <li>Identificação (nome, CPF/CNPJ, RG, contato).</li>
              <li>Documentação enviada para análise jurídica (extratos, contratos, comprovantes).</li>
              <li>Dados de navegação no site (cookies essenciais e analíticos).</li>
            </ul>

            <h2 className="mt-8 font-display text-h2 text-md-navy-deep">3. Finalidade e base legal</h2>
            <ul>
              <li><strong>Execução de contrato (LGPD art. 7º, V):</strong> prestação dos serviços contratados.</li>
              <li><strong>Cumprimento de obrigação legal (LGPD art. 7º, II):</strong> retenção fiscal e processual.</li>
              <li><strong>Legítimo interesse (LGPD art. 7º, IX):</strong> qualificação de leads e segurança.</li>
              <li><strong>Consentimento (LGPD art. 7º, I):</strong> comunicações de marketing (opt-in explícito).</li>
            </ul>

            <h2 className="mt-8 font-display text-h2 text-md-navy-deep">4. Compartilhamento</h2>
            <p>
              Dados podem ser compartilhados com instituições financeiras,
              órgãos públicos e judiciais estritamente para a execução do serviço
              contratado e nos limites do mandato outorgado.
            </p>

            <h2 className="mt-8 font-display text-h2 text-md-navy-deep">5. Seus direitos</h2>
            <p>
              Conforme art. 18 da LGPD, você pode requisitar: confirmação,
              acesso, correção, anonimização, portabilidade, eliminação,
              informações sobre uso e revogação de consentimento.
            </p>

            <h2 className="mt-8 font-display text-h2 text-md-navy-deep">6. Encarregado (DPO)</h2>
            <p>
              <strong>A definir.</strong> Será nomeado e divulgado nesta política antes
              do lançamento oficial.
            </p>

            <h2 className="mt-8 font-display text-h2 text-md-navy-deep">7. Retenção</h2>
            <p>
              Prazos serão definidos conforme natureza do dado (jurídico,
              fiscal, contábil) e legislação aplicável.
            </p>

            <h2 className="mt-8 font-display text-h2 text-md-navy-deep">8. Contato</h2>
            <p>
              Para exercer seus direitos, entre em contato pelo e-mail oficial
              ou WhatsApp constantes no rodapé.
            </p>
          </article>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
