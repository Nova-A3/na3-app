import firebase from "firebase";
import { useCallback, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useDispatch } from "react-redux";

import type { Na3ServiceOrder } from "../../../na3-types";
import { useStateSlice } from "../../hooks";
import {
  setServiceOrdersData,
  setServiceOrdersError,
  setServiceOrdersLoading,
} from "../../store/actions";
import { resolveCollectionId } from "../../utils";

export function Na3ServiceOrdersController(): null {
  const { environment } = useStateSlice("config");
  const { department } = useStateSlice("auth");

  const dispatch = useDispatch();

  const [fbServiceOrders, fbServiceOrdersLoading, fbServiceOrdersError] =
    useCollectionData<Na3ServiceOrder, "id">(
      firebase
        .firestore()
        .collection(resolveCollectionId("tickets", environment)),
      { idField: "id" }
    );

  /* ServiceOrders state management hooks */

  useEffect(() => {
    dispatch(setServiceOrdersData(fbServiceOrders || null));
  }, [dispatch, fbServiceOrders]);

  useEffect(() => {
    dispatch(setServiceOrdersLoading(fbServiceOrdersLoading));
  }, [dispatch, fbServiceOrdersLoading]);

  useEffect(() => {
    dispatch(setServiceOrdersError(fbServiceOrdersError || null));
  }, [dispatch, fbServiceOrdersError]);

  /* Update on auth */

  const forceRefreshServiceOrders = useCallback(async () => {
    dispatch(setServiceOrdersLoading(true));
    dispatch(setServiceOrdersError(null));
    dispatch(setServiceOrdersData(null));

    if (department) {
      const serviceOrdersSnapshot = await firebase
        .firestore()
        .collection(resolveCollectionId("tickets", environment))
        .get();

      dispatch(
        setServiceOrdersData(
          serviceOrdersSnapshot.docs.map(
            (doc) => doc.data() as Na3ServiceOrder
          ) || null
        )
      );
    }

    dispatch(setServiceOrdersLoading(false));
  }, [dispatch, department, environment]);

  useEffect(() => {
    void forceRefreshServiceOrders();
  }, [forceRefreshServiceOrders]);

  return null;
}
