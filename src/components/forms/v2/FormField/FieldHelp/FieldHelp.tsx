import { Typography } from "antd";
import React from "react";

import classes from "./FieldHelp.module.css";

type FieldHelpProps = {
  defaultText: string | undefined;
  error: string | undefined;
  isDirty: boolean;
  isInvalid: boolean;
  isLoading: boolean;
  isTouched: boolean;
  loadingText: string | undefined;
};

export function FieldHelp({
  defaultText,
  error,
  isInvalid,
  isLoading,
  isTouched,
  isDirty,
  loadingText,
}: FieldHelpProps): JSX.Element | null {
  if (isLoading) {
    return (
      <Typography.Text className={classes.LoadingText}>
        {loadingText || "Carregando..."}
      </Typography.Text>
    );
  }

  if (isTouched && isDirty) {
    if (error || isInvalid) {
      return <Typography.Text type="danger">{error}</Typography.Text>;
    } else {
      return <Typography.Text type="success">Parece bom!</Typography.Text>;
    }
  }

  return defaultText ? (
    <Typography.Text type="secondary">{defaultText}</Typography.Text>
  ) : null;
}
