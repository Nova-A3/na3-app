import type firebase from "firebase";
import type { Na3ServiceOrder } from "../../../na3-types";

export type ServiceOrdersState = {
  data: Na3ServiceOrder[] | null;
  loading: boolean;
  error: firebase.FirebaseError | null;
};

export type ServiceOrdersSetDataAction = {
  type: "SERVICE_ORDERS_SET_DATA";
  data: ServiceOrdersState["data"];
};

export type ServiceOrdersSetLoadingAction = {
  type: "SERVICE_ORDERS_SET_LOADING";
  loading: ServiceOrdersState["loading"];
};

export type ServiceOrdersSetErrorAction = {
  type: "SERVICE_ORDERS_SET_ERROR";
  error: ServiceOrdersState["error"];
};

export type ServiceOrdersAction =
  | ServiceOrdersSetDataAction
  | ServiceOrdersSetErrorAction
  | ServiceOrdersSetLoadingAction;
