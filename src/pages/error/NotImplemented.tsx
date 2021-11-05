import { Button } from "antd";
import { useCallback } from "react";
import React from "react";
import { useHistory } from "react-router";

import { Result } from "../../components";

export function NotImplementedPage(): JSX.Element {
  const history = useHistory();

  const handleBackToHome = useCallback(() => history.push("/"), [history]);

  return (
    <Result
      description="Desculpe, esta página ainda não foi implementada."
      extra={<Button onClick={handleBackToHome}>Voltar ao Início</Button>}
      status="500"
      title="500"
    />
  );
}
