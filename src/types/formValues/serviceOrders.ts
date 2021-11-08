import type { Na3DepartmentId } from "../../modules/na3-types";

export type MaintCreateServiceOrderValidFormValues = {
  additionalInfo: string;
  cause: "eletrica" | "machineAdjustment" | "mecanica";
  departmentDisplayName: string;
  departmentId: Na3DepartmentId | "";
  didStopLine: boolean;
  didStopMachine: boolean;
  didStopProduction: boolean;
  issue: string;
  machineId: string;
  maintenanceType: "corretiva" | "preditiva" | "preventiva";
  team: "eletrica" | "mecanica" | "predial";
};

export type MaintCreateServiceOrderFormValues = Omit<
  MaintCreateServiceOrderValidFormValues,
  "cause" | "maintenanceType" | "team"
> & {
  [Key in "cause" | "maintenanceType" | "team"]:
    | MaintCreateServiceOrderValidFormValues[Key]
    | "";
};
