type Step = {
  numero: string;
  titulo: string;
  descricao: string;
};

type Props = {
  steps: Step[];
};

export function ProcessTimeline({ steps }: Props) {
  return (
    <ol className="relative space-y-12 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-8">
      {steps.map((step, i) => (
        <li key={i} className="relative">
          {/* linha conectora (desktop) */}
          {i < steps.length - 1 && (
            <div className="absolute left-12 top-6 hidden h-px w-full bg-md-gold/30 lg:block" />
          )}

          <div className="flex items-start gap-4 lg:flex-col lg:gap-0">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-md-gold bg-md-paper font-display text-lg font-semibold text-md-gold">
              {step.numero}
            </div>

            <div className="lg:mt-6">
              <h4 className="font-display text-lg font-semibold text-md-navy-deep">
                {step.titulo}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-md-gray-700">
                {step.descricao}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
