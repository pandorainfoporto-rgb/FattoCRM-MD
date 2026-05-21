import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { AgentesGrid } from "@/components/agentes/agentes-grid";

export const metadata: Metadata = { title: "Agentes IA — MD Assessoria" };

export default function AgentesPage() {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <PageHeader
        eyebrow="Ferramentas › Automação IA"
        title="Agentes IA"
        subtitle="Estrutura de 84 agentes em 12 setores. Hierarquia: CEO IA → 11 Managers → 72 Especialistas. Toda escrita relevante passa por aprovação humana."
        actions={
          <>
            <Button variant="outline">Documentação</Button>
            <Button>
              <Plus className="h-4 w-4" />
              Novo Agente
            </Button>
          </>
        }
      />

      <AgentesGrid />
    </div>
  );
}
