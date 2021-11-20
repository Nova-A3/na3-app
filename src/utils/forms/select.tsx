import { Tag } from "antd";
import React from "react";
import type { ConditionalPick } from "type-fest";
import type { Falsy } from "utility-types";

import type {
  AutoCompleteOptionBase,
  SelectOptionBase,
} from "../../components";
import { EMPLOYEES } from "../../constants";

type OptionsGeneratorExtractor<Data, FnReturn> =
  | Extract<keyof ConditionalPick<Data, string>, string>
  | ((item: ConditionalPick<Data, string>) => FnReturn);

export function generateSelectOptions<T extends Record<string, unknown>>(
  data: Array<T> | Falsy,
  valueExtractor: OptionsGeneratorExtractor<T, string>,
  labelExtractor?: OptionsGeneratorExtractor<T, React.ReactNode>,
  labelWhenSelectedExtractor?: OptionsGeneratorExtractor<T, React.ReactNode>
): (AutoCompleteOptionBase & SelectOptionBase)[] {
  if (!data) return [];

  return data.map((item) => {
    const value =
      typeof valueExtractor === "string"
        ? (item[valueExtractor] as string)
        : valueExtractor(item);
    const label =
      typeof labelExtractor === "string"
        ? item[labelExtractor]
        : labelExtractor?.(item);
    const labelWhenSelected =
      typeof labelWhenSelectedExtractor === "string"
        ? item[labelWhenSelectedExtractor]
        : labelWhenSelectedExtractor?.(item);

    return {
      label: label || value,
      labelWhenSelected,
      value,
    };
  });
}

export const maintEmployeeSelectOptions: SelectOptionBase[] = [
  ...EMPLOYEES.MAINTENANCE,
]
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((maintainer) => ({
    label: maintainer.name,
    labelWhenSelected: <Tag color={maintainer.color}>{maintainer.name}</Tag>,
    value: maintainer.name,
  }));

export const serviceOrderPrioritySelectOptions: SelectOptionBase[] = [
  {
    label: "Alta",
    labelWhenSelected: <Tag color="success">ALTA</Tag>,
    value: "high",
  },
  {
    label: "Média",
    labelWhenSelected: <Tag color="warning">Média</Tag>,
    value: "medium",
  },
  {
    label: "Baixa",
    labelWhenSelected: <Tag color="error">BAIXA</Tag>,
    value: "low",
  },
];
