import { ImageSlot } from "./image-slot";
import { CtaWhatsapp } from "./cta-whatsapp";
import { Shield, Clock, FileCheck } from "lucide-react";

type Props = {
  eyebrow?: string;
  headline: string;
  highlightWord?: string;
  subhead: string;
  whatsappMessage: string;
  imageSlotId: string;
  imageDescription: string;
};

export function Hero({
  eyebrow,
  headline,
  highlightWord,
  subhead,
  whatsappMessage,
  imageSlotId,
  imageDescription,
}: Props) {
  // Realça highlightWord no headline (se passado) com cor dourada
  const headlineRendered = highlightWord
    ? headline.split(highlightWord).flatMap((part, i, arr) =>
        i < arr.length - 1
          ? [part, <span key={i} className="text-md-gold">{highlightWord}</span>]
          : [part],
      )
    : headline;

  return (
    <section className="relative isolate overflow-hidden bg-md-navy-deep pt-20 pb-16 lg:pt-32 lg:pb-24">
      {/* textura sutil */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #C5A572 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:items-center">
        <div>
          {eyebrow && (
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-md-gold">
              {eyebrow}
            </p>
          )}
          <h1 className="font-display text-display font-semibold text-md-paper">
            {headlineRendered}
          </h1>

          <p className="mt-6 max-w-xl text-body-lg text-md-paper/80">
            {subhead}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <CtaWhatsapp
              message={whatsappMessage}
              label="Solicitar análise jurídica"
              size="lg"
            />
          </div>

          <div className="mt-12 grid gap-6 text-sm text-md-paper/70 sm:grid-cols-3">
            <div className="flex items-start gap-2">
              <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-md-gold" strokeWidth={1.5} />
              <span>Advogado responsável<br/>OAB ativo</span>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-md-gold" strokeWidth={1.5} />
              <span>Análise em<br/>até 48h úteis</span>
            </div>
            <div className="flex items-start gap-2">
              <FileCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-md-gold" strokeWidth={1.5} />
              <span>Compliance<br/>LGPD + OAB</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <ImageSlot
            slotId={imageSlotId}
            description={imageDescription}
            tone="dor"
            aspect="aspect-[4/5]"
            className="shadow-md-card-lg"
          />
          {/* selo dourado flutuante */}
          <div className="absolute -bottom-4 -left-4 max-w-[200px] rounded-md bg-md-gold p-4 text-md-navy-deep shadow-md-gold lg:-left-8">
            <p className="font-display text-xs uppercase tracking-wider">
              Análise jurídica
            </p>
            <p className="mt-1 font-display text-base font-semibold leading-tight">
              antes da promessa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
