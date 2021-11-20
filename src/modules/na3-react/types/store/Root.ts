import type { AuthState } from "./Auth";
import type { ConfigState } from "./Config";
import type { DepartmentsState } from "./Departments";
import type { GlobalState } from "./Global";
import type { LabelTemplatesState } from "./LabelTemplates";
import type { MaintProjectsState } from "./MaintProjects";
import type { Na3PeopleState } from "./Na3People";
import type { ServiceOrdersState } from "./ServiceOrders";

export type RootState = {
  auth: AuthState;
  config: ConfigState;
  departments: DepartmentsState;
  global: GlobalState;
  labelTemplates: LabelTemplatesState;
  maintProjects: MaintProjectsState;
  na3People: Na3PeopleState;
  serviceOrders: ServiceOrdersState;
};
