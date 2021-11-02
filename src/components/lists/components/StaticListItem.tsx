import { Avatar, Card, Row, Typography } from "antd";
import React, { useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";

import classes from "./StaticListItem.module.css";

export type StaticListItemProps = {
  color: string;
  description: React.ReactNode;
  href?: string;
  icon: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
  title: React.ReactNode;
};

export function StaticListItem({
  title,
  description,
  icon,
  color,
  href,
  onClick,
}: StaticListItemProps): JSX.Element {
  const history = useHistory();

  const handleClick = useCallback(
    (ev: React.MouseEvent<HTMLElement>) => {
      if (onClick) onClick(ev);
      else if (href) history.push(href);
    },
    [history, onClick, href]
  );

  const coloredStyle = useMemo(() => ({ backgroundColor: color }), [color]);

  return (
    <Card
      className={classes.Container}
      hoverable={!!(onClick || href)}
      onClick={handleClick}
      size="small"
      title={null}
    >
      <Row align="middle" className={classes.Header}>
        <Avatar className={classes.Avatar} icon={icon} style={coloredStyle} />

        <Typography.Title className={classes.Title} level={5}>
          {title}
        </Typography.Title>
      </Row>

      <Typography.Text italic={true}>{description}</Typography.Text>
    </Card>
  );
}
