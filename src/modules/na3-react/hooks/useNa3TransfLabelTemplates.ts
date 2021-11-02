import firebase from "firebase";
import { useCallback, useMemo } from "react";

import type { Na3TransfLabelTemplate } from "../../na3-types";
import { resolveCollectionId } from "../utils";
import { useStateSlice } from "./useStateSlice";

export type UseNa3TransfLabelTemplatesResult = {
  data: Na3TransfLabelTemplate[] | null;
  error: firebase.FirebaseError | null;
  helpers: {
    add: (templateData: Omit<Na3TransfLabelTemplate, "id">) => Promise<
      | {
          data: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
          error: null;
        }
      | { data: null; error: firebase.FirebaseError }
    >;
    delete: (
      templateId: string
    ) => Promise<{ error: firebase.FirebaseError } | { error: null }>;
    getById: (id: string) => Na3TransfLabelTemplate | undefined;
    update: (
      templateId: string,
      templateData: Omit<Na3TransfLabelTemplate, "id">
    ) => Promise<
      | {
          data: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
          error: null;
        }
      | { data: null; error: firebase.FirebaseError }
    >;
  };
  loading: boolean;
};

export function useNa3TransfLabelTemplates(): UseNa3TransfLabelTemplatesResult {
  const { environment } = useStateSlice("config");
  const { transf: transfLabelTemplates } = useStateSlice("labelTemplates");

  const fbCollectionReference = useMemo(
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
        const documentReference = await fbCollectionReference.add(templateData);
        return { data: documentReference, error: null };
      } catch (error) {
        return { data: null, error: error as firebase.FirebaseError };
      }
    },
    [fbCollectionReference]
  );

  const update = useCallback(
    async (
      templateId: string,
      templateData: Omit<Na3TransfLabelTemplate, "id">
    ) => {
      try {
        const documentReference = fbCollectionReference.doc(templateId);
        await documentReference.update(templateData);
        return { data: documentReference, error: null };
      } catch (error) {
        return { data: null, error: error as firebase.FirebaseError };
      }
    },
    [fbCollectionReference]
  );

  const del = useCallback(
    async (templateId: string) => {
      try {
        const documentReference = fbCollectionReference.doc(templateId);
        await documentReference.delete();
        return { error: null };
      } catch (error) {
        return { error: error as firebase.FirebaseError };
      }
    },
    [fbCollectionReference]
  );

  return {
    ...transfLabelTemplates,
    helpers: { add, delete: del, getById, update },
  };
}
