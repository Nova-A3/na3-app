import { LoadingOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import React, { useMemo } from "react";

import type { FieldStatus } from "../../FormField/FormField";
import classes from "./FieldHelp.module.css";

type FieldHelpProps = {
  defaultText: string | undefined;
  error: string | undefined;
  fieldStatus: FieldStatus;
  isFormSubmitting: boolean;
  isHidden: boolean;
  textWhenLoading: string | undefined;
};

export function FieldHelp({
  defaultText,
  error,
  fieldStatus,
  isFormSubmitting,
  isHidden,
  textWhenLoading: textWhenLoadingProp,
}: FieldHelpProps): JSX.Element | null {
  const textWhenLoading = useMemo(
    () => (isFormSubmitting ? "Validando..." : textWhenLoadingProp),
    [isFormSubmitting, textWhenLoadingProp]
  );

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
