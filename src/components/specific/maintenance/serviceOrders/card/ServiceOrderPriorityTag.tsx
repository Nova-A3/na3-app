import { Tag } from "antd";
import React, { useMemo } from "react";

import type { Na3ServiceOrder } from "../../../../../modules/na3-types";
import classes from "./ServiceOrderPriorityTag.module.css";

type ServiceOrderPriorityTagProps = {
  priority: NonNullable<Na3ServiceOrder["priority"]>;
};

export function ServiceOrderPriorityTag({
  priority: orderPriority,
}: ServiceOrderPriorityTagProps): JSX.Element {
  const tagConfig = useMemo(() => {
    switch (orderPriority) {
      case "high":
        return { color: "success", text: "ALTA" };
      case "medium":
        return { color: "warning", text: "MÉDIA" };
      case "low":
        return { color: "error", text: "BAIXA" };
    }
  }, [orderPriority]);

  return (
    <Tag className={classes.Tag} color={tagConfig.color}>
      <small>
        <strong>{tagConfig.text}</strong>
      </small>
    </Tag>
  );
}
