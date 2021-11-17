import { Button } from "antd";
import React, { useCallback, useMemo } from "react";
import { useHistory } from "react-router";

import { Result } from "./Result";

type Result404Props = {
  backUrl: string;
  children: string;
};

export function Result404({ children, backUrl }: Result404Props): JSX.Element {
  const history = useHistory();

  const handleNavigateBack = useCallback(() => {
    history.replace(backUrl);
  }, [history, backUrl]);

  const navigateBackBtn = useMemo(
    () => (
      <Button onClick={handleNavigateBack} type="primary">
        Voltar
      </Button>
    ),
    [handleNavigateBack]
  );

  return (
    <Result
      description={children}
      extra={navigateBackBtn}
      status="404"
      title="Oops!"
    />
  );
}
