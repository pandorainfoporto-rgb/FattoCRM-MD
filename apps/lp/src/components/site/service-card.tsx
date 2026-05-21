import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  cta?: string;
};

export function ServiceCard({
  icon: Icon,
  title,
  description,
  href,
  cta = "Ver detalhes",
}: Props) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-md-gray-200 bg-white p-6 shadow-md-card transition-all duration-300 hover:-translate-y-1 hover:border-md-cyan/40 hover:shadow-md-card-lg"
    >
      {/* accent bar topo */}
      <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-md-cyan to-md-navy transition-transform duration-300 group-hover:scale-x-100" />

      {/* ícone watermark */}
      <Icon
        className="absolute -right-3 -top-2 h-24 w-24 text-md-navy-deep/[0.04] transition-transform duration-500 group-hover:scale-110 group-hover:text-md-cyan/[0.06]"
        strokeWidth={1}
      />

      <div className="relative">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-md-navy-deep to-md-navy text-white shadow-md-card">
          <Icon className="h-6 w-6" strokeWidth={1.5} />
        </div>

        <h3 className="mt-6 font-display text-h3 font-semibold text-md-navy-deep">
          {title}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-md-gray-700">
          {description}
        </p>

        <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-md-cyan transition-all group-hover:gap-3">
          {cta}
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </div>
      </div>
    </Link>
  );
}
