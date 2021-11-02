import { Button, Result } from "antd";
import { useCallback } from "react";
import React from "react";
import { useHistory } from "react-router";

import { Centered } from "../../components";

export function NotImplementedPage(): JSX.Element {
  const history = useHistory();

  const handleBackToHome = useCallback(() => history.push("/"), [history]);

  return (
    <Centered>
      <Result
        extra={<Button onClick={handleBackToHome}>Voltar ao Início</Button>}
        status="500"
        subTitle="Desculpe, esta página ainda não foi implementada."
        title="500"
      />
    </Centered>
  );
}
