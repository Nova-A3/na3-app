import type { Reducer } from "redux";

import type { MaintProjectsAction, MaintProjectsState } from "../../types";

const initialState: MaintProjectsState = {
  data: null,
  error: null,
  loading: true,
};

export const maintProjectsReducer: Reducer<
  MaintProjectsState,
  MaintProjectsAction
> = (state = initialState, action) => {
  switch (action.type) {
    case "MAINT_PROJECTS_SET_DATA":
      return {
        ...state,
        data: action.data
          ? [...action.data].sort((a, b) => a.internalId - b.internalId)
          : null,
      };
    case "MAINT_PROJECTS_SET_LOADING":
      return { ...state, loading: action.loading };
    case "MAINT_PROJECTS_SET_ERROR":
      return { ...state, error: action.error };

    default:
      return state;
  }
};
