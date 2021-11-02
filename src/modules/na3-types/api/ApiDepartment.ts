import type { ApiCompany } from "./ApiCompany";

export type ApiDepartment = {
  active: boolean;
  code: string;
  company: ApiCompany;
  description: string;
  id: string;
  note: string | null;
  permissions: {
    batches: boolean;
    inventory: boolean;
  };
};
