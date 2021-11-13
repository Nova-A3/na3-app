import type { TagProps } from "antd";

export type Employee = {
  color: TagProps["color"];
  name: string;
};

export const EMPLOYEES: Record<"MAINTENANCE", Employee[]> = {
  MAINTENANCE: [
    { color: "magenta", name: "Diego" },
    { color: "red", name: "Leandro" },
    { color: "volcano", name: "Gustavo" },
    { color: "orange", name: "Eduardo" },
    { color: "gold", name: "Tadeu" },
    { color: "lime", name: "Giacomo" },
    { color: "green", name: "Vanderson" },
    { color: "cyan", name: "Giovanna" },
  ],
};
