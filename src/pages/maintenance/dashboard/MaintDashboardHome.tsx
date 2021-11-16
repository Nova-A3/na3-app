import { Alert, Grid, Row } from "antd";
import React, { useMemo, useState } from "react";

import {
  MaintDashboardColumn,
  MaintServiceOrdersList,
  PageTitle,
} from "../../../components";
import { useNa3ServiceOrders } from "../../../modules/na3-react";
import type { Na3ServiceOrder } from "../../../modules/na3-types";
import classes from "./MaintDashboardHome.module.css";

export function MaintDashboardHomePage(): JSX.Element {
  const breakpoint = Grid.useBreakpoint();

  const serviceOrders = useNa3ServiceOrders();

  const [selectedOrder, setSelectedOrder] = useState<Na3ServiceOrder>();

  const serviceOrdersByStatus = useMemo(
    () => serviceOrders.helpers.mapByStatus(),
    [serviceOrders.helpers]
  );

  const mobileListData = useMemo(
    () => [
      ...serviceOrders.helpers.sortByStatus(["pending"]).reverse(),
      ...serviceOrders.helpers.sortByPriority(
        serviceOrders.helpers.sortByStatus(["solving"])
      ),
    ],
    [serviceOrders.helpers]
  );

  return (
    <>
      <PageTitle>
        Manutenção • {breakpoint.lg ? "Dashboard" : "Ordens de Serviço"}
      </PageTitle>

      {!breakpoint.lg && (
        <Alert
          className={classes.MobileAlert}
          closable={true}
          message="Esta página é melhor visualizada no computador."
          showIcon={true}
          type="warning"
        />
      )}

      {breakpoint.lg ? (
        <Row className={classes.DashboardRow} gutter={16}>
          <MaintDashboardColumn
            className={classes.DashboardCol}
            data={serviceOrdersByStatus.pending}
            onSelectOrder={setSelectedOrder}
            status="pending"
          />

          <MaintDashboardColumn
            className={classes.DashboardCol}
            data={serviceOrders.helpers.sortByPriority(
              serviceOrdersByStatus.solving
            )}
            onSelectOrder={setSelectedOrder}
            status="solving"
          />

          <MaintDashboardColumn
            className={classes.DashboardCol}
            data={serviceOrdersByStatus.solved}
            onSelectOrder={null}
            status="solved"
          />

          <MaintDashboardColumn
            className={classes.DashboardCol}
            data={serviceOrdersByStatus.closed.reverse()}
            onSelectOrder={null}
            status="closed"
          />
        </Row>
      ) : (
        <MaintServiceOrdersList
          cardRenderOptions={{ hideUrgencyRibbon: true }}
          data={mobileListData}
          onSelectOrder={setSelectedOrder}
        />
      )}
    </>
  );
}