import type { TimelineItemProps as AntdTimelineItemProps } from "antd";
import { Grid, Space, Timeline, Typography } from "antd";
import React from "react";

export type TimelineItemProps = Partial<
  Pick<AntdTimelineItemProps, "className" | "color">
> & {
  body?: React.ReactNode;
  postTitle?: React.ReactNode;
  title: React.ReactNode;
};

type TimelineItemPrivateProps = Required<TimelineItemProps> & {
  isLast: boolean;
};

export function TimelineItem({
  className,
  color,
  body,
  postTitle,
  title,
  isLast,
}: TimelineItemPrivateProps): JSX.Element {
  const breakpoint = Grid.useBreakpoint();

  return (
    <Timeline.Item
      className={`${isLast ? "ant-timeline-item-pending" : ""} ${className}`}
      color={color || undefined}
    >
      <div>
        <Space size={breakpoint.lg ? "large" : "middle"}>
          <Typography.Text>{title}</Typography.Text>

          {postTitle && (
            <small>
              <Typography.Text italic={true} type="secondary">
                {postTitle}
              </Typography.Text>
            </small>
          )}
        </Space>
      </div>

      {body && <Typography.Text type="secondary">{body}</Typography.Text>}
    </Timeline.Item>
  );
}
