import { Tag } from "antd";
import React from "react";

import { EMPLOYEES } from "../../../../../constants";

type ServiceOrderMaintainerTagProps = {
  maintainer: string;
};

export function ServiceOrderMaintainerTag({
  maintainer,
}: ServiceOrderMaintainerTagProps): JSX.Element {
  return (
    <Tag
      color={
        EMPLOYEES.MAINTENANCE.find(
          (employee) =>
            employee.name.toLowerCase().trim() ===
            maintainer.toLowerCase().trim()
        )?.color ||
        (EMPLOYEES.MAINTENANCE.find((employee) => employee.color === "blue")
          ? undefined
          : "blue")
      }
    >
      <small>
        <strong>{maintainer}</strong>
      </small>
    </Tag>
  );
}
