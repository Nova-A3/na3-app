export type GlobalState = {
  loading: boolean;
};

export type GlobalSetLoadingAction = {
  type: "GLOBAL_SET_LOADING";
  loading: GlobalState["loading"];
};

export type GlobalAction = GlobalSetLoadingAction;
