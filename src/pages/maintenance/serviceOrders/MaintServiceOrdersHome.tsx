import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Grid, Row } from "antd";
import React, { useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";

import {
  MaintCreateServiceOrderForm,
  MaintServiceOrdersList,
  PageActionButtons,
  PageTitle,
} from "../../../components";
import { useNa3ServiceOrders } from "../../../modules/na3-react";
import classes from "./MaintServiceOrdersHome.module.css";

export function MaintServiceOrdersHomePage(): JSX.Element {
  const history = useHistory();
  const breakpoint = Grid.useBreakpoint();

  const serviceOrders = useNa3ServiceOrders();

  const handleCreateServiceOrderClick = useCallback(() => {
    history.push("/manutencao/os/abrir-os");
  }, [history]);

  const userOrders = useMemo(
    () => serviceOrders.helpers.getDepartmentOrders(),
    [serviceOrders.helpers]
  );

  const listData = useMemo(
    () =>
      serviceOrders.helpers.sortByStatus(
        ["solved", "solving", "pending", "closed"],
        userOrders
      ),
    [serviceOrders.helpers, userOrders]
  );

  const handleSelectServiceOrder = useCallback(() => {
    return;
  }, []);

  return (
    <>
      <PageTitle>Manutenção • Ordens de Serviço</PageTitle>

      {!breakpoint.md && (
        <PageActionButtons>
          <Button
            icon={<PlusCircleOutlined />}
            onClick={handleCreateServiceOrderClick}
            type="primary"
          >
            Abrir OS
          </Button>
        </PageActionButtons>
      )}

      <Row className={classes.PageRow} gutter={28}>
        <Col className={classes.PageGridCol} md={8} xs={24}>
          <div className={classes.ListTitle}>
            <Divider orientation="left">Suas OS</Divider>
          </div>

          <div className={classes.PageContent}>
            <MaintServiceOrdersList
              data={listData}
              onSelectOrder={handleSelectServiceOrder}
            />
          </div>
        </Col>

        <Col className={classes.PageGridCol} md={16} xs={0}>
          <div>
            <Divider orientation="left">Abrir OS</Divider>
          </div>

          <div className={classes.PageContent}>
            <MaintCreateServiceOrderForm />
          </div>
        </Col>
      </Row>
    </>
  );
}
