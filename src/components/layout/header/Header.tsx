import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Button, message, PageHeader, Switch, Tooltip } from "antd";
import React, { useCallback, useState } from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { MdDarkMode, MdLightMode } from "react-icons/md";

import { useNa3Auth } from "../../../modules/na3-react";
import classes from "./Header.module.css";

export function Header(): JSX.Element | null {
  const auth = useNa3Auth();

  const [isDarkMode, setIsDarkMode] = useState<boolean>();
  const { switcher, status, themes } = useThemeSwitcher();

  const handleToggleTheme = useCallback(
    (isChecked: boolean): void => {
      setIsDarkMode(isChecked);
      switcher({ theme: isChecked ? themes.dark : themes.light });
    },
    [switcher, themes.dark, themes.light]
  );

  const handleSignOut = useCallback(async () => {
    await auth.helpers.signOut();
    await message.info("Você saiu.");
  }, [auth.helpers]);

  // Avoid flickering when switching themes
  if (status === "loading") {
    return null;
  }

  return (
    <div className={classes.HeaderContainer}>
      <div>
        {auth.department && (
          <PageHeader
            avatar={{
              className: classes.Avatar,
              icon: <UserOutlined />,
              size: "small",
              style: {
                backgroundColor: auth.department.style.colors.background,
              },
            }}
            className={`${classes.Header} animate__animated animate__fadeIn`}
            title={
              <small className={classes.Username}>
                {auth.department.displayName.toUpperCase()}
              </small>
            }
          />
        )}
      </div>

      <div className={classes.Actions}>
        <Switch
          checked={isDarkMode}
          checkedChildren={
            <div className={classes.SwitchIcon}>
              <MdDarkMode />
            </div>
          }
          className={!auth.department ? classes.SwitchExtraMargin : undefined}
          onChange={handleToggleTheme}
          size="small"
          unCheckedChildren={
            <div className={classes.SwitchIcon}>
              <MdLightMode />
            </div>
          }
        />

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
