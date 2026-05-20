import { ShieldCheck, Scale, Lock, FileText } from "lucide-react";

const items = [
  { icon: Scale, label: "Advogado responsável", sub: "OAB ativo" },
  { icon: ShieldCheck, label: "Provimento 205/2021", sub: "Conformidade OAB" },
  { icon: Lock, label: "LGPD 13.709/2018", sub: "Dados protegidos" },
  { icon: FileText, label: "Contrato e procuração", sub: "Sempre formalizado" },
];

export function TrustBar() {
  return (
    <div className="border-y border-md-gray-200 bg-md-gray-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {items.map(({ icon: Icon, label, sub }, i) => (
          <div key={i} className="flex items-center gap-4">
            <Icon className="h-8 w-8 flex-shrink-0 text-md-cyan" strokeWidth={1.5} />
            <div>
              <p className="font-display text-sm font-medium text-md-navy-deep">
                {label}
              </p>
              <p className="text-xs text-md-gray-400">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
