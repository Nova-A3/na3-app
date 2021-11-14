import dayjs from "dayjs";
import firebase from "firebase";
import { useCallback, useRef } from "react";

import type {
  Na3MaintenanceProject,
  Na3MaintenanceProjectStatus,
} from "../../na3-types";
import type { FirebaseOperationResult } from "../types";
import type { MaintProjectBuilderData } from "../utils";
import { buildMaintProject, resolveCollectionId } from "../utils";
import { useStateSlice } from "./useStateSlice";

export type UseNa3MaintProjectsResult = {
  data: Na3MaintenanceProject[] | null;
  error: firebase.FirebaseError | null;
  helpers: {
    add: (
      internalId: number,
      projectData: MaintProjectBuilderData
    ) => Promise<FirebaseOperationResult<Na3MaintenanceProject>>;
    formatInternalId: (internalId: number) => string;
    getById: (id: string) => Na3MaintenanceProject | undefined;
    getByStatus: (
      status: Na3MaintenanceProjectStatus | Na3MaintenanceProjectStatus[],
      data?: Na3MaintenanceProject[]
    ) => Na3MaintenanceProject[];
    getNextInternalId: () => number | undefined;
    getProjectStatus: (
      project: Na3MaintenanceProject
    ) => Na3MaintenanceProjectStatus;
    mapByStatus: (
      data?: Na3MaintenanceProject[]
    ) => Record<Na3MaintenanceProjectStatus, Na3MaintenanceProject[]>;
    sortByStatus: (
      sortingOrder: Na3MaintenanceProjectStatus[],
      data?: Na3MaintenanceProject[]
    ) => Na3MaintenanceProject[];
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

  const getNextInternalId = useCallback((): number | undefined => {
    const lastId = maintProjects.data
      ?.map((project) => project.internalId)
      .sort((a, b) => a - b)
      .pop();
    return lastId ? lastId + 1 : undefined;
  }, [maintProjects.data]);

  const formatInternalId = useCallback((internalId: number): string => {
    return `PR-${internalId.toString().padStart(4, "0")}`;
  }, []);

  const getById = useCallback(
    (id: string): Na3MaintenanceProject | undefined =>
      maintProjects.data?.find((project) => project.id === id),
    [maintProjects.data]
  );

  const getProjectStatus = useCallback(
    (project: Na3MaintenanceProject): Na3MaintenanceProjectStatus => {
      if (project.events.map((ev) => ev.type).includes("complete")) {
        return "finished";
      } else if (dayjs(project.eta.toDate()).diff(dayjs()) < 0) {
        return "late";
      }
      return "running";
    },
    []
  );

  const getByStatus = useCallback(
    (
      status: Na3MaintenanceProjectStatus | Na3MaintenanceProjectStatus[],
      data?: Na3MaintenanceProject[]
    ): Na3MaintenanceProject[] => {
      const statusArr = typeof status === "string" ? [status] : status;
      return (
        (data || maintProjects.data)?.filter((project) =>
          statusArr.includes(getProjectStatus(project))
        ) || []
      );
    },
    [maintProjects.data, getProjectStatus]
  );

  const mapByStatus = useCallback(
    (
      data?: Na3MaintenanceProject[]
    ): Record<Na3MaintenanceProjectStatus, Na3MaintenanceProject[]> => {
      return {
        finished: getByStatus("finished", data),
        late: getByStatus("late", data),
        running: getByStatus("running", data),
      };
    },
    [getByStatus]
  );

  const sortByStatus = useCallback(
    (
      sortingOrder: Na3MaintenanceProjectStatus[],
      data?: Na3MaintenanceProject[]
    ): Na3MaintenanceProject[] => {
      const statusMap = mapByStatus(data);
      return sortingOrder.flatMap((status) =>
        [...statusMap[status]].sort((a, b) => b.internalId - a.internalId)
      );
    },
    [mapByStatus]
  );

  const add = useCallback(
    async (internalId: number, projectData: MaintProjectBuilderData) => {
      const project = buildMaintProject(internalId, projectData);
      try {
        const docRef = (await fbCollectionRef.current.add(
          project
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
    helpers: {
      add,
      formatInternalId,
      getById,
      getByStatus,
      getNextInternalId,
      getProjectStatus,
      mapByStatus,
      sortByStatus,
    },
  };
}
