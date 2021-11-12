import React from "react";

import type { Na3ServiceOrder } from "../../../../../modules/na3-types";
import classes from "./ServiceOrderCardHeader.module.css";
import { ServiceOrderPriorityTag } from "./ServiceOrderPriorityTag";
import { ServiceOrderStatusBadge } from "./ServiceOrderStatusBadge";

type ServiceOrderCardHeaderProps = {
  priority: Na3ServiceOrder["priority"];
  status: Na3ServiceOrder["status"];
};

export function ServiceOrderCardHeader({
  priority,
  status,
}: ServiceOrderCardHeaderProps): JSX.Element {
  return (
    <div className={classes.Header}>
      <ServiceOrderStatusBadge status={status} />

      {priority && status === "solving" && (
        <ServiceOrderPriorityTag priority={priority} />
      )}
    </div>
  );
}
