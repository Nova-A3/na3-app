import { Layout } from "antd";
import React from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";

import { Breadcrumb } from "../breadcrumb/Breadcrumb";
import classes from "./Content.module.css";

type ContentProps = {
  children: React.ReactNode;
};

export function Content({ children }: ContentProps): JSX.Element {
  const { currentTheme } = useThemeSwitcher();

  return (
    <Layout.Content
      className={classes.Container}
      style={{ backgroundColor: currentTheme === "light" ? "#fff" : "#111" }}
    >
      <Breadcrumb />

      <div className={classes.Screen}>{children}</div>
    </Layout.Content>
  );
}
