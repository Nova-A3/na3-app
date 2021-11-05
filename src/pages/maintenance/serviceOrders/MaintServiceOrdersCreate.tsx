import React from "react";

import {
  MaintCreateServiceOrderForm,
  PageDescription,
  PageTitle,
} from "../../../components";

export function MaintServiceOrdersCreatePage(): JSX.Element {
  return (
    <>
      <PageTitle>Abrir OS</PageTitle>
      <PageDescription>Defina a ordem de serviço.</PageDescription>

      <MaintCreateServiceOrderForm />
    </>
  );
}
