import type { Reducer } from "redux";

import type { GlobalAction, GlobalState } from "../../types";

const initialState: GlobalState = {
  loading: true,
};

export const globalReducer: Reducer<GlobalState, GlobalAction> = (
  state = initialState,
  action
) => {
  if (action.type === "GLOBAL_SET_LOADING") {
    return { ...state, loading: action.loading };
  }
  return state;
};
