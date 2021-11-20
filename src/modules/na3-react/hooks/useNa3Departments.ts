import type firebase from "firebase";
import { useCallback } from "react";

import type {
  Na3Department,
  Na3DepartmentId,
  Na3DepartmentType,
} from "../../na3-types";
import { useStateSlice } from "./useStateSlice";

export type UseNa3DepartmentsResult = {
  data: Na3Department[] | null;
  error: firebase.FirebaseError | null;
  helpers: {
    getByDisplayName: (displayName: string) => Na3Department | undefined;
    getById: (id: string) => Na3Department | undefined;
    getByIdsOrTypes: (
      idsOrTypes: (Na3DepartmentId | Na3DepartmentType)[]
    ) => Na3Department[] | undefined;
    getByType: <T extends Na3DepartmentType>(
      type: T
    ) => Na3Department<T>[] | undefined;
    getDptTypeName: (
      type: Na3DepartmentType
    ) => "Fábrica" | "Filial" | "Setores";
    isDptType: (type: unknown) => type is Na3DepartmentType;
  };
  loading: boolean;
};

export function useNa3Departments(): UseNa3DepartmentsResult {
  const departments = useStateSlice("departments");

  const getBy = useCallback(
    (attr: "displayName" | "id", value: string): Na3Department | undefined =>
      departments.data?.find(
        (dpt) => dpt[attr].toLowerCase().trim() === value.toLowerCase().trim()
      ),
    [departments.data]
  );

  const getById = useCallback(
    (id: string): Na3Department | undefined => getBy("id", id),
    [getBy]
  );

  const getByDisplayName = useCallback(
    (displayName: string): Na3Department | undefined =>
      getBy("displayName", displayName),
    [getBy]
  );

  const getByType = useCallback(
    <T extends Na3DepartmentType>(type: T): Na3Department<T>[] | undefined =>
      departments.data?.filter(
        (dpt): dpt is Na3Department<T> => dpt.type === type
      ),
    [departments.data]
  );

  const getByIdsOrTypes = useCallback(
    (
      idsOrTypes: (Na3DepartmentId | Na3DepartmentType)[]
    ): Na3Department[] | undefined =>
      departments.data?.filter(
        (dpt) => idsOrTypes.includes(dpt.type) || idsOrTypes.includes(dpt.id)
      ),
    [departments.data]
  );

  const getDptTypeName = useCallback(
    (type: Na3DepartmentType): "Fábrica" | "Filial" | "Setores" => {
      switch (type) {
        case "shop-floor":
          return "Setores";
        case "factory-adm":
          return "Fábrica";
        case "office":
          return "Filial";
      }
    },
    []
  );

  const isDptType = useCallback((type: unknown): type is Na3DepartmentType => {
    return (
      typeof type === "string" &&
      ["factory-adm", "office", "shop-floor"].includes(type)
    );
  }, []);

  return {
    ...departments,
    helpers: {
      getByDisplayName,
      getById,
      getByIdsOrTypes,
      getByType,
      getDptTypeName,
      isDptType,
    },
  };
}
