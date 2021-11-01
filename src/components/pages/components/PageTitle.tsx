import { Divider } from "antd";
import React from "react";

import classes from "./PageTitle.module.css";

type PageTitleProps = {
  icon?: React.ReactNode;
  children?: React.ReactNode;
};

const defaultProps: PageTitleProps = {
  children: null,
  icon: null,
};

export function PageTitle({ icon, children }: PageTitleProps): JSX.Element {
  return (
    <Divider className={classes.Container} orientation="left">
      {icon && <span className={classes.Icon}>{icon}</span>}

      {children}
    </Divider>
  );
}

PageTitle.defaultProps = defaultProps;
