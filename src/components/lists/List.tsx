import { Input } from "antd";
import { nanoid } from "nanoid";
import React, { useCallback, useMemo, useState } from "react";

import { Empty } from "../ui/Empty/Empty";
import { Spinner } from "../ui/Spinner/Spinner";
import { ListError } from "./components/ListError";
import classes from "./List.module.css";

export type ListProps<
  Item,
  Data extends Item[] | null | undefined = Item[] | null | undefined
> = {
  data: Data;
  error: string | null | undefined;
  filterItem?: Data extends Item[] ? (input: string) => Item[] : never;
  isLoading: boolean;
  renderItem: ListRenderItem<Item>;
  verticalSpacing?: number;
};

export function List<Item extends Record<string, unknown>>({
  data,
  renderItem,
  isLoading,
  error,
  verticalSpacing,
  filterItem,
}: ListProps<Item>): JSX.Element {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = useCallback(
    (eventOrValue: React.ChangeEvent<HTMLInputElement> | string): void => {
      const input =
        typeof eventOrValue === "string"
          ? eventOrValue
          : eventOrValue.target.value;
      setSearchInput(input.toLowerCase());
    },
    []
  );

  const filteredData = useMemo(
    () => filterItem?.(searchInput) || data,
    [filterItem, searchInput, data]
  );

  const listStyle = useMemo(
    () => ({ paddingTop: (verticalSpacing || 8) * 1.5 }),
    [verticalSpacing]
  );

  if (error) {
    return <ListError>{error}</ListError>;
  } else if (isLoading) {
    return <Spinner className={classes.Loading} />;
  } else if (filteredData) {
    return (
      <div className={classes.ListContainer}>
        {!!filterItem && (
          <div className={classes.SearchContainer}>
            <Input.Search
              enterButton={true}
              onChange={handleSearchChange}
              onSearch={handleSearchChange}
              placeholder="Pesquisar..."
            />
          </div>
        )}

        <div className={classes.List} style={listStyle}>
          {filteredData.length === 0 ? (
            <Empty description="Nada para mostrar" />
          ) : (
            filteredData.map((item, index) => (
              <div
                key={
                  (item instanceof Object &&
                    Object.prototype.hasOwnProperty.call(item, "id") &&
                    typeof item.id === "string" &&
                    item.id) ||
                  nanoid()
                }
                style={
                  verticalSpacing
                    ? {
                        marginBottom:
                          index < filteredData.length - 1
                            ? verticalSpacing
                            : verticalSpacing * 2.5,
                      }
                    : undefined
                }
              >
                {renderItem(item)}
              </div>
            ))
          )}
        </div>
      </div>
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
