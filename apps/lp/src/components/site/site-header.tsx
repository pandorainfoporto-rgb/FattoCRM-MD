import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { buildWhatsappUrl, whatsappMessages } from "@/lib/contact";

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="MD Assessoria — Início">
          {/* Logo em pílula branca pra preservar legibilidade em fundo escuro */}
          <span className="inline-flex items-center justify-center rounded-md bg-white px-2.5 py-1.5 shadow-md-card">
            <Image
              src="/logo-md.jpg"
              alt="MD Assessoria & Consultoria Empresarial"
              width={120}
              height={48}
              priority
              className="h-7 w-auto"
            />
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          <Link
            href="/limpa-nome"
            className="text-sm text-md-paper/80 transition hover:text-md-cyan-soft"
          >
            Limpa Nome
          </Link>
          <Link
            href="/bacen"
            className="text-sm text-md-paper/80 transition hover:text-md-cyan-soft"
          >
            BACEN / SCR
          </Link>
          <Link
            href="/rating-bancario"
            className="text-sm text-md-paper/80 transition hover:text-md-cyan-soft"
          >
            Rating
          </Link>
        </div>

        <a
          href={buildWhatsappUrl(whatsappMessages.institucional)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-md-cyan/50 px-4 py-2 text-sm font-medium text-md-paper transition hover:bg-md-cyan/15"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
          Falar agora
        </a>
      </nav>
    </header>
  );
}
