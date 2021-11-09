import firebase from "firebase";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useDispatch } from "react-redux";

import type { Na3Department } from "../../../na3-types";
import {
  setAuthDepartment,
  setAuthError,
  setAuthLoading,
  setAuthUser,
  setConfigEnvironment,
  setDepartmentsData,
  setDepartmentsError,
  setDepartmentsLoading,
  setGlobalDevice,
  setGlobalLoading,
} from "../../store/actions";
import type { ConfigState } from "../../types";
import { getDevice, translateFirebaseError } from "../../utils";

type Na3MainControllerProps = {
  appVersion: string;
  env: ConfigState["environment"] | undefined;
};

export function Na3MainController({
  env,
  appVersion,
}: Na3MainControllerProps): null {
  const dispatch = useDispatch();

  const [fbUser, fbUserLoading, fbUserError] = useAuthState(firebase.auth());

  const [fbDepartments, fbDepartmentsLoading, fbDepartmentsError] =
    useCollectionData<Na3Department>(
      firebase.firestore().collection("departments")
    );

  /* Config state management hook */

  useEffect(() => {
    if (env) dispatch(setConfigEnvironment(env));
  }, [dispatch, env]);

  /* Auth state management hooks */

  useEffect(() => {
    dispatch(setAuthUser(fbUser));
  }, [dispatch, fbUser]);

  useEffect(() => {
    dispatch(setAuthLoading(fbUserLoading));
  }, [dispatch, fbUserLoading]);

  useEffect(() => {
    dispatch(
      setAuthError(
        fbUserError
          ? {
              ...fbUserError,
              message: translateFirebaseError(fbUserError.code),
            }
          : null
      )
    );
  }, [dispatch, fbUserError]);

  useEffect(() => {
    dispatch(
      setAuthDepartment(
        fbDepartments?.find(
          (dpt) =>
            dpt.id ===
            (fbUser?.email || "").slice(
              0,
              Math.max(0, (fbUser?.email || "").indexOf("@"))
            )
        ) || null
      )
    );
  }, [dispatch, fbDepartments, fbUser?.email]);

  /* Departments state management hooks */

  useEffect(() => {
    dispatch(setDepartmentsData(fbDepartments || null));
  }, [dispatch, fbDepartments]);

  useEffect(() => {
    dispatch(setDepartmentsLoading(fbDepartmentsLoading));
  }, [dispatch, fbDepartmentsLoading]);

  useEffect(() => {
    dispatch(setDepartmentsError(fbDepartmentsError || null));
  }, [dispatch, fbDepartmentsError]);

  /* Global state management hook */

  useEffect(() => {
    dispatch(setGlobalLoading(fbUserLoading || fbDepartmentsLoading));
  }, [dispatch, fbUserLoading, fbDepartmentsLoading]);

  useEffect(() => {
    dispatch(setGlobalDevice(getDevice({ appVersion })));
  }, [dispatch, appVersion]);

  return null;
}
