import { Col, Row } from "antd";
import React from "react";

import classes from "./ServiceOrderDetailsItem.module.css";

type ServiceOrderDetailsItemProps = {
  children: React.ReactNode;
  isStacked?: boolean;
  label: string;
};

const defaultProps: Omit<ServiceOrderDetailsItemProps, "children" | "label"> = {
  isStacked: false,
};

export function ServiceOrderDetailsItem({
  label,
  children,
  isStacked,
}: ServiceOrderDetailsItemProps): JSX.Element {
  return (
    <Row className={classes.Container}>
      <Col
        className={isStacked ? classes.StackedLabel : undefined}
        span={isStacked ? 24 : 12}
      >
        <div>
          {label}
          {isStacked && !label.endsWith(":") ? ":" : ""}
        </div>
      </Col>

      <Col span={isStacked ? 24 : 12}>{children}</Col>
    </Row>
  );
}

ServiceOrderDetailsItem.defaultProps = defaultProps;
