import type { ApiCompany } from "./ApiCompany";

export type ApiDepartment = {
  company: ApiCompany;
  id: string;
  code: string;
  active: boolean;
  permissions: {
    inventory: boolean;
    batches: boolean;
  };
  description: string;
  note: string | null;
};
