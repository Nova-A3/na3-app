import { Typography } from "antd";
import React from "react";

import classes from "./PageDescription.module.css";

type PageDescriptionProps = {
  children?: React.ReactNode;
  className?: string;
};

const defaultProps: PageDescriptionProps = {
  children: null,
  className: undefined,
};

export function PageDescription({
  children,
  className,
}: PageDescriptionProps): JSX.Element {
  return (
    <Typography.Paragraph
      className={`${classes.Description} ${className ? className : ""}`}
      italic={true}
      type="secondary"
    >
      {children}
    </Typography.Paragraph>
  );
}

PageDescription.defaultProps = defaultProps;
