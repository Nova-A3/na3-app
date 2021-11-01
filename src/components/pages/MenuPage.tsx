import React from "react";

import type { StaticListItemProps } from "../lists/components/StaticListItem";
import { StaticList } from "../lists/StaticList";
import { PageDescription } from "./components/PageDescription";
import { PageTitle } from "./components/PageTitle";

type MenuPageProps = {
  items: StaticListItemProps[];
  title: string;
  description?: string;
  icon?: React.ReactNode;
};

const defaultProps: Omit<MenuPageProps, "items" | "title"> = {
  description: undefined,
  icon: null,
};

export function MenuPage({
  items,
  title,
  description,
  icon,
}: MenuPageProps): JSX.Element {
  return (
    <>
      <PageTitle icon={icon}>{title}</PageTitle>
      <PageDescription>{description}</PageDescription>

      <StaticList data={items} renderItem={null} />
    </>
  );
}

MenuPage.defaultProps = defaultProps;
