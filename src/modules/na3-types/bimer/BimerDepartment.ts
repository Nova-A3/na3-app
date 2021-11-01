import type { BimerCompany } from "./BimerCompany";

export type BimerDepartment = {
  Empresa: BimerCompany;
  Identificador: string;
  Ativo: boolean;
  Codigo: string;
  ControlaEstoque: boolean;
  ControlaLote: boolean;
  Descricao: string;
  Observacao?: string;
};
