import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface SectionCardProps {
  id: string;
  icon: LucideIcon;
  title: string;
  description?: string;
  children: React.ReactNode;
  iconClass?: string;
}

export function SectionCard({
  id,
  icon: Icon,
  title,
  description,
  children,
  iconClass,
}: SectionCardProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="glass rounded-3xl border border-foreground/[0.08] p-6 sm:p-8">
        <header className="mb-6 flex items-start gap-4 border-b border-foreground/[0.05] pb-5">
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-foreground/10 bg-foreground/[0.04]",
              iconClass,
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-black tracking-tight">{title}</h2>
            {description && (
              <p className="mt-1 text-sm text-foreground/55">{description}</p>
            )}
          </div>
        </header>
        <div className="space-y-6">{children}</div>
      </div>
    </section>
  );
}
