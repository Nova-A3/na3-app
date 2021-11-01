import type firebase from "firebase";

import type { Na3Department } from "../../../na3-types";

export type AuthState = {
  user: firebase.User | null | undefined;
  loading: boolean;
  error: firebase.auth.Error | null;
  department: Na3Department | null;
};

export type AuthSetUserAction = {
  type: "AUTH_SET_USER";
  user: AuthState["user"];
};

export type AuthSetLoadingAction = {
  type: "AUTH_SET_LOADING";
  loading: AuthState["loading"];
};

export type AuthSetErrorAction = {
  type: "AUTH_SET_ERROR";
  error: AuthState["error"];
};

export type AuthSetDepartmentAction = {
  type: "AUTH_SET_DEPARTMENT";
  department: AuthState["department"];
};

export type AuthAction =
  | AuthSetDepartmentAction
  | AuthSetErrorAction
  | AuthSetLoadingAction
  | AuthSetUserAction;
