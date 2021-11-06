import { Typography } from "antd";
import React from "react";

import classes from "./FieldHelp.module.css";

type FieldHelpProps = {
  defaultText: string | undefined;
  error: string | undefined;
  isLoading: boolean;
  isTouched: boolean;
  loadingText: string | undefined;
};

export function FieldHelp({
  defaultText,
  error,
  isLoading,
  isTouched,
  loadingText,
}: FieldHelpProps): JSX.Element | null {
  if (isLoading) {
    return (
      <Typography.Text className={classes.LoadingText}>
        {loadingText || "Carregando..."}
      </Typography.Text>
    );
  }

  if (isTouched) {
    if (error) {
      return <Typography.Text type="danger">{error}</Typography.Text>;
    } else {
      return <Typography.Text type="success">Parece bom!</Typography.Text>;
    }
  }

  return defaultText ? (
    <Typography.Text type="secondary">{defaultText}</Typography.Text>
  ) : null;
}
