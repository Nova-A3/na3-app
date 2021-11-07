import { Col, Layout, Row, Typography } from "antd";
import dayjs from "dayjs";
import React from "react";

import { DO_NOT_CHANGE_MANUALLY_VERSION } from "../../../constants/meta";
import classes from "./Footer.module.css";

export function Footer(): JSX.Element {
  return (
    <Row>
      <Col md={24} xs={0}>
        <div className={classes.Container}>
          <Layout.Footer className={classes.Footer}>
            Nova A3 ©{dayjs().format("YYYY")} Todos os direitos reservados
          </Layout.Footer>

          <Typography.Text italic={true} type="secondary">
            v{DO_NOT_CHANGE_MANUALLY_VERSION}
          </Typography.Text>
        </div>
      </Col>
    </Row>
  );
}
