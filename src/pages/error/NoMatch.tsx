import { Button } from "antd";
import React, { useCallback } from "react";
import { useHistory } from "react-router";

import { Result } from "../../components";

export function NoMatchPage(): JSX.Element {
  const history = useHistory();

  const handleBackToHome = useCallback(() => history.push("/"), [history]);

  return (
    <Result
      description="Desculpe, a página solicitada não existe."
      extra={
        <Button onClick={handleBackToHome} type="primary">
          Voltar ao Início
        </Button>
      }
      status="404"
      title="404"
    />
  );
}
