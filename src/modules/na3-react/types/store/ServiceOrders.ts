import type firebase from "firebase";

import type { Na3ServiceOrder } from "../../../na3-types";

export type ServiceOrdersState = {
  data: Na3ServiceOrder[] | null;
  error: firebase.FirebaseError | null;
  loading: boolean;
};

export type ServiceOrdersSetDataAction = {
  data: ServiceOrdersState["data"];
  type: "SERVICE_ORDERS_SET_DATA";
};

export type ServiceOrdersSetLoadingAction = {
  loading: ServiceOrdersState["loading"];
  type: "SERVICE_ORDERS_SET_LOADING";
};

export type ServiceOrdersSetErrorAction = {
  error: ServiceOrdersState["error"];
  type: "SERVICE_ORDERS_SET_ERROR";
};

export type ServiceOrdersAction =
  | ServiceOrdersSetDataAction
  | ServiceOrdersSetErrorAction
  | ServiceOrdersSetLoadingAction;
