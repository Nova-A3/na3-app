import { Alert, Grid, Row } from "antd";
import React, { useCallback, useMemo } from "react";
import { useHistory } from "react-router";

import {
  MaintDashboardColumn,
  MaintServiceOrdersList,
  PageTitle,
} from "../../../components";
import { useQuery } from "../../../hooks";
import { useNa3ServiceOrders } from "../../../modules/na3-react";
import type { Na3ServiceOrder } from "../../../modules/na3-types";
import { MaintServiceOrderDetailsPage } from "../serviceOrders/MaintServiceOrderDetails";
import classes from "./MaintDashboardHome.module.css";

export function MaintDashboardHomePage(): JSX.Element {
  const history = useHistory();
  const query = useQuery("numero");

  const breakpoint = Grid.useBreakpoint();

  const serviceOrders = useNa3ServiceOrders();

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

  const handleOrderSelect = useCallback(
    (serviceOrder: Na3ServiceOrder) => {
      history.push(`/manutencao/dashboard?numero=${serviceOrder.id}`);
    },
    [history]
  );

  return query.numero ? (
    <MaintServiceOrderDetailsPage
      hasCameFromDashboard={true}
      serviceOrderId={query.numero}
    />
  ) : (
    <>
      <PageTitle>
        Manutenção • {breakpoint.lg ? "Dashboard" : "OS Pendentes"}
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
            onSelectOrder={handleOrderSelect}
            status="pending"
          />

          <MaintDashboardColumn
            className={classes.DashboardCol}
            data={serviceOrders.helpers.sortByPriority(
              serviceOrdersByStatus.solving
            )}
            onSelectOrder={handleOrderSelect}
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
          onSelectOrder={handleOrderSelect}
        />
      )}
    </>
  );
}
