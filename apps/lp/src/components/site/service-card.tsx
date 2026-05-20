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
    <Link href={href} className="card-service block">
      <div className="absolute right-6 top-6 opacity-10 transition group-hover:opacity-20">
        <Icon className="h-20 w-20 text-md-gold" strokeWidth={1} />
      </div>

      <div className="relative">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-md-navy-deep/5">
          <Icon className="h-6 w-6 text-md-navy-deep" strokeWidth={1.5} />
        </div>

        <h3 className="mt-6 font-display text-h3 font-semibold text-md-navy-deep">
          {title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-md-gray-700">
          {description}
        </p>

        <div className="mt-6 flex items-center gap-2 text-sm font-medium text-md-gold transition group-hover:gap-3">
          {cta}
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
        </div>
      </div>
    </Link>
  );
}
