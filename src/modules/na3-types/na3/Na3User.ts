import type { Na3App, Na3AppId } from "./Na3App";
import type { Na3DepartmentId } from "./Na3Department";

export type Na3User = {
  department: Na3DepartmentId;
  id: Lowercase<string>;
  name: string;
  displayName: string;
  apps: Partial<Record<Na3AppId, Na3App>>;
};
