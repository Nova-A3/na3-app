import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Grid, Row } from "antd";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

import {
  MaintServiceOrdersList,
  PageActionButtons,
  PageTitle,
} from "../../../components";
import { useNa3Auth } from "../../../modules/na3-react";
import type { Na3ServiceOrder } from "../../../modules/na3-types";
import classes from "./MaintServiceOrdersHome.module.css";

export function MaintServiceOrdersHomePage(): JSX.Element {
  const history = useHistory();
  const breakpoint = Grid.useBreakpoint();

  const { department } = useNa3Auth();

  const handleCreateServiceOrderClick = useCallback(() => {
    history.push("/manutencao/os/abrir-os");
  }, [history]);

  const handleFilterUserServiceOrders = useCallback(
    (serviceOrder: Na3ServiceOrder): boolean =>
      serviceOrder.username === department?.id,
    [department?.id]
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

      <Row className={classes.PageRow} gutter={12}>
        <Col className={classes.PageGridCol} md={8} xs={24}>
          <div>
            <Divider orientation="left">Suas OS</Divider>
          </div>

          <div className={classes.PageContent}>
            <MaintServiceOrdersList
              filterData={handleFilterUserServiceOrders}
              onSelectOrder={handleSelectServiceOrder}
            />
          </div>
        </Col>

        <Col md={16} xs={0}>
          <Divider orientation="left">Abrir OS</Divider>
        </Col>
      </Row>
    </>
  );
}
