import type { Na3App, Na3AppId } from "./Na3App";
import type { Na3Machine } from "./Na3Machine";
import type { Na3User } from "./Na3User";

export type Na3DepartmentType = "factory-adm" | "office" | "shop-floor";

export type Na3DepartmentIdMap = {
  "factory-adm": "administrativo" | "manutencao" | "pcp" | "qualidade";
  office: "comex" | "desenvolvimento" | "diretoria";
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
};

export type Na3DepartmentId<T extends Na3DepartmentType = Na3DepartmentType> =
  Na3DepartmentIdMap[T];

export type Na3DepartmentLocationMap = {
  "factory-adm": "factory";
  office: "office";
  "shop-floor": "factory";
};

export type Na3DepartmentLocation =
  Na3DepartmentLocationMap[keyof Na3DepartmentLocationMap];

export type Na3Department<T extends Na3DepartmentType = Na3DepartmentType> = {
  apps: Partial<Record<Na3AppId, Na3App>>;
  displayName: string;
  id: Na3DepartmentIdMap[T];
  location: T extends "office" ? "office" : "factory";
  machines: T extends "shop-floor" ? Record<string, Na3Machine> : never;
  name: string;
  people: Na3User[];
  style: { colors: { background: string; text: string } };

  /* Shop-floor only */
  twoLetterId: T extends "shop-floor" ? string : never;
  type: T;
};
