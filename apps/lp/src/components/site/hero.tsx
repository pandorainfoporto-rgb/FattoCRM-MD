import Link from "next/link";
import { ImageSlot } from "./image-slot";
import { CtaWhatsapp } from "./cta-whatsapp";
import { Shield, Clock, FileCheck, ArrowDown, Sparkles } from "lucide-react";

type Props = {
  eyebrow?: string;
  headline: string;
  highlightWord?: string;
  subhead: string;
  whatsappMessage: string;
  imageSlotId: string;
  imageDescription: string;
  /** label do botão secundário que rola pra seção de serviços */
  secondaryHref?: string;
};

export function Hero({
  eyebrow,
  headline,
  highlightWord,
  subhead,
  whatsappMessage,
  imageSlotId,
  imageDescription,
  secondaryHref = "#servicos",
}: Props) {
  const headlineRendered = highlightWord
    ? headline.split(highlightWord).flatMap((part, i, arr) =>
        i < arr.length - 1
          ? [part, <span key={i} className="text-md-cyan">{highlightWord}</span>]
          : [part],
      )
    : headline;

  return (
    <section className="relative isolate overflow-hidden bg-md-navy-deep pt-28 pb-20 lg:pt-36 lg:pb-28">
      {/* glow ciano radial */}
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-[36rem] w-[36rem] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #00A0E3 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 h-[32rem] w-[32rem] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #2C3E8E 0%, transparent 70%)" }}
      />
      {/* textura de pontos */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #C5D6E8 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-8 lg:items-center">
        <div className="animate-fade-in">
          {eyebrow && (
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-md-cyan/30 bg-md-cyan/10 px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-md-cyan opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-md-cyan" />
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-md-cyan-soft">
                {eyebrow}
              </span>
            </div>
          )}

          <h1 className="font-display text-display font-semibold text-md-paper">
            {headlineRendered}
          </h1>

          <p className="mt-6 max-w-xl text-body-lg text-md-paper/80">
            {subhead}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <CtaWhatsapp
              message={whatsappMessage}
              label="Solicitar análise jurídica"
              size="lg"
            />
            <Link
              href={secondaryHref}
              className="inline-flex items-center gap-2 rounded-md border border-md-paper/25 px-6 py-4 text-base font-medium text-md-paper transition hover:bg-md-paper/10"
            >
              Ver serviços
              <ArrowDown className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>

          <div className="mt-12 grid max-w-lg gap-px overflow-hidden rounded-lg border border-md-paper/10 bg-md-paper/5 sm:grid-cols-3">
            {[
              { icon: Shield, top: "Advogado", bottom: "responsável OAB" },
              { icon: Clock, top: "Até 48h", bottom: "para o parecer" },
              { icon: FileCheck, top: "LGPD + OAB", bottom: "no DNA" },
            ].map(({ icon: Icon, top, bottom }, i) => (
              <div key={i} className="bg-md-navy-deep/40 px-5 py-4">
                <Icon className="h-5 w-5 text-md-cyan" strokeWidth={1.5} />
                <p className="mt-2 font-display text-sm font-semibold text-md-paper">{top}</p>
                <p className="text-xs text-md-paper/60">{bottom}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative animate-fade-in-slow">
          {/* moldura com glow */}
          <div className="absolute -inset-3 rounded-2xl bg-gradient-to-tr from-md-cyan/20 to-transparent blur-xl" />
          <ImageSlot
            slotId={imageSlotId}
            description={imageDescription}
            tone="dor"
            aspect="aspect-[4/5]"
            className="relative shadow-md-card-lg ring-1 ring-md-paper/10"
            priority
          />
          {/* selo flutuante */}
          <div className="absolute -bottom-5 -left-4 flex items-center gap-3 rounded-xl bg-md-cyan p-4 shadow-md-cyan lg:-left-8">
            <Sparkles className="h-8 w-8 flex-shrink-0 text-white" strokeWidth={1.5} />
            <div className="text-white">
              <p className="font-mono text-[10px] uppercase tracking-wider opacity-80">
                Sem promessa
              </p>
              <p className="font-display text-sm font-semibold leading-tight">
                Análise jurídica primeiro.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
