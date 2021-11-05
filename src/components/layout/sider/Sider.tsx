import { Grid, Layout } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";

import { ROUTES } from "../../../constants";
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

  useEffect(() => {
    if (isCollapsed === undefined && "md" in breakpoint) {
      setIsCollapsed(!breakpoint.md);
    }
  }, [breakpoint, isCollapsed]);

  return (
    <Layout.Sider
      collapsed={!!isCollapsed}
      collapsible={true}
      onCollapse={handleCollapse}
      width={breakpoint.md ? 220 : "100%"}
    >
      <SiderLogo isCollapsed={!!isCollapsed} />
      <SiderMenu
        items={siderItems.filter((item): item is SiderItem => !!item)}
        onNavigation={handleMenuNavigation}
      />
    </Layout.Sider>
  );
}
