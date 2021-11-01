import { Layout } from "antd";
import dayjs from "dayjs";
import React from "react";
import classes from "./Footer.module.css";

export function Footer(): JSX.Element {
  return (
    <Layout.Footer className={classes.Footer}>
      Nova A3 ©{dayjs().format("YYYY")} Todos os direitos reservados
    </Layout.Footer>
  );
}
