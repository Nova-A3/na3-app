import firebase from "firebase";
import { useCallback, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useDispatch } from "react-redux";

import type { Na3TransfLabelTemplate } from "../../../na3-types";
import { useStateSlice } from "../../hooks";
import {
  setTransfLabelTemplatesData,
  setTransfLabelTemplatesError,
  setTransfLabelTemplatesLoading,
} from "../../store/actions";
import { resolveCollectionId } from "../../utils";

export function Na3TransfLabelTemplatesController(): null {
  const { environment } = useStateSlice("config");
  const { department } = useStateSlice("auth");

  const dispatch = useDispatch();

  const [
    fbTransfLabelTemplates,
    fbTransfLabelTemplatesLoading,
    fbTransfLabelTemplatesError,
  ] = useCollectionData<Na3TransfLabelTemplate, "id">(
    firebase
      .firestore()
      .collection(resolveCollectionId("transf-label-templates", environment)),
    { idField: "id" }
  );

  /* TransfLabelTemplates state management hooks */

  useEffect(() => {
    dispatch(
      setTransfLabelTemplatesData(
        fbTransfLabelTemplates?.sort((a, b) => a.name.localeCompare(b.name)) ||
          null
      )
    );
  }, [dispatch, fbTransfLabelTemplates]);

  useEffect(() => {
    dispatch(setTransfLabelTemplatesLoading(fbTransfLabelTemplatesLoading));
  }, [dispatch, fbTransfLabelTemplatesLoading]);

  useEffect(() => {
    dispatch(setTransfLabelTemplatesError(fbTransfLabelTemplatesError || null));
  }, [dispatch, fbTransfLabelTemplatesError]);

  /* Update on auth */

  const forceRefreshTemplates = useCallback(async () => {
    dispatch(setTransfLabelTemplatesLoading(true));
    dispatch(setTransfLabelTemplatesError(null));
    dispatch(setTransfLabelTemplatesData(null));

    if (department) {
      const templatesSnapshot = await firebase
        .firestore()
        .collection(resolveCollectionId("transf-label-templates", environment))
        .get();

      dispatch(
        setTransfLabelTemplatesData(
          templatesSnapshot.docs.map((doc) => ({
            ...(doc.data() as Na3TransfLabelTemplate),
            id: doc.id,
          })) || null
        )
      );
    }

    dispatch(setTransfLabelTemplatesLoading(false));
  }, [dispatch, department, environment]);

  useEffect(() => {
    void forceRefreshTemplates();
  }, [forceRefreshTemplates]);

  return null;
}
