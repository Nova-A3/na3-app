import { Layout } from "antd";
import React from "react";
import classes from "./Header.module.css";

const HEADER_IS_ENABLED: boolean = false;

export function Header(): JSX.Element | null {
  return HEADER_IS_ENABLED ? (
    <Layout.Header className={classes.Header} />
  ) : null;
}
