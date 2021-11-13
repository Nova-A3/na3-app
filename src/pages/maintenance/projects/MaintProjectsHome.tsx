import React, { useCallback, useMemo, useState } from "react";
import { useHistory } from "react-router";

import {
  ListFormPage,
  MaintCreateProjectForm,
  MaintProjectsList,
} from "../../../components";
import { useNa3MaintProjects } from "../../../modules/na3-react/hooks";
import type { Na3MaintenanceProject } from "../../../modules/na3-types";

export function MaintProjectsHomePage(): JSX.Element {
  const history = useHistory();

  const maintProjects = useNa3MaintProjects();

  const [selectedProject, setSelectedProject] =
    useState<Na3MaintenanceProject>();

  const listData = useMemo(
    () => [
      ...maintProjects.helpers.sortByStatus(["running", "late"]).reverse(),
      ...maintProjects.helpers.sortByStatus(["finished"]),
    ],
    [maintProjects.helpers]
  );

  const handleCreateProjectClick = useCallback(() => {
    history.push("/manutencao/projetos/novo-projeto");
  }, [history]);

  return (
    <ListFormPage
      actions={[{ label: "Novo projeto", onClick: handleCreateProjectClick }]}
      form={<MaintCreateProjectForm />}
      formTitle="Novo Projeto"
      list={
        <MaintProjectsList
          data={listData}
          onSelectProject={setSelectedProject}
        />
      }
      listTitle="Projetos"
      title="Manutenção • Projetos"
    />
  );
}
