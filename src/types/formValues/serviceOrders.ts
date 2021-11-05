import type { Na3DepartmentId } from "../../modules/na3-types";

export type MaintCreateServiceOrderFormValues = {
  additionalInfo: string;
  cause: "eletrica" | "machineAdjustment" | "mecanica";
  departmentDisplayName: string;
  departmentId: Na3DepartmentId;
  didStopLine: boolean;
  didStopMachine: boolean;
  didStopProduction: boolean;
  issue: string;
  machineId: string;
  maintenanceType: "corretiva" | "preditiva" | "preventiva";
  team: "eletrica" | "mecanica" | "predial";
};
