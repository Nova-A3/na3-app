import type { GlobalSetLoadingAction, GlobalState } from "../../types";

export const setGlobalLoading = (
  loading: GlobalState["loading"]
): GlobalSetLoadingAction => ({
  loading,
  type: "GLOBAL_SET_LOADING",
});
