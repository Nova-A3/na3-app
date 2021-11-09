import React, { useCallback } from "react";
import { useHistory } from "react-router";

import {
  MaintCreateServiceOrderForm,
  PageDescription,
  PageTitle,
} from "../../../components";

export function MaintServiceOrdersCreatePage(): JSX.Element {
  const history = useHistory();

  const handleNavigateBack = useCallback(() => {
    history.replace("/manutencao/os");
  }, [history]);

  return (
    <>
      <PageTitle>Abrir OS</PageTitle>
      <PageDescription>Defina a ordem de serviço.</PageDescription>

      <MaintCreateServiceOrderForm onSubmit={handleNavigateBack} />
    </>
  );
}
