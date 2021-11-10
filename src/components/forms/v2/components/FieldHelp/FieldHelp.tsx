import { LoadingOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import React from "react";

import type { FieldStatus } from "../../FormField/FormField";
import classes from "./FieldHelp.module.css";

type FieldHelpProps = {
  defaultText: string | undefined;
  error: string | undefined;
  fieldStatus: FieldStatus;
  isHidden: boolean;
  textWhenLoading: string | undefined;
};

export function FieldHelp({
  defaultText,
  error,
  fieldStatus,
  isHidden,
  textWhenLoading,
}: FieldHelpProps): JSX.Element | null {
  if (isHidden) return null;

  switch (fieldStatus) {
    case "loading":
      return (
        <Typography.Text className={classes.Loading}>
          <LoadingOutlined /> {textWhenLoading || "Carregando..."}
        </Typography.Text>
      );
    case "invalid":
      return (
        <Typography.Text type="danger">
          {error || "Campo inválido"}
        </Typography.Text>
      );
    case "valid":
      return (
        <Typography.Text type="success">
          {defaultText || "Parece bom!"}
        </Typography.Text>
      );
    case "untouched":
    default:
      return <Typography.Text type="secondary">{defaultText}</Typography.Text>;
  }
}
