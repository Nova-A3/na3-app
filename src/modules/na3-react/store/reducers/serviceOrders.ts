import type { Reducer } from "redux";

import type { ServiceOrdersAction, ServiceOrdersState } from "../../types";
import { sortStateData } from "../../utils";

const initialState: ServiceOrdersState = {
  data: null,
  error: null,
  loading: true,
};

export const serviceOrdersReducer: Reducer<
  ServiceOrdersState,
  ServiceOrdersAction
> = (state = initialState, action) => {
  switch (action.type) {
    case "SERVICE_ORDERS_SET_DATA":
      return { ...state, data: sortStateData(action.data, "id") };
    case "SERVICE_ORDERS_SET_LOADING":
      return { ...state, loading: action.loading };
    case "SERVICE_ORDERS_SET_ERROR":
      return { ...state, error: action.error };

    default:
      return state;
  }
};
