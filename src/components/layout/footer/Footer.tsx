import { Col, Layout, Row } from "antd";
import dayjs from "dayjs";
import React from "react";

import classes from "./Footer.module.css";

export function Footer(): JSX.Element {
  return (
    <Row>
      <Col md={24} xs={0}>
        <Layout.Footer className={classes.Footer}>
          Nova A3 ©{dayjs().format("YYYY")} Todos os direitos reservados
        </Layout.Footer>
      </Col>
    </Row>
  );
}
