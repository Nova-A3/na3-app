import { Typography } from "antd";
import React from "react";

type PageDescriptionProps = {
  children?: React.ReactNode;
};

export function PageDescription({
  children,
}: PageDescriptionProps): JSX.Element {
  return (
    <Typography.Paragraph italic={true} type="secondary">
      {children}
    </Typography.Paragraph>
  );
}
