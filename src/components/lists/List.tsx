import { nanoid } from "nanoid";
import React, { useMemo } from "react";
import { Centered } from "../layout/utils/Centered";
import { Empty } from "../ui/Empty";
import { Spinner } from "../ui/Spinner";
import { ListError } from "./components/ListError";

export type ListProps<Item> = {
  data: Item[] | null | undefined;
  renderItem: ListRenderItem<Item>;
  loading: boolean;
  error: string | null | undefined;
  verticalSpacing?: number;
};

export function List<Item extends Record<string, unknown>>({
  data,
  renderItem,
  loading,
  error,
  verticalSpacing,
}: ListProps<Item>): JSX.Element {
  const verticalSpacedStyle = useMemo(
    () => ({ marginBottom: verticalSpacing }),
    [verticalSpacing]
  );

  if (error) {
    return <ListError>{error}</ListError>;
  } else if (loading) {
    return (
      <Centered>
        <Spinner />
      </Centered>
    );
  } else if (data) {
    return data.length === 0 ? (
      <Empty description="Nada para mostrar" />
    ) : (
      <>
        {data.map((item, index) => (
          <div
            key={
              (item instanceof Object &&
                Object.prototype.hasOwnProperty.call(item, "id") &&
                typeof item.id === "string" &&
                item.id) ||
              nanoid()
            }
            style={
              verticalSpacing && index < data.length - 1
                ? verticalSpacedStyle
                : undefined
            }
          >
            {renderItem(item)}
          </div>
        ))}
      </>
    );
  } else {
    return (
      <ListError>
        Um erro inesperado ocorreu. Por favor, atualize a página ou entre em
        contato com o desenvolvedor.
      </ListError>
    );
  }
}

export type ListRenderItem<T> = (item: T) => JSX.Element;
