import Link from "next/link";
import { Instagram, Mail, Phone, MapPin, Scale } from "lucide-react";
import { contact } from "@/lib/contact";

export function SiteFooter() {
  return (
    <footer className="bg-md-navy-deep text-md-paper">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <Scale className="h-6 w-6 text-md-gold" strokeWidth={1.5} />
              <span className="font-display text-xl font-semibold">
                MD Assessoria &amp; Consultoria
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm text-md-paper/70">
              Escritório-tecnologia jurídico-financeiro. Limpa Nome, contestação
              BACEN/SCR, recuperação de rating bancário e comercial. Análise
              jurídica antes da promessa.
            </p>

            <div className="mt-8 space-y-3 text-sm text-md-paper/80">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-md-gold" strokeWidth={1.5} />
                <span>{contact.address}</span>
              </div>
              <a
                href={`tel:+${contact.whatsappNumber}`}
                className="flex items-center gap-3 transition hover:text-md-gold"
              >
                <Phone className="h-4 w-4 flex-shrink-0 text-md-gold" strokeWidth={1.5} />
                <span>{contact.phoneDisplay}</span>
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 transition hover:text-md-gold"
              >
                <Mail className="h-4 w-4 flex-shrink-0 text-md-gold" strokeWidth={1.5} />
                <span>{contact.email}</span>
              </a>
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition hover:text-md-gold"
              >
                <Instagram className="h-4 w-4 flex-shrink-0 text-md-gold" strokeWidth={1.5} />
                <span>@mdassessoriaeconsultoria</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-base font-medium text-md-gold">
              Serviços
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-md-paper/70">
              <li><Link href="/limpa-nome" className="transition hover:text-md-paper">Limpa Nome</Link></li>
              <li><Link href="/bacen" className="transition hover:text-md-paper">BACEN / Registrato / SCR</Link></li>
              <li><Link href="/rating-bancario" className="transition hover:text-md-paper">Rating Bancário</Link></li>
              <li><Link href="/rating-bancario#comercial" className="transition hover:text-md-paper">Rating Comercial</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base font-medium text-md-gold">
              Institucional
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-md-paper/70">
              <li><Link href="/" className="transition hover:text-md-paper">Sobre o escritório</Link></li>
              <li><Link href="/#processo" className="transition hover:text-md-paper">Como atendemos</Link></li>
              <li><Link href="/politica-de-privacidade" className="transition hover:text-md-paper">Política de privacidade</Link></li>
              <li><Link href="/termos-de-uso" className="transition hover:text-md-paper">Termos de uso</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-md-paper/10 pt-8">
          <div className="space-y-4 text-xs text-md-paper/50">
            <p>
              <strong className="text-md-paper/70">Advogado responsável:</strong>{" "}
              {contact.oabResponsavel}
            </p>
            <p>
              Em conformidade com o <strong>Provimento 205/2021</strong> do Conselho
              Federal da OAB e o <strong>Código de Ética</strong>, este site tem caráter
              meramente informativo. Não há captação de clientela, mercantilização
              da advocacia, nem promessa de resultado. Cada caso é avaliado
              individualmente pelo advogado responsável após análise da
              documentação.
            </p>
            <p>
              Tratamos seus dados conforme a <strong>Lei Geral de Proteção de Dados (LGPD —
              Lei 13.709/2018)</strong>. Consulte nossa{" "}
              <Link href="/politica-de-privacidade" className="underline transition hover:text-md-gold">
                Política de Privacidade
              </Link>.
            </p>
            <p className="pt-4">
              © {new Date().getFullYear()} MD Assessoria e Consultoria. Todos os
              direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
