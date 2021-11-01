import type {
  AuthSetDepartmentAction,
  AuthSetErrorAction,
  AuthSetLoadingAction,
  AuthSetUserAction,
  AuthState,
} from "../../types";

export const setAuthUser = (user: AuthState["user"]): AuthSetUserAction => ({
  type: "AUTH_SET_USER",
  user,
});

export const setAuthLoading = (
  loading: AuthState["loading"]
): AuthSetLoadingAction => ({
  loading,
  type: "AUTH_SET_LOADING",
});

export const setAuthError = (
  error: AuthState["error"]
): AuthSetErrorAction => ({
  error,
  type: "AUTH_SET_ERROR",
});

export const setAuthDepartment = (
  department: AuthState["department"]
): AuthSetDepartmentAction => ({
  department,
  type: "AUTH_SET_DEPARTMENT",
});
