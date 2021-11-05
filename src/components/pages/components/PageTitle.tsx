import { Divider } from "antd";
import React from "react";

import classes from "./PageTitle.module.css";

type PageTitleProps = {
  children?: React.ReactNode;
  icon?: React.ReactNode;
};

const defaultProps: PageTitleProps = {
  children: null,
  icon: null,
};

export function PageTitle({ icon, children }: PageTitleProps): JSX.Element {
  return (
    <div>
      <Divider className={classes.Container} orientation="left">
        {icon && <span className={classes.Icon}>{icon}</span>}

        {children}
      </Divider>
    </div>
  );
}

PageTitle.defaultProps = defaultProps;
