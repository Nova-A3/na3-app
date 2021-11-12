import React, { useState } from "react";

import { ListFormPage, MaintProjectsList } from "../../../components";
import { useNa3MaintProjects } from "../../../modules/na3-react/hooks";
import type { Na3MaintenanceProject } from "../../../modules/na3-types";

export function MaintProjectsHomePage(): JSX.Element {
  const maintProjects = useNa3MaintProjects();

  const [selectedProject, setSelectedProject] =
    useState<Na3MaintenanceProject>();

  return (
    <ListFormPage
      actions={[
        { label: "Novo projeto", onClick: (): void => console.log("click") },
      ]}
      form={"FORM"}
      formTitle="Novo Projeto"
      list={
        <MaintProjectsList
          data={maintProjects.data || []}
          onSelectProject={setSelectedProject}
        />
      }
      listTitle="Projetos"
      title="Manutenção • Projetos"
    />
  );
}
