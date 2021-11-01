import { Layout } from "antd";
import React from "react";
import { Breadcrumb } from "../breadcrumb/Breadcrumb";
import classes from "./Content.module.css";

type ContentProps = {
  children: React.ReactNode;
};

export function Content({ children }: ContentProps): JSX.Element {
  return (
    <Layout.Content className={classes.Container}>
      <Breadcrumb />

      <div className={classes.Screen}>{children}</div>
    </Layout.Content>
  );
}
