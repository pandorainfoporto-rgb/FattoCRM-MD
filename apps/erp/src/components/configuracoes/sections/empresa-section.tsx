"use client";

import { useState } from "react";
import { Building2 } from "lucide-react";
import { SectionCard } from "../section-card";
import { Field, TextInput } from "../field";

export function EmpresaSection() {
  const [form, setForm] = useState({
    razao: "",
    fantasia: "",
    cnpj: "",
    telefone: "",
    email: "",
    site: "",
    endereco: "",
  });
  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <SectionCard
      id="empresa"
      icon={Building2}
      title="Empresa"
      description="Identidade legal e fiscal. Aparece em documentos, propostas e e-mails transacionais."
      iconClass="text-[var(--color-azure-500)] bg-[var(--color-azure-500)]/10 border-[var(--color-azure-500)]/20"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Razão social" span={2}>
          <TextInput value={form.razao} onChange={update("razao")} placeholder="Empresa Ltda." />
        </Field>
        <Field label="Nome fantasia">
          <TextInput value={form.fantasia} onChange={update("fantasia")} placeholder="Marca pública" />
        </Field>
        <Field label="CNPJ">
          <TextInput value={form.cnpj} onChange={update("cnpj")} placeholder="00.000.000/0001-00" />
        </Field>
        <Field label="Telefone">
          <TextInput value={form.telefone} onChange={update("telefone")} placeholder="(00) 0000-0000" />
        </Field>
        <Field label="E-mail comercial">
          <TextInput type="email" value={form.email} onChange={update("email")} placeholder="contato@empresa.com" />
        </Field>
        <Field label="Site" span={2}>
          <TextInput value={form.site} onChange={update("site")} placeholder="https://" />
        </Field>
        <Field label="Endereço" span={2}>
          <TextInput value={form.endereco} onChange={update("endereco")} placeholder="Rua, número — Cidade/UF" />
        </Field>
      </div>
    </SectionCard>
  );
}
