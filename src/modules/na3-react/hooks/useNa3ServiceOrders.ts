import firebase from "firebase";
import { useCallback, useMemo } from "react";

import type { Na3ServiceOrder } from "../../na3-types";
import { resolveCollectionId } from "../utils";
import { useStateSlice } from "./useStateSlice";

export type UseNa3ServiceOrdersResult = {
  data: Na3ServiceOrder[] | null;
  error: firebase.FirebaseError | null;
  helpers: {
    getByStatus: (
      status: Na3ServiceOrder["status"] | Na3ServiceOrder["status"][],
      data?: Na3ServiceOrder[]
    ) => Na3ServiceOrder[];
    getDepartmentOrders: (
      data?: Na3ServiceOrder[]
    ) => Na3ServiceOrder[] | undefined;
    getWithActionRequired: (data?: Na3ServiceOrder[]) => Na3ServiceOrder[];
    mapByStatus: (
      data?: Na3ServiceOrder[]
    ) => Record<Na3ServiceOrder["status"], Na3ServiceOrder[]>;
    orderRequiresAction: (serviceOrder: Na3ServiceOrder) => boolean;
    sortByStatus: (
      sortingOrder: Na3ServiceOrder["status"][],
      data?: Na3ServiceOrder[]
    ) => Na3ServiceOrder[];
  };
  loading: boolean;
};
export function useNa3ServiceOrders(): UseNa3ServiceOrdersResult {
  const { environment } = useStateSlice("config");
  const { department } = useStateSlice("auth");
  const serviceOrders = useStateSlice("serviceOrders");

  const fbCollectionReference = useMemo(
    () =>
      firebase
        .firestore()
        .collection(resolveCollectionId("tickets", environment)),
    [environment]
  );

  const getDepartmentOrders = useCallback(
    (data?: Na3ServiceOrder[]) =>
      (department &&
        ((data || serviceOrders.data)?.filter(
          (so) => so.username === department.id
        ) ||
          [])) ||
      undefined,
    [department, serviceOrders.data]
  );

  const getByStatus = useCallback(
    (
      status: Na3ServiceOrder["status"] | Na3ServiceOrder["status"][],
      data?: Na3ServiceOrder[]
    ): Na3ServiceOrder[] => {
      const statusArr = typeof status === "string" ? [status] : status;
      return (
        (data || serviceOrders.data)?.filter((so) =>
          statusArr.includes(so.status)
        ) || []
      );
    },
    [serviceOrders.data]
  );

  const mapByStatus = useCallback(
    (
      data?: Na3ServiceOrder[]
    ): Record<Na3ServiceOrder["status"], Na3ServiceOrder[]> => {
      return {
        closed: getByStatus("closed", data),
        pending: getByStatus("pending", data),
        refused: getByStatus("refused", data),
        solved: getByStatus("solved", data),
        solving: getByStatus("solving", data),
      };
    },
    [getByStatus]
  );

  const sortByStatus = useCallback(
    (
      sortingOrder: Na3ServiceOrder["status"][],
      data?: Na3ServiceOrder[]
    ): Na3ServiceOrder[] => {
      const statusMap = mapByStatus(data);
      return sortingOrder.flatMap((status) =>
        [...statusMap[status]].sort((a, b) => b.id.localeCompare(a.id))
      );
    },
    [mapByStatus]
  );

  const orderRequiresAction = useCallback(
    (order: Na3ServiceOrder): boolean => {
      if (!department) return false;
      if (department.type === "shop-floor") return order.status === "solved";
      else if (department.id === "manutencao")
        return order.status === "pending" || order.status === "solving";
      else return false;
    },
    [department]
  );

  const getWithActionRequired = useCallback(
    (data?: Na3ServiceOrder[]): Na3ServiceOrder[] => {
      return (data || serviceOrders.data)?.filter(orderRequiresAction) || [];
    },
    [serviceOrders.data, orderRequiresAction]
  );

  return {
    ...serviceOrders,
    helpers: {
      getByStatus,
      getDepartmentOrders,
      getWithActionRequired,
      mapByStatus,
      orderRequiresAction,
      sortByStatus,
    },
  };
}
