import { Tag } from "antd";
import React from "react";

import { PRIORITY_VALUES } from "../../../constants";
import classes from "./PriorityTag.module.css";

type PriorityTagProps = {
  marginRight?: "default";
  priority: keyof typeof PRIORITY_VALUES;
};

const defaultProps = {
  marginRight: undefined,
};

export function PriorityTag({
  priority,
  marginRight,
}: PriorityTagProps): JSX.Element {
  return (
    <Tag
      className={marginRight === "default" ? undefined : classes.Tag}
      color={PRIORITY_VALUES[priority].color}
    >
      <small>
        <strong>{PRIORITY_VALUES[priority].text}</strong>
      </small>
    </Tag>
  );
}

PriorityTag.defaultProps = defaultProps;
