import firebase from "firebase";
import { useMemo } from "react";

import type { Na3ServiceOrder } from "../../na3-types";
import { resolveCollectionId } from "../utils";
import { useStateSlice } from "./useStateSlice";

export type UseNa3ServiceOrdersResult = {
  data: Na3ServiceOrder[] | null;
  error: firebase.FirebaseError | null;
  helpers: Record<string, never>;
  loading: boolean;
};

export function useNa3ServiceOrders(): UseNa3ServiceOrdersResult {
  const { environment } = useStateSlice("config");
  const serviceOrders = useStateSlice("serviceOrders");

  const fbCollectionReference = useMemo(
    () =>
      firebase
        .firestore()
        .collection(resolveCollectionId("tickets", environment)),
    [environment]
  );

  return {
    ...serviceOrders,
    helpers: {},
  };
}
