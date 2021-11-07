import { Badge } from "antd";
import React, { useCallback } from "react";

import { useNa3ServiceOrders } from "../../../../modules/na3-react";
import type { Na3ServiceOrder } from "../../../../modules/na3-types";
import { List } from "../../../lists/List";
import { MaintServiceOrderCard } from "./card/MaintServiceOrderCard";

type MaintServiceOrdersListProps = {
  data: Na3ServiceOrder[];
  onSelectOrder: (serviceOrder: Na3ServiceOrder) => void;
};

const defaultProps: Omit<
  MaintServiceOrdersListProps,
  "data" | "onSelectOrder"
> = {};

export function MaintServiceOrdersList({
  data,
  onSelectOrder,
}: MaintServiceOrdersListProps): JSX.Element {
  const serviceOrders = useNa3ServiceOrders();

  const handleRenderItem = useCallback(
    (item: Na3ServiceOrder) => {
      const card = (
        <MaintServiceOrderCard data={item} onSelect={onSelectOrder} />
      );

      if (item.status === "closed") {
        return (
          <Badge.Ribbon color="red" text="Ação necessária">
            {card}
          </Badge.Ribbon>
        );
      } else {
        return card;
      }
    },
    [onSelectOrder]
  );

  const handleFilterItemOnSearch = useCallback(
    (query: string): Na3ServiceOrder[] =>
      data?.filter((order) => {
        const formattedQuery = query.trim().toLowerCase();
        return order.description.toLowerCase().includes(formattedQuery);
      }) || [],
    [data]
  );

  return (
    <List
      data={data}
      error={serviceOrders.error?.message}
      filterItem={handleFilterItemOnSearch}
      isLoading={serviceOrders.loading}
      renderItem={handleRenderItem}
      verticalSpacing={8}
    />
  );
}

MaintServiceOrdersList.defaultProps = defaultProps;
