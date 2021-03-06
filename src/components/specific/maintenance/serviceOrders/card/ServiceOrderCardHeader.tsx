import React from "react";

import type { Na3ServiceOrder } from "../../../../../modules/na3-types";
import { PriorityTag } from "../../../../ui/Tag/PriorityTag";
import classes from "./ServiceOrderCardHeader.module.css";
import { ServiceOrderStatusBadge } from "./ServiceOrderStatusBadge";

type ServiceOrderCardHeaderProps = {
  isStatusHidden?: boolean;
  priority: Na3ServiceOrder["priority"];
  status: Na3ServiceOrder["status"];
};

const defaultProps = {
  isStatusHidden: false,
};

export function ServiceOrderCardHeader({
  priority,
  status,
  isStatusHidden,
}: ServiceOrderCardHeaderProps): JSX.Element {
  return (
    <div className={classes.Header}>
      {!isStatusHidden && <ServiceOrderStatusBadge status={status} />}

      {priority && status === "solving" && <PriorityTag priority={priority} />}
    </div>
  );
}

ServiceOrderCardHeader.defaultProps = defaultProps;
