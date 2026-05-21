/**
 * Tipos parciais das principais entidades IXC.
 *
 * Cobertura mínima dos campos que CRM/agentes IA vão usar.
 * Ampliar conforme necessidade — IXC tem 100+ campos por entidade.
 *
 * Referência: https://wikiapiprovedor.ixcsoft.com.br/index.php
 */

/** Cliente — cadastro principal */
export interface IXCCliente {
  id: string;
  ativo: "S" | "N";
  tipo_pessoa: "F" | "J"; // Física | Jurídica
  razao: string; // nome ou razão social
  fantasia?: string;
  cnpj_cpf: string;
  rg?: string;
  endereco: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cep?: string;
  cidade?: string;
  uf?: string;
  email?: string;
  telefone_celular?: string;
  telefone_secundario?: string;
  whatsapp?: string;
  data_nascimento?: string;
  data_cadastro?: string;
  observacoes?: string;
}

/** Contrato — vínculo cliente↔plano */
export interface IXCClienteContrato {
  id: string;
  id_cliente: string;
  id_vd_contrato?: string;
  status: "A" | "I" | "D" | "C"; // Ativo | Inativo | Desistente | Cancelado
  tipo_cobranca?: string;
  endereco_instalacao?: string;
  data_ativacao?: string;
  data_cancelamento?: string;
  motivo_cancelamento?: string;
  vencimento?: string; // dia do mês
  valor_mensal?: string;
  observacoes?: string;
}

/** Boleto / título a receber */
export interface IXCBoleto {
  id: string;
  id_cliente: string;
  id_cliente_contrato?: string;
  data_vencimento: string;
  data_emissao: string;
  data_pagamento?: string;
  status: "A" | "R" | "C"; // Aberto | Recebido | Cancelado
  valor: string;
  valor_pago?: string;
  juros?: string;
  multa?: string;
  desconto?: string;
  linha_digitavel?: string;
  url_boleto?: string;
  observacoes?: string;
}

/** ONU — equipamento técnico (provedor) */
export interface IXCONU {
  id: string;
  id_transmissor: string; // OLT
  id_cliente_contrato?: string;
  serial: string;
  modelo?: string;
  status: "O" | "F"; // Online | Offline
  signal_rx?: string;
  signal_tx?: string;
  ultima_conexao?: string;
  ultima_desconexao?: string;
  endereco_ip?: string;
}

/** Chamado / OS técnica */
export interface IXCChamadoOS {
  id: string;
  id_cliente?: string;
  id_assunto?: string;
  id_tipo?: string;
  id_setor?: string;
  status: "A" | "F" | "C"; // Aberto | Fechado | Cancelado
  prioridade?: "B" | "M" | "A" | "U"; // Baixa, Média, Alta, Urgente
  data_abertura: string;
  data_fechamento?: string;
  titulo?: string;
  descricao?: string;
  solucao?: string;
  responsavel?: string;
}

/** Usuário Radius (autenticação PPPoE) */
export interface IXCRadUsuario {
  id: string;
  id_cliente_contrato?: string;
  username: string;
  password?: string;
  ativo: "S" | "N";
  ip_fixo?: string;
  velocidade_up?: string;
  velocidade_down?: string;
}

/** Manutenção programada / rompimento */
export interface IXCManutencao {
  id: string;
  id_pop?: string;
  id_transmissor?: string;
  status: "A" | "F";
  data_inicio: string;
  data_fim?: string;
  motivo?: string;
  bairros_afetados?: string;
  observacoes?: string;
}
