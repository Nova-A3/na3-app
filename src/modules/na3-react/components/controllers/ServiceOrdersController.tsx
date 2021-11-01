import firebase from "firebase";
import { useEffect } from "react";
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

  return null;
}
