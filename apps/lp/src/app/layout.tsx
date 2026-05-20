import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { contact } from "@/lib/contact";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(contact.siteUrl),
  title: {
    default: "MD Assessoria — Limpa Nome, BACEN, Rating Bancário e Comercial",
    template: "%s · MD Assessoria",
  },
  description:
    "Escritório de advocacia especializado em recuperação de crédito. Limpa Nome, contestação BACEN/SCR, recuperação de rating bancário e comercial. Análise jurídica antes da promessa.",
  keywords: [
    "limpa nome",
    "bacen",
    "rating bancário",
    "rating comercial",
    "advogado limpa nome",
    "contestação serasa",
    "registrato",
    "scr bacen",
    "recuperação de crédito",
  ],
  authors: [{ name: "MD Assessoria e Consultoria" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: contact.siteUrl,
    siteName: "MD Assessoria",
    title: "MD Assessoria — Quando o banco fechou a porta, o direito ainda tem uma chave.",
    description:
      "Escritório-tecnologia em recuperação de crédito. Limpa Nome, BACEN, Rating. Compliance OAB e LGPD no DNA.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
