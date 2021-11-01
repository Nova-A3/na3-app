import type { MenuItemProps } from "antd";
import { Menu } from "antd";
import React from "react";
import { useLocation } from "react-router";
import type { SiderItem } from "./Sider";

export type SiderMenuProps = {
  items: SiderItem[];
  onNavigation: Exclude<MenuItemProps["onClick"], undefined>;
};

export function SiderMenu({
  items,
  onNavigation,
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
    </Menu>
  );
}
