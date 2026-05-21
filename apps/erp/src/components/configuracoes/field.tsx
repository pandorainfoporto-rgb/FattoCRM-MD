import { cn } from "@/lib/cn";

/**
 * Campo de formulário reutilizável da mega-page de configurações.
 * Sem persistência — UI shell até schema/auth entrarem.
 */

interface FieldProps {
  label: string;
  hint?: string;
  children: React.ReactNode;
  span?: 1 | 2 | "full";
}

export function Field({ label, hint, children, span = 1 }: FieldProps) {
  return (
    <label
      className={cn(
        "flex flex-col gap-1.5",
        span === 2 && "sm:col-span-2",
        span === "full" && "col-span-full",
      )}
    >
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/55">
        {label}
      </span>
      {children}
      {hint && (
        <span className="text-[10px] text-foreground/40">{hint}</span>
      )}
    </label>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "rounded-xl border border-foreground/10 bg-foreground/[0.03] px-3 py-2.5 text-sm text-foreground placeholder:text-foreground/30 transition-colors focus:border-[var(--color-azure-500)]/40 focus:outline-none",
        props.className,
      )}
    />
  );
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "rounded-xl border border-foreground/10 bg-foreground/[0.03] px-3 py-2.5 text-sm text-foreground placeholder:text-foreground/30 transition-colors focus:border-[var(--color-azure-500)]/40 focus:outline-none",
        props.className,
      )}
    />
  );
}

export function SelectInput(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "rounded-xl border border-foreground/10 bg-foreground/[0.03] px-3 py-2.5 text-sm text-foreground transition-colors focus:border-[var(--color-azure-500)]/40 focus:outline-none",
        props.className,
      )}
    />
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors",
        checked ? "bg-[var(--color-azure-500)]" : "bg-foreground/15",
      )}
    >
      <span
        className={cn(
          "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-5" : "translate-x-0.5",
        )}
      />
      {label && <span className="sr-only">{label}</span>}
    </button>
  );
}
