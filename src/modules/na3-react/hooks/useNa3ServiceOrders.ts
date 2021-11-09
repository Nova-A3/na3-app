import firebase from "firebase";
import { useCallback, useMemo } from "react";

import type { Na3AppDevice, Na3ServiceOrder } from "../../na3-types";
import type { FirebaseOperationResult } from "../types";
import {
  buildServiceOrder,
  formatServiceOrderId,
  resolveCollectionId,
} from "../utils";
import { useStateSlice } from "./useStateSlice";

export type UseNa3ServiceOrdersResult = {
  data: Na3ServiceOrder[] | null;
  error: firebase.FirebaseError | null;
  helpers: {
    add: (
      ...args: Parameters<typeof buildServiceOrder>
    ) => Promise<FirebaseOperationResult>;
    getByStatus: (
      status: Na3ServiceOrder["status"] | Na3ServiceOrder["status"][],
      data?: Na3ServiceOrder[]
    ) => Na3ServiceOrder[];
    getDepartmentOrders: (
      data?: Na3ServiceOrder[]
    ) => Na3ServiceOrder[] | undefined;
    getNextId: () => string | undefined;
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

  const fbCollectionRef = useMemo(
    () =>
      firebase
        .firestore()
        .collection(resolveCollectionId("tickets", environment)),
    [environment]
  );

  const getNextId = useCallback((): string | undefined => {
    const lastId = serviceOrders.data
      ?.map((so) => parseInt(so.id))
      .sort((a, b) => a - b)
      .pop();
    return lastId ? formatServiceOrderId(lastId + 1) : undefined;
  }, [serviceOrders.data]);

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

  const add = useCallback(
    async (
      id: string,
      data: Required<
        Pick<
          Na3ServiceOrder,
          | "additionalInfo"
          | "cause"
          | "description"
          | "dpt"
          | "interruptions"
          | "machine"
          | "maintenanceType"
          | "team"
          | "username"
        >
      >,
      eventData: {
        appVersion: string;
        device: Na3AppDevice;
      }
    ): Promise<FirebaseOperationResult> => {
      const serviceOrder = buildServiceOrder(id, data, eventData);
      try {
        const docRef = fbCollectionRef.doc(id);
        await docRef.set(serviceOrder);
        return { data: docRef, error: null };
      } catch (error) {
        return { data: null, error: error as firebase.FirebaseError };
      }
    },
    [fbCollectionRef]
  );

  return {
    ...serviceOrders,
    helpers: {
      add,
      getByStatus,
      getDepartmentOrders,
      getNextId,
      getWithActionRequired,
      mapByStatus,
      orderRequiresAction,
      sortByStatus,
    },
  };
}
