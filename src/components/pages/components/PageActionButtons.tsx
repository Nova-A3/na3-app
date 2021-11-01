import { Space } from "antd";
import React from "react";
import classes from "./PageActionButtons.module.css";

type PageActionButtonsProps = {
  children?: React.ReactNode;
};

export function PageActionButtons({
  children,
}: PageActionButtonsProps): JSX.Element {
  return <Space className={classes.Container}>{children}</Space>;
}
