import type { Metadata } from "next";
import { AtendimentoPage } from "@/components/atendimento/atendimento-page";

export const metadata: Metadata = { title: "Atendimento — MD Assessoria" };

export default function AtendimentoInboxPage() {
  return <AtendimentoPage />;
}
