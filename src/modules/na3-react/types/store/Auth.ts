import type firebase from "firebase";

import type { Na3Department } from "../../../na3-types";

export type AuthState = {
  department: Na3Department | null;
  error: firebase.auth.Error | null;
  loading: boolean;
  user: firebase.User | null | undefined;
};

export type AuthSetUserAction = {
  type: "AUTH_SET_USER";
  user: AuthState["user"];
};

export type AuthSetLoadingAction = {
  loading: AuthState["loading"];
  type: "AUTH_SET_LOADING";
};

export type AuthSetErrorAction = {
  error: AuthState["error"];
  type: "AUTH_SET_ERROR";
};

export type AuthSetDepartmentAction = {
  department: AuthState["department"];
  type: "AUTH_SET_DEPARTMENT";
};

export type AuthAction =
  | AuthSetDepartmentAction
  | AuthSetErrorAction
  | AuthSetLoadingAction
  | AuthSetUserAction;
