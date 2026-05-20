import Link from "next/link";
import { Scale, MessageCircle } from "lucide-react";
import { buildWhatsappUrl, whatsappMessages } from "@/lib/contact";

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-md-paper">
          <Scale className="h-7 w-7 text-md-gold" strokeWidth={1.5} />
          <span className="font-display text-2xl font-semibold tracking-tight">
            MD
          </span>
          <span className="hidden text-sm text-md-paper/60 sm:inline">
            Assessoria &amp; Consultoria
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          <Link
            href="/limpa-nome"
            className="text-sm text-md-paper/80 transition hover:text-md-gold"
          >
            Limpa Nome
          </Link>
          <Link
            href="/bacen"
            className="text-sm text-md-paper/80 transition hover:text-md-gold"
          >
            BACEN / SCR
          </Link>
          <Link
            href="/rating-bancario"
            className="text-sm text-md-paper/80 transition hover:text-md-gold"
          >
            Rating
          </Link>
        </div>

        <a
          href={buildWhatsappUrl(whatsappMessages.institucional)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-md-gold/50 px-4 py-2 text-sm font-medium text-md-paper transition hover:bg-md-gold/10"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
          Falar agora
        </a>
      </nav>
    </header>
  );
}
