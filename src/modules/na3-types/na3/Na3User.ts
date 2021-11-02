import type { Na3App, Na3AppId } from "./Na3App";
import type { Na3DepartmentId } from "./Na3Department";

export type Na3User = {
  apps: Partial<Record<Na3AppId, Na3App>>;
  department: Na3DepartmentId;
  displayName: string;
  id: Lowercase<string>;
  name: string;
};
