import type { Reducer } from "redux";
import type { LabelTemplatesAction, LabelTemplatesState } from "../../types";

const initialState: LabelTemplatesState = {
  transf: { data: null, error: null, loading: true },
};

export const labelTemplatesReducer: Reducer<
  LabelTemplatesState,
  LabelTemplatesAction
> = (state = initialState, action) => {
  switch (action.type) {
    case "LABEL_TEMPLATES_TRANSF_SET_DATA":
      return { ...state, transf: { ...state.transf, data: action.data } };
    case "LABEL_TEMPLATES_TRANSF_SET_LOADING":
      return { ...state, transf: { ...state.transf, loading: action.loading } };
    case "LABEL_TEMPLATES_TRANSF_SET_ERROR":
      return { ...state, transf: { ...state.transf, error: action.error } };

    default:
      return state;
  }
};
