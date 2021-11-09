import { MenuOutlined } from "@ant-design/icons";
import { Grid, Layout } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";

import { ROUTES } from "../../../constants";
import { useTheme } from "../../../hooks";
import { SiderLogo } from "./SiderLogo";
import type { SiderMenuProps } from "./SiderMenu";
import { SiderMenu } from "./SiderMenu";

type SiderItemChild = {
  path: string;
  title: string;
};

export type SiderItem = {
  children?: SiderItemChild[];
  icon: React.ReactNode;
  path: string;
  title: string;
};

export function Sider(): JSX.Element {
  const [isCollapsed, setIsCollapsed] = useState<boolean>();

  const history = useHistory();
  const breakpoint = Grid.useBreakpoint();
  const [theme] = useTheme();

  const handleCollapse = useCallback((collapsed: boolean) => {
    setIsCollapsed(collapsed);
  }, []);

  const handleMenuNavigation: SiderMenuProps["onNavigation"] = useCallback(
    ({ key }) => {
      history.push(key);
      setIsCollapsed(true);
    },
    [history]
  );

  const siderItems = useMemo(
    (): (SiderItem | null)[] =>
      Object.entries(ROUTES).map(([path, { siderConfig, title, icon }]) => {
        const itemTitle = title || siderConfig?.title;

        if (!siderConfig || !itemTitle) {
          return null;
        }
        return {
          children: siderConfig.children,
          icon,
          path,
          title: itemTitle,
        };
      }),
    []
  );

  const zeroWidthTriggerStyle = useMemo(
    () => ({
      alignItems: "center",
      background: "transparent",
      color: theme === "light" ? "#111" : "#fff",
      display: "flex",
      height: 48,
      justifyContent: "center",
      right: -46,
      top: 0,
      width: 46,
    }),
    [theme]
  );

  useEffect(() => {
    if (isCollapsed === undefined && "md" in breakpoint) {
      setIsCollapsed(!breakpoint.md);
    }
  }, [breakpoint, isCollapsed]);

  return (
    <Layout.Sider
      collapsed={!!isCollapsed}
      collapsedWidth={breakpoint.md || !isCollapsed ? 80 : 0}
      collapsible={true}
      onCollapse={handleCollapse}
      trigger={!breakpoint.md && isCollapsed && <MenuOutlined />}
      width={breakpoint.md ? 220 : "100%"}
      zeroWidthTriggerStyle={zeroWidthTriggerStyle}
    >
      <SiderLogo isCollapsed={!!isCollapsed} />
      <SiderMenu
        items={siderItems.filter((item): item is SiderItem => !!item)}
        onNavigation={handleMenuNavigation}
      />
    </Layout.Sider>
  );
}
