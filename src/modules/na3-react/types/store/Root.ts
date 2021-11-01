import type { AuthState } from "./Auth";
import type { ConfigState } from "./Config";
import type { DepartmentsState } from "./Departments";
import type { GlobalState } from "./Global";
import type { LabelTemplatesState } from "./LabelTemplates";
import type { ServiceOrdersState } from "./ServiceOrders";

export type RootState = {
  auth: AuthState;
  config: ConfigState;
  departments: DepartmentsState;
  global: GlobalState;
  labelTemplates: LabelTemplatesState;
  serviceOrders: ServiceOrdersState;
};
