import firebase from "firebase";
import { useCallback, useMemo } from "react";

import type { Na3TransfLabelTemplate } from "../../na3-types";
import type {
  FirebaseNullOperationResult,
  FirebaseOperationResult,
} from "../types";
import { resolveCollectionId } from "../utils";
import { useStateSlice } from "./useStateSlice";

export type UseNa3TransfLabelTemplatesResult = {
  data: Na3TransfLabelTemplate[] | null;
  error: firebase.FirebaseError | null;
  helpers: {
    add: (
      templateData: Omit<Na3TransfLabelTemplate, "id">
    ) => Promise<FirebaseOperationResult>;
    delete: (templateId: string) => Promise<FirebaseNullOperationResult>;
    getById: (id: string) => Na3TransfLabelTemplate | undefined;
    update: (
      templateId: string,
      templateData: Omit<Na3TransfLabelTemplate, "id">
    ) => Promise<FirebaseOperationResult>;
  };
  loading: boolean;
};

export function useNa3TransfLabelTemplates(): UseNa3TransfLabelTemplatesResult {
  const { environment } = useStateSlice("config");
  const { transf: transfLabelTemplates } = useStateSlice("labelTemplates");

  const fbCollectionRef = useMemo(
    () =>
      firebase
        .firestore()
        .collection(resolveCollectionId("transf-label-templates", environment)),
    [environment]
  );

  const getById = useCallback(
    (id: string): Na3TransfLabelTemplate | undefined =>
      transfLabelTemplates.data?.find((template) => template.id === id),
    [transfLabelTemplates.data]
  );

  const add = useCallback(
    async (templateData: Omit<Na3TransfLabelTemplate, "id">) => {
      try {
        const docRef = await fbCollectionRef.add(templateData);
        return { data: docRef, error: null };
      } catch (error) {
        return { data: null, error: error as firebase.FirebaseError };
      }
    },
    [fbCollectionRef]
  );

  const update = useCallback(
    async (
      templateId: string,
      templateData: Omit<Na3TransfLabelTemplate, "id">
    ) => {
      try {
        const docRef = fbCollectionRef.doc(templateId);
        await docRef.update(templateData);
        return { data: docRef, error: null };
      } catch (error) {
        return { data: null, error: error as firebase.FirebaseError };
      }
    },
    [fbCollectionRef]
  );

  const del = useCallback(
    async (templateId: string) => {
      try {
        const docRef = fbCollectionRef.doc(templateId);
        await docRef.delete();
        return { error: null };
      } catch (error) {
        return { error: error as firebase.FirebaseError };
      }
    },
    [fbCollectionRef]
  );

  return {
    ...transfLabelTemplates,
    helpers: { add, delete: del, getById, update },
  };
}
