import type firebase from "firebase";

import type { Na3Department } from "../../../na3-types";

export type DepartmentsState = {
  data: Na3Department[] | null;
  loading: boolean;
  error: firebase.FirebaseError | null;
};

export type DepartmentsSetDataAction = {
  type: "DEPARTMENTS_SET_DATA";
  data: DepartmentsState["data"];
};

export type DepartmentsSetLoadingAction = {
  type: "DEPARTMENTS_SET_LOADING";
  loading: DepartmentsState["loading"];
};

export type DepartmentsSetErrorAction = {
  type: "DEPARTMENTS_SET_ERROR";
  error: DepartmentsState["error"];
};

export type DepartmentsAction =
  | DepartmentsSetDataAction
  | DepartmentsSetErrorAction
  | DepartmentsSetLoadingAction;
