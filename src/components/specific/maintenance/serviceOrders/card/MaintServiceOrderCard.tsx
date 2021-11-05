import { Card, Divider, Row, Typography } from "antd";
import React, { useCallback, useMemo } from "react";
import {
  IoCheckmarkDoneOutline,
  IoCreateOutline,
  IoLockClosedOutline,
  IoThumbsUpOutline,
} from "react-icons/io5";

import type { Na3ServiceOrder } from "../../../../../modules/na3-types";
import classes from "./MaintServiceOrderCard.module.css";
import { ServiceOrderPriorityTag } from "./ServiceOrderPriorityTag";
import { ServiceOrderStatusBadge } from "./ServiceOrderStatusBadge";
import { ServiceOrderStep } from "./ServiceOrderStep";

type MaintServiceOrderCardProps = {
  data: Na3ServiceOrder;
  onSelect: ((serviceOrder: Na3ServiceOrder) => void) | null;
};

export function MaintServiceOrderCard({
  data,
  onSelect,
}: MaintServiceOrderCardProps): JSX.Element {
  const handleClick = useCallback(() => {
    if (onSelect) onSelect(data);
  }, [onSelect, data]);

  const cardBodyStyle = useMemo(
    () => ({ paddingBottom: 20, paddingTop: 12 }),
    []
  );

  return (
    <Card
      bodyStyle={cardBodyStyle}
      className={classes.Card}
      hoverable={!!onSelect}
      onClick={handleClick}
    >
      <div className={classes.Header}>
        <ServiceOrderStatusBadge status={data.status} />

        {data.priority && data.status === "solving" && (
          <ServiceOrderPriorityTag priority={data.priority} />
        )}
      </div>

      <small className={classes.IdText}>
        <Typography.Text italic={true} type="secondary">
          #{data.id}
        </Typography.Text>
      </small>

      <Typography.Title className={classes.Title} level={5}>
        {data.description}
      </Typography.Title>

      <Divider className={classes.Divider} />

      <Row>
        <ServiceOrderStep
          icon={<IoCreateOutline />}
          timestamp={data.createdAt}
        />
        <ServiceOrderStep
          icon={<IoThumbsUpOutline />}
          timestamp={data.acceptedAt}
        />
        <ServiceOrderStep
          icon={<IoCheckmarkDoneOutline />}
          timestamp={data.solvedAt}
        />
        <ServiceOrderStep
          icon={<IoLockClosedOutline />}
          timestamp={data.closedAt}
        />
      </Row>
    </Card>
  );
}
