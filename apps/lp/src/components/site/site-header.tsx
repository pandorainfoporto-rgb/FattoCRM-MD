import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { buildWhatsappUrl, whatsappMessages } from "@/lib/contact";

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="MD Assessoria & Consultoria — Início">
          {/* Logo em pílula branca pra preservar legibilidade em fundo escuro */}
          <span className="inline-flex items-center justify-center rounded-lg bg-white px-2.5 py-2 shadow-md-card">
            <Image
              src="/logo-md.jpg"
              alt="MD Assessoria & Consultoria Empresarial"
              width={140}
              height={56}
              priority
              className="h-9 w-auto"
            />
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-lg font-semibold tracking-tight text-md-paper">
              MD Assessoria <span className="text-md-cyan">&amp;</span> Consultoria
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-md-paper/50">
              Recuperação de crédito
            </span>
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
          className="inline-flex items-center gap-2 rounded-md bg-md-cyan px-4 py-2 text-sm font-medium text-white shadow-md-card transition hover:brightness-110"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
          Falar agora
        </a>
      </nav>
    </header>
  );
}
