export type GlobalState = {
  loading: boolean;
};

export type GlobalSetLoadingAction = {
  loading: GlobalState["loading"];
  type: "GLOBAL_SET_LOADING";
};

export type GlobalAction = GlobalSetLoadingAction;
