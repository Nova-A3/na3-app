import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Popover, Typography } from "antd";
import React, { useMemo } from "react";

import { useNa3ServiceOrders } from "../../../modules/na3-react";
import type { Na3Department } from "../../../modules/na3-types";
import classes from "./UserInfo.module.css";
import { UserMessages } from "./UserMessages";

type HeaderInfoProps = {
  user: Na3Department;
};

export function UserInfo({ user }: HeaderInfoProps): JSX.Element {
  const serviceOrders = useNa3ServiceOrders();

  const urgentServiceOrders = useMemo(
    () => serviceOrders.helpers.getWithActionRequired(),
    [serviceOrders.helpers]
  );

  const messagesCount = useMemo(
    () => urgentServiceOrders.length,
    [urgentServiceOrders.length]
  );

  return (
    <Popover
      className={`${classes.UserInfo} animate__animated animate__fadeIn`}
      content={<UserMessages serviceOrders={urgentServiceOrders} />}
      placement="bottomLeft"
      title="Suas mensagens"
      trigger="click"
    >
      <Badge count={messagesCount} size="small">
        <Avatar
          icon={<UserOutlined />}
          size="small"
          style={{ backgroundColor: user.style.colors.background }}
        />
      </Badge>

      <small>
        <Typography.Title className={classes.Username} level={5}>
          {user.displayName.toUpperCase()}
        </Typography.Title>
      </small>
    </Popover>
  );
}
