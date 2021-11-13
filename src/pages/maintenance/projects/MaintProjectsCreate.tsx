import React, { useCallback } from "react";
import { useHistory } from "react-router";

import {
  Divider,
  MaintCreateProjectForm,
  Page,
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

      <Divider marginTop={0} />

      <Page scrollTopOffset={24}>
        <MaintCreateProjectForm onSubmit={handleNavigateBack} />
      </Page>
    </>
  );
}
