import React, { useCallback, useMemo } from "react";
import { useHistory } from "react-router";

import {
  ListFormPage,
  MaintCreateProjectForm,
  MaintProjectsList,
} from "../../../components";
import { useQuery } from "../../../hooks";
import { useNa3MaintProjects } from "../../../modules/na3-react/hooks";
import type { Na3MaintenanceProject } from "../../../modules/na3-types";
import { MaintProjectDetails } from "./MaintProjectDetails";

export function MaintProjectsHomePage(): JSX.Element {
  const history = useHistory();
  const query = useQuery("id");

  const maintProjects = useNa3MaintProjects();

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

  const handleSelectProject = useCallback(
    (project: Na3MaintenanceProject) => {
      history.push(`/manutencao/projetos?id=${project.id}`);
    },
    [history]
  );

  return query.id ? (
    <MaintProjectDetails projectId={query.id} />
  ) : (
    <ListFormPage
      actions={[{ label: "Novo projeto", onClick: handleCreateProjectClick }]}
      form={<MaintCreateProjectForm />}
      formTitle="Novo Projeto"
      list={
        <MaintProjectsList
          data={listData}
          onSelectProject={handleSelectProject}
        />
      }
      listTitle="Projetos"
      title="Manutenção • Projetos"
    />
  );
}
