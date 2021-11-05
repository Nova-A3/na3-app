import { LogoutOutlined, MailOutlined } from "@ant-design/icons";
import type { MenuItemProps } from "antd";
import { Menu } from "antd";
import React from "react";
import { useLocation } from "react-router-dom";

import type { SiderItem } from "./Sider";
import classes from "./SiderMenu.module.css";

export type SiderMenuProps = {
  isSignedIn: boolean;
  items: SiderItem[];
  onNavigation: Exclude<MenuItemProps["onClick"], undefined>;
  onReportBug: () => void;
  onSignOut: () => void;
};

export function SiderMenu({
  items,
  onNavigation,
  isSignedIn,
  onSignOut,
  onReportBug,
}: SiderMenuProps): JSX.Element {
  const location = useLocation();

  return (
    <Menu
      defaultOpenKeys={[location.pathname.split("/")[1]]}
      defaultSelectedKeys={[location.pathname.split("/").slice(0, 3).join("/")]}
      mode="inline"
      theme="dark"
    >
      {items.map(({ path, title, icon, children }) =>
        children ? (
          <Menu.SubMenu icon={icon} key={path.split("/")[1]} title={title}>
            {children.map((child) => (
              <Menu.Item key={child.path} onClick={onNavigation}>
                {child.title}
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ) : (
          <Menu.Item icon={icon} key={path} onClick={onNavigation}>
            {title}
          </Menu.Item>
        )
      )}

      <Menu.Divider />

      <Menu.Item icon={<MailOutlined />} key="REPORT_BUG" onClick={onReportBug}>
        Reportar problema
      </Menu.Item>

      {isSignedIn && (
        <div className={classes.SignOut}>
          <Menu mode="inline" theme="dark">
            <Menu.Item
              danger={true}
              icon={<LogoutOutlined />}
              key="SIGN_OUT"
              onClick={onSignOut}
            >
              SAIR
            </Menu.Item>
          </Menu>
        </div>
      )}
    </Menu>
  );
}
