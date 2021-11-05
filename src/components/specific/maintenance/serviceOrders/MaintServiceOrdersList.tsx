import React, { useCallback, useMemo } from "react";

import { useNa3ServiceOrders } from "../../../../modules/na3-react";
import type { Na3ServiceOrder } from "../../../../modules/na3-types";
import { List } from "../../../lists/List";
import { MaintServiceOrderCard } from "./card/MaintServiceOrderCard";

type MaintServiceOrdersListProps = {
  filterData?: (serviceOrder: Na3ServiceOrder) => boolean;
  onSelectOrder: (serviceOrder: Na3ServiceOrder) => void;
};

const defaultProps: Omit<MaintServiceOrdersListProps, "onSelectOrder"> = {
  filterData: undefined,
};

export function MaintServiceOrdersList({
  filterData,
  onSelectOrder,
}: MaintServiceOrdersListProps): JSX.Element {
  const serviceOrders = useNa3ServiceOrders();

  const filteredServiceOrders = useMemo(
    () =>
      filterData ? serviceOrders.data?.filter(filterData) : serviceOrders.data,
    [filterData, serviceOrders.data]
  );

  const handleRenderItem = useCallback(
    (item: Na3ServiceOrder) => (
      <MaintServiceOrderCard data={item} onSelect={onSelectOrder} />
    ),
    [onSelectOrder]
  );

  const handleFilterItemOnSearch = useCallback(
    (query: string): Na3ServiceOrder[] =>
      filteredServiceOrders?.filter((order) => {
        const formattedQuery = query.trim().toLowerCase();
        return order.description.toLowerCase().includes(formattedQuery);
      }) || [],
    [filteredServiceOrders]
  );

  return (
    <List
      data={filteredServiceOrders}
      error={serviceOrders.error?.message}
      filterItem={handleFilterItemOnSearch}
      isLoading={serviceOrders.loading}
      renderItem={handleRenderItem}
      verticalSpacing={8}
    />
  );
}

MaintServiceOrdersList.defaultProps = defaultProps;
