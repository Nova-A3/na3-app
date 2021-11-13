import dayjs from "dayjs";
import firebase from "firebase";
import { useCallback, useRef } from "react";

import type { Na3ServiceOrder } from "../../na3-types";
import type { FirebaseOperationResult } from "../types";
import type { ServiceOrderBuilderData } from "../utils";
import {
  buildServiceOrder,
  buildServiceOrderEvents,
  formatServiceOrderId,
  resolveCollectionId,
} from "../utils";
import { useStateSlice } from "./useStateSlice";

export type UseNa3ServiceOrdersResult = {
  data: Na3ServiceOrder[] | null;
  error: firebase.FirebaseError | null;
  helpers: {
    acceptSolution: (
      id: string
    ) => Promise<FirebaseOperationResult<Na3ServiceOrder>>;
    add: (
      id: string,
      data: ServiceOrderBuilderData
    ) => Promise<FirebaseOperationResult<Na3ServiceOrder>>;
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
    rejectSolution: (
      id: string,
      payload: { reason: string }
    ) => Promise<FirebaseOperationResult<Na3ServiceOrder>>;
    sortByStatus: (
      sortingOrder: Na3ServiceOrder["status"][],
      data?: Na3ServiceOrder[]
    ) => Na3ServiceOrder[];
  };
  loading: boolean;
};

export function useNa3ServiceOrders(): UseNa3ServiceOrdersResult {
  const { environment } = useStateSlice("config");
  const { device } = useStateSlice("global");
  const { department } = useStateSlice("auth");
  const serviceOrders = useStateSlice("serviceOrders");

  const fbCollectionRef = useRef(
    firebase.firestore().collection(resolveCollectionId("tickets", environment))
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
      data: ServiceOrderBuilderData
    ): Promise<FirebaseOperationResult<Na3ServiceOrder>> => {
      const serviceOrder = buildServiceOrder(id, data, device);
      try {
        const docRef = fbCollectionRef.current.doc(
          id
        ) as firebase.firestore.DocumentReference<Na3ServiceOrder>;

        await docRef.set(serviceOrder);

        return { data: docRef, error: null };
      } catch (error) {
        return { data: null, error: error as firebase.FirebaseError };
      }
    },
    [device]
  );

  const acceptSolution = useCallback(
    async (id: string): Promise<FirebaseOperationResult<Na3ServiceOrder>> => {
      try {
        const docRef = fbCollectionRef.current.doc(
          id
        ) as firebase.firestore.DocumentReference<Na3ServiceOrder>;

        await docRef.update({
          closedAt: dayjs().format(),
          events: firebase.firestore.FieldValue.arrayUnion(
            ...buildServiceOrderEvents(
              [
                { type: "solutionAccepted" },
                { type: "ticketClosed" },
                {
                  payload: { solutionStep: { type: "solutionAccepted" } },
                  type: "solutionStepAdded",
                },
              ],
              device
            )
          ),
          status: "closed",
        });

        return { data: docRef, error: null };
      } catch (error) {
        return { data: null, error: error as firebase.FirebaseError };
      }
    },
    [device]
  );

  const rejectSolution = useCallback(
    async (
      id: string,
      payload: { reason: string }
    ): Promise<FirebaseOperationResult<Na3ServiceOrder>> => {
      try {
        const docRef = fbCollectionRef.current.doc(
          id
        ) as firebase.firestore.DocumentReference<Na3ServiceOrder>;

        await docRef.update({
          acceptedAt: null,
          events: firebase.firestore.FieldValue.arrayUnion(
            ...buildServiceOrderEvents(
              [
                {
                  payload: { refusalReason: payload.reason },
                  type: "solutionRefused",
                },
                { type: "ticketReopened" },
                {
                  payload: { solutionStep: { type: "solutionRefused" } },
                  type: "solutionStepAdded",
                },
              ],
              device
            )
          ),
          priority: null,
          refusalReason: payload.reason.trim(),
          reopenedAt: dayjs().format(),
          solution: null,
          solvedAt: null,
          status: "pending",
        });

        return { data: docRef, error: null };
      } catch (error) {
        return { data: null, error: error as firebase.FirebaseError };
      }
    },
    [device]
  );

  return {
    ...serviceOrders,
    helpers: {
      acceptSolution,
      add,
      getByStatus,
      getDepartmentOrders,
      getNextId,
      getWithActionRequired,
      mapByStatus,
      orderRequiresAction,
      rejectSolution,
      sortByStatus,
    },
  };
}
