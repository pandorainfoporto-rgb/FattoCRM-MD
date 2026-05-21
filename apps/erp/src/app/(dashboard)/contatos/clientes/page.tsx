import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ClientesShell } from "@/components/clientes/clientes-shell";

export const metadata: Metadata = { title: "Clientes — MD Assessoria" };

export default function ClientesPage() {
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <PageHeader
        eyebrow="Contatos"
        title="Clientes"
        subtitle="Base sincronizada com o IXC. Cada atualização puxa os clientes da fonte e atualiza a tabela local."
      />
      <ClientesShell />
    </div>
  );
}
