import { Typography } from "antd";
import React from "react";

import type { Na3MaintenanceProject } from "../../../../../modules/na3-types";
import { DataCard } from "../../../../ui/DataCard/DataCard";

type MaintProjectCardProps = {
  data: Na3MaintenanceProject;
  onSelect: (data: Na3MaintenanceProject) => void;
};

export function MaintProjectCard({
  data,
  onSelect,
}: MaintProjectCardProps): JSX.Element {
  return (
    <DataCard
      data={data}
      onClick={onSelect}
      preTitle={`PR-${data.internalId.toString().padStart(4, "0")}`}
      title={data.title}
    >
      <Typography.Text italic={true}>{data.description}</Typography.Text>
    </DataCard>
  );
}
