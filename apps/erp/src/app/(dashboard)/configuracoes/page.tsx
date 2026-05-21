import type { Metadata } from "next";
import { AnchorNav } from "@/components/configuracoes/anchor-nav";
import { EmpresaSection } from "@/components/configuracoes/sections/empresa-section";
import { EquipeSection } from "@/components/configuracoes/sections/equipe-section";
import { AtendimentoSection } from "@/components/configuracoes/sections/atendimento-section";
import { MarcaSection } from "@/components/configuracoes/sections/marca-section";
import { IntegracoesSection } from "@/components/configuracoes/sections/integracoes-section";
import { IASection } from "@/components/configuracoes/sections/ia-section";
import { SistemaSection } from "@/components/configuracoes/sections/sistema-section";

export const metadata: Metadata = { title: "Configurações — MD Assessoria" };

const SECOES = [
  { id: "empresa", label: "Empresa" },
  { id: "equipe", label: "Equipe" },
  { id: "atendimento", label: "Atendimento" },
  { id: "marca", label: "Marca" },
  { id: "integracoes", label: "Integrações" },
  { id: "ia", label: "Automação IA" },
  { id: "sistema", label: "Sistema" },
];

export default function ConfiguracoesPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 animate-fade-in pb-12">
      <header>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/55">
          Tudo num lugar só
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight">Configurações</h1>
        <p className="mt-1 text-sm text-foreground/60">
          Sem menus, sem submenus. Cada seção é um formulário curto. Role pra ver tudo ou clica num atalho acima.
        </p>
      </header>

      <AnchorNav items={SECOES} />

      <div className="space-y-6">
        <EmpresaSection />
        <EquipeSection />
        <AtendimentoSection />
        <MarcaSection />
        <IntegracoesSection />
        <IASection />
        <SistemaSection />
      </div>
    </div>
  );
}
