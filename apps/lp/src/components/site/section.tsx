import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  align?: "left" | "center";
  variant?: "paper" | "navy" | "white";
  className?: string;
};

const variantStyles: Record<NonNullable<Props["variant"]>, string> = {
  paper: "bg-md-paper text-md-ink",
  navy: "bg-md-navy-deep text-md-paper",
  white: "bg-white text-md-ink",
};

export function Section({
  children,
  id,
  eyebrow,
  title,
  subtitle,
  align = "left",
  variant = "paper",
  className,
}: Props) {
  const alignWrapper = align === "center" ? "text-center mx-auto" : "";

  return (
    <section
      id={id}
      className={cn(variantStyles[variant], "py-20 lg:py-28", className)}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {(eyebrow || title || subtitle) && (
          <div className={cn("mb-12 max-w-3xl", alignWrapper)}>
            {eyebrow && (
              <p
                className={cn(
                  "mb-4 font-mono text-xs uppercase tracking-[0.2em]",
                  variant === "navy" ? "text-md-cyan" : "text-md-cyan",
                )}
              >
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                className={cn(
                  "font-display text-h1 font-semibold",
                  variant === "navy" ? "text-md-paper" : "text-md-navy-deep",
                )}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={cn(
                  "mt-4 text-body-lg",
                  variant === "navy" ? "text-md-paper/80" : "text-md-gray-700",
                )}
              >
                {subtitle}
              </p>
            )}
            {align === "center" && (
              <div className="gold-rule-center mt-8" />
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
