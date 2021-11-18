import { Tag } from "antd";
import React from "react";

import type { SelectProps } from "../../components";
import { EMPLOYEES } from "../../constants";

export const maintEmployeeSelectOptions: SelectProps["options"] = [
  ...EMPLOYEES.MAINTENANCE,
]
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((maintainer) => ({
    label: maintainer.name,
    labelWhenSelected: <Tag color={maintainer.color}>{maintainer.name}</Tag>,
    value: maintainer.name,
  }));

export const serviceOrderPrioritySelectOptions: SelectProps["options"] = [
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
