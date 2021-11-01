import type { Na3App, Na3AppId } from "./Na3App";
import type { Na3Machine } from "./Na3Machine";
import type { Na3User } from "./Na3User";

export type Na3DepartmentType = "factory-adm" | "office" | "shop-floor";

export type Na3DepartmentIdMap = {
  "shop-floor":
    | "corte-solda-luva"
    | "corte-solda-saco"
    | "corte"
    | "dobra"
    | "ekoplasto"
    | "extrusao"
    | "flexografia-papel"
    | "flexografia-plastico"
    | "kit-automatico"
    | "kit-manual"
    | "off-set"
    | "reciclagem"
    | "super-kit";
  "factory-adm": "administrativo" | "manutencao" | "pcp" | "qualidade";
  office: "comex" | "desenvolvimento" | "diretoria";
};

export type Na3DepartmentId<T extends Na3DepartmentType = Na3DepartmentType> =
  Na3DepartmentIdMap[T];

export type Na3DepartmentLocationMap = {
  "shop-floor": "factory";
  "factory-adm": "factory";
  office: "office";
};

export type Na3DepartmentLocation =
  Na3DepartmentLocationMap[keyof Na3DepartmentLocationMap];

export type Na3Department<T extends Na3DepartmentType = Na3DepartmentType> = {
  type: T;
  id: Na3DepartmentIdMap[T];
  name: string;
  displayName: string;
  location: T extends "office" ? "office" : "factory";
  people: Na3User[];
  apps: Partial<Record<Na3AppId, Na3App>>;
  style: { colors: { background: string; text: string } };

  /* Shop-floor only */
  twoLetterId: T extends "shop-floor" ? string : never;
  machines: T extends "shop-floor" ? Record<string, Na3Machine> : never;
};
