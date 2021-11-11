import { Typography } from "antd";
import React from "react";

type FieldPreSuffixProps = {
  children: React.ReactNode;
};

export function FieldPreSuffix({ children }: FieldPreSuffixProps): JSX.Element {
  if (typeof children === "string") {
    return (
      <Typography.Text italic={true} type="secondary">
        {children}
      </Typography.Text>
    );
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}
