import firebase from "firebase";
import { useCallback, useRef } from "react";

import type { Na3MaintenanceProject } from "../../na3-types";
import type { FirebaseOperationResult } from "../types";
import { resolveCollectionId } from "../utils";
import { useStateSlice } from "./useStateSlice";

export type UseNa3MaintProjectsResult = {
  data: Na3MaintenanceProject[] | null;
  error: firebase.FirebaseError | null;
  helpers: {
    add: (
      projectData: Omit<Na3MaintenanceProject, "id">
    ) => Promise<FirebaseOperationResult<Na3MaintenanceProject>>;
  };
  loading: boolean;
};

export function useNa3MaintProjects(): UseNa3MaintProjectsResult {
  const { environment } = useStateSlice("config");
  const maintProjects = useStateSlice("maintProjects");

  const fbCollectionRef = useRef(
    firebase
      .firestore()
      .collection(resolveCollectionId("manut-projects", environment))
  );

  const add = useCallback(
    async (projectData: Omit<Na3MaintenanceProject, "id">) => {
      try {
        const docRef = (await fbCollectionRef.current.add(
          projectData
        )) as firebase.firestore.DocumentReference<Na3MaintenanceProject>;

        return { data: docRef, error: null };
      } catch (error) {
        return { data: null, error: error as firebase.FirebaseError };
      }
    },
    []
  );

  return {
    ...maintProjects,
    helpers: { add },
  };
}
