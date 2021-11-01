import React, { useCallback } from "react";
import type { StaticListItemProps } from "./components/StaticListItem";
import { StaticListItem } from "./components/StaticListItem";
import type { ListProps, ListRenderItem } from "./List";
import { List } from "./List";

type StaticListProps<Item> =
  | (Omit<ListProps<Item>, "data" | "error" | "loading" | "renderItem"> & {
      data: Item[];
      renderItem: ListRenderItem<Item>;
    })
  | (Omit<
      ListProps<StaticListItemProps>,
      "data" | "error" | "loading" | "renderItem"
    > & { data: StaticListItemProps[]; renderItem: null });

export function StaticList<Item extends Record<string, unknown>>({
  verticalSpacing,
  ...props
}: StaticListProps<Item>): JSX.Element {
  const handleRenderDefaultItem = useCallback(
    ({
      title,
      description,
      color,
      icon,
      href,
      onClick,
    }: StaticListItemProps) => (
      <StaticListItem
        color={color}
        description={description}
        href={href}
        icon={icon}
        onClick={onClick}
        title={title}
      />
    ),
    []
  );

  return props.renderItem ? (
    <List<Item>
      data={props.data}
      error={null}
      loading={false}
      renderItem={props.renderItem}
      verticalSpacing={verticalSpacing || 8}
    />
  ) : (
    <List<StaticListItemProps>
      data={props.data}
      error={null}
      loading={false}
      renderItem={handleRenderDefaultItem}
      verticalSpacing={verticalSpacing || 8}
    />
  );
}
