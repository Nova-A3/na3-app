import { UserOutlined } from "@ant-design/icons";
import { PageHeader } from "antd";
import React from "react";

import type { Na3Department } from "../../../modules/na3-types";
import classes from "./UserInfo.module.css";

type HeaderInfoProps = {
  user: Na3Department;
};

export function UserInfo({ user }: HeaderInfoProps): JSX.Element {
  return (
    <PageHeader
      avatar={{
        className: classes.Avatar,
        icon: <UserOutlined />,
        size: "small",
        style: { backgroundColor: user.style.colors.background },
      }}
      className={`${classes.UserInfo} animate__animated animate__fadeIn`}
      title={
        <small className={classes.Username}>
          {user.displayName.toUpperCase()}
        </small>
      }
    />
  );
}
