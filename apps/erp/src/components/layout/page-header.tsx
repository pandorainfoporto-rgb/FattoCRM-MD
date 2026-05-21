import { cn } from "@/lib/cn";

/**
 * Cabeçalho-padrão de página interna do ERP.
 * Eyebrow (categoria) + Título + Subtítulo + Ações à direita (opcional).
 */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  actions,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "flex flex-col gap-3 border-b border-foreground/[0.08] pb-6 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div>
        {eyebrow && (
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/55">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 text-3xl font-black tracking-tight">{title}</h1>
        {subtitle && (
          <p className="mt-1 max-w-2xl text-sm text-foreground/60">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </header>
  );
}
