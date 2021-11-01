import type { Reducer } from "redux";

import type { DepartmentsAction, DepartmentsState } from "../../types";

const initialState: DepartmentsState = {
  data: null,
  error: null,
  loading: true,
};

export const departmentsReducer: Reducer<DepartmentsState, DepartmentsAction> =
  (state = initialState, action) => {
    switch (action.type) {
      case "DEPARTMENTS_SET_DATA":
        return { ...state, data: action.data };
      case "DEPARTMENTS_SET_LOADING":
        return { ...state, loading: action.loading };
      case "DEPARTMENTS_SET_ERROR":
        return { ...state, error: action.error };

      default:
        return state;
    }
  };
