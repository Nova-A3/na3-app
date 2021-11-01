import type firebase from "firebase";
import type { Na3TransfLabelTemplate } from "../../../na3-types";

type LabelTemplateState<Data extends Na3TransfLabelTemplate> = {
  data: Data[] | null;
  loading: boolean;
  error: firebase.FirebaseError | null;
};

export type LabelTemplatesState = {
  transf: LabelTemplateState<Na3TransfLabelTemplate>;
};

export type LabelTemplatesTransfSetDataAction = {
  type: "LABEL_TEMPLATES_TRANSF_SET_DATA";
  data: LabelTemplatesState["transf"]["data"];
};

export type LabelTemplatesTransfSetLoadingAction = {
  type: "LABEL_TEMPLATES_TRANSF_SET_LOADING";
  loading: LabelTemplatesState["transf"]["loading"];
};

export type LabelTemplatesTransfSetErrorAction = {
  type: "LABEL_TEMPLATES_TRANSF_SET_ERROR";
  error: LabelTemplatesState["transf"]["error"];
};

export type LabelTemplatesAction =
  | LabelTemplatesTransfSetDataAction
  | LabelTemplatesTransfSetErrorAction
  | LabelTemplatesTransfSetLoadingAction;
