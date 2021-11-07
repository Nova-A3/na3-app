import { LogoutOutlined } from "@ant-design/icons";
import { Button, message, Tooltip } from "antd";
import React, { useCallback } from "react";

import { useNa3Auth } from "../../../modules/na3-react";
import { HomeLogo } from "../../specific/home/HomeLogo";
import classes from "./Header.module.css";
import { ThemeSwitch } from "./ThemeSwitch";
import { UserInfo } from "./UserInfo";

export function Header(): JSX.Element {
  const auth = useNa3Auth();

  const handleSignOut = useCallback(async () => {
    await auth.helpers.signOut();
    await message.info("Você saiu.");
  }, [auth.helpers]);

  return (
    <div className={classes.HeaderContainer}>
      <div className={classes.Header}>
        {auth.department ? (
          <UserInfo user={auth.department} />
        ) : (
          <HomeLogo hasNoMarginTop={true} height={24} />
        )}
      </div>

      <div className={classes.Actions}>
        <ThemeSwitch />

        {auth.department && (
          <Tooltip color="#ff4d4f" title="Sair">
            <Button
              className={`${classes.SignOutButton} animate__animated animate__fadeIn`}
              danger={true}
              icon={<LogoutOutlined />}
              onClick={handleSignOut}
              shape="circle"
              type="text"
            />
          </Tooltip>
        )}
      </div>
    </div>
  );
}
