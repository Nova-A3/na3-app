import { Timeline, Typography } from "antd";
import dayjs from "dayjs";
import React from "react";

import type { Na3MaintenanceProjectEvent } from "../../../../../modules/na3-types";
import { parseStringId } from "../../../../../utils";
import classes from "./MaintProjectTimelineItem.module.css";

type MaintProjectTimelineItemProps = {
  event: Na3MaintenanceProjectEvent;
};

export function MaintProjectTimelineItem({
  event,
}: MaintProjectTimelineItemProps): JSX.Element {
  return (
    <Timeline.Item
      color={
        event.type === "complete"
          ? "green"
          : event.type === "create"
          ? "cyan"
          : undefined
      }
    >
      <div>
        <Typography.Text>
          {parseStringId(`project-${event.type}`)}
        </Typography.Text>

        <small className={classes.TimelineItemTimestamp}>
          <Typography.Text italic={true} type="secondary">
            {dayjs(event.timestamp.toDate()).format("DD/MM/YY HH:mm")}
          </Typography.Text>
        </small>
      </div>

      {"message" in event && (
        <Typography.Text type="secondary">{event.message}</Typography.Text>
      )}
    </Timeline.Item>
  );
}
