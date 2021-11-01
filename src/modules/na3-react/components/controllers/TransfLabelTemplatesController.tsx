import firebase from "firebase";
import { useEffect } from "react";
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

  return null;
}
