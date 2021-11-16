import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button, message, Tooltip } from "antd";
import React, { useCallback } from "react";
import { useHistory } from "react-router";

import { useTheme } from "../../../hooks";
import { useNa3Auth } from "../../../modules/na3-react";
import { HomeLogo } from "../../specific/home/HomeLogo";
import classes from "./Header.module.css";
import { ThemeSwitch } from "./ThemeSwitch";
import { UserInfo } from "./UserInfo";

export function Header(): JSX.Element {
  const history = useHistory();

  const auth = useNa3Auth();

  const [theme] = useTheme();

  const handleSignOut = useCallback(async () => {
    await auth.helpers.signOut();
    await message.info("Você saiu");
    history.push("/entrar");
  }, [auth.helpers, history]);

  const handleAuthRedirect = useCallback(() => {
    history.push("/entrar");
  }, [history]);

  return (
    <div className={classes.HeaderContainer}>
      <div className={classes.Header}>
        {auth.department ? (
          <UserInfo user={auth.department} />
        ) : (
          <HomeLogo height={24} />
        )}
      </div>

      <div className={classes.Actions}>
        <ThemeSwitch />

        <Tooltip
          arrowPointAtCenter={true}
          color={auth.department ? "#ff4d4f" : undefined}
          placement="bottomRight"
          title={auth.department ? "Sair" : "Entrar"}
        >
          <Button
            className={`${classes.AuthButton} animate__animated animate__fadeIn`}
            danger={!!auth.department}
            icon={auth.department ? <LogoutOutlined /> : <LoginOutlined />}
            onClick={auth.department ? handleSignOut : handleAuthRedirect}
            shape="circle"
            type={auth.department || theme === "dark" ? "text" : "link"}
          />
        </Tooltip>
      </div>
    </div>
  );
}
