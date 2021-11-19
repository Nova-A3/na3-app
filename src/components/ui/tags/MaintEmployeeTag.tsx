import { Tag } from "antd";
import React, { useMemo } from "react";

import { EMPLOYEES } from "../../../constants";

type MaintEmployeeTagProps = {
  maintainer: string;
};

export function MaintEmployeeTag({
  maintainer,
}: MaintEmployeeTagProps): JSX.Element {
  const employeeColor = useMemo(
    () =>
      EMPLOYEES.MAINTENANCE.find(
        (employee) =>
          employee.name.toLowerCase().trim() === maintainer.toLowerCase().trim()
      )?.color || "blue",
    [maintainer]
  );

  return (
    <Tag color={employeeColor}>
      <small>
        <strong>{maintainer}</strong>
      </small>
    </Tag>
  );
}
