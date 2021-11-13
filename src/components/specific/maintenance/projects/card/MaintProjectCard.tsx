import { Typography } from "antd";
import React, { useMemo } from "react";

import { useNa3MaintProjects } from "../../../../../modules/na3-react";
import type { Na3MaintenanceProject } from "../../../../../modules/na3-types";
import { DataCard } from "../../../../ui/DataCard/DataCard";
import { MaintProjectStatusBadge } from "./MaintProjectStatusBadge";

type MaintProjectCardProps = {
  data: Na3MaintenanceProject;
  onSelect: (data: Na3MaintenanceProject) => void;
};

export function MaintProjectCard({
  data,
  onSelect,
}: MaintProjectCardProps): JSX.Element {
  const { helpers } = useNa3MaintProjects();

  const projectStatus = useMemo(
    () => helpers.getProjectStatus(data),
    [data, helpers]
  );

  return (
    <DataCard
      data={data}
      header={<MaintProjectStatusBadge status={projectStatus} />}
      onClick={onSelect}
      preTitle={`PR-${data.internalId.toString().padStart(4, "0")}`}
      title={data.title}
    >
      <Typography.Text italic={true}>{data.description}</Typography.Text>
    </DataCard>
  );
}
