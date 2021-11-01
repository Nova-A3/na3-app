import { Layout } from "antd";
import React, { useCallback, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";

import type { RoutePath } from "../../../constants";
import { ROUTES } from "../../../constants";
import { SiderLogo } from "./SiderLogo";
import type { SiderMenuProps } from "./SiderMenu";
import { SiderMenu } from "./SiderMenu";

type SiderItemChild = {
  path: `${RoutePath}${RoutePath}`;
  title: Capitalize<string>;
};

export type SiderItem = {
  path: string;
  title: Capitalize<string>;
  icon: React.ReactNode;
  children?: SiderItemChild[];
};

export function Sider(): JSX.Element {
  const history = useHistory();

  const [isCollapsed, setIsCollapsed] = useState(false);

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

  return (
    <Layout.Sider
      collapsed={isCollapsed}
      collapsible={true}
      onCollapse={handleCollapse}
    >
      <SiderLogo />
      <SiderMenu
        items={siderItems.filter((item): item is SiderItem => !!item)}
        onNavigation={handleMenuNavigation}
      />
    </Layout.Sider>
  );
}
