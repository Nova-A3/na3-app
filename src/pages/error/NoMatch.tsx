import { Button, Result } from "antd";
import React, { useCallback } from "react";
import { useHistory } from "react-router";

import { Centered } from "../../components";

export function NoMatchPage(): JSX.Element {
  const history = useHistory();

  const handleBackToHome = useCallback(() => history.push("/"), [history]);

  return (
    <Centered>
      <Result
        extra={
          <Button onClick={handleBackToHome} type="primary">
            Voltar ao Início
          </Button>
        }
        status="404"
        subTitle="Desculpe, a página solicitada não existe."
        title="404"
      />
    </Centered>
  );
}
