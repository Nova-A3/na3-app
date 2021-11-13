import React, { useCallback } from "react";
import { useHistory } from "react-router";

import {
  MaintCreateProjectForm,
  PageDescription,
  PageTitle,
} from "../../../components";

export function MaintProjectsCreatePage(): JSX.Element {
  const history = useHistory();

  const handleNavigateBack = useCallback(() => {
    history.replace("/manutencao/projetos");
  }, [history]);

  return (
    <>
      <PageTitle>Novo Projeto</PageTitle>
      <PageDescription>Defina o projeto.</PageDescription>

      <MaintCreateProjectForm onSubmit={handleNavigateBack} />
    </>
  );
}
