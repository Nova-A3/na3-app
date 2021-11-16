import { Card, Col, Statistic } from "antd";
import React, { useMemo } from "react";

import type { Na3ServiceOrder } from "../../../../../modules/na3-types";
import { Page } from "../../../../pages/Page";
import { Divider } from "../../../../ui/Divider/Divider";
import { ServiceOrderStatusBadge } from "../card/ServiceOrderStatusBadge";
import { MaintServiceOrdersList } from "../MaintServiceOrdersList";
import classes from "./MaintDashboardColumn.module.css";

type MaintDashboardColumnProps = {
  className?: string;
  data: Na3ServiceOrder[];
  dividerClassName?: string;
  onSelectOrder: ((serviceOrder: Na3ServiceOrder) => void) | null;
  status: Na3ServiceOrder["status"];
};

const defaultProps = {
  className: undefined,
  dividerClassName: undefined,
};

export function MaintDashboardColumn({
  data,
  onSelectOrder,
  status,
  className,
  dividerClassName,
}: MaintDashboardColumnProps): JSX.Element {
  const cardRenderOptions = useMemo(
    () => ({ hideStatus: true, hideUrgencyRibbon: true }),
    []
  );

  return (
    <Col className={className} span={6}>
      <Card className={classes.StatisticCard}>
        <Statistic
          title={<ServiceOrderStatusBadge status={status} />}
          value={data.length}
        />
      </Card>

      <Divider className={dividerClassName} marginBottom={0} marginTop={8} />

      <Page additionalPaddingBottom={8}>
        <MaintServiceOrdersList
          cardRenderOptions={cardRenderOptions}
          data={data}
          isSearchDisabled={true}
          onSelectOrder={onSelectOrder}
        />
      </Page>
    </Col>
  );
}

MaintDashboardColumn.defaultProps = defaultProps;
