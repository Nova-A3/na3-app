import { Tag } from "antd";
import React, { useMemo } from "react";

import type { Na3MaintenanceProject } from "../../../../../modules/na3-types";
import classes from "./MaintProjectPriorityTag.module.css";

type MaintProjectPriorityTagProps = {
  priority: Na3MaintenanceProject["priority"];
};

export function MaintProjectPriorityTag({
  priority: projectPriority,
}: MaintProjectPriorityTagProps): JSX.Element {
  const tagConfig = useMemo(() => {
    switch (projectPriority) {
      case "high":
        return { color: "error", text: "ALTA" };
      case "medium":
        return { color: "warning", text: "MÉDIA" };
      case "low":
        return { color: "success", text: "BAIXA" };
    }
  }, [projectPriority]);

  return (
    <Tag className={classes.Tag} color={tagConfig.color}>
      <small>
        <strong>{tagConfig.text}</strong>
      </small>
    </Tag>
  );
}
