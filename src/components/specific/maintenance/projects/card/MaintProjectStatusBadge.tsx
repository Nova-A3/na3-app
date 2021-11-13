import type { BadgeProps } from "antd";
import { Badge } from "antd";
import React, { useMemo } from "react";

import type { Na3MaintenanceProjectStatus } from "../../../../../modules/na3-types";

type MaintProjectStatusBadgeProps = {
  status: Na3MaintenanceProjectStatus;
};

export function MaintProjectStatusBadge({
  status: projectStatus,
}: MaintProjectStatusBadgeProps): JSX.Element {
  const badgePropsMap: Record<Na3MaintenanceProjectStatus, BadgeProps> =
    useMemo(
      () => ({
        finished: { status: "success", text: "Finalizado" },
        late: { status: "error", text: "Atrasado" },
        running: { status: "processing", text: "Em execução" },
      }),
      []
    );

  return (
    <Badge
      status={badgePropsMap[projectStatus].status}
      text={badgePropsMap[projectStatus].text}
    />
  );
}
