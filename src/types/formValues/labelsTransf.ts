import type { Na3TransfLabelTemplate } from "../../modules/na3-types";

export type LabelsTransfPrintFormValues = {
  batchId: string;
  copies: string;
  customerName: string;
  date: string;
  invoiceNumber: string;
  productCode: string;
  productName: string;
  productQuantity: string;
  productUnitDisplay: string;
};

export type LabelsTransfPrintFormOnSubmitValues = Omit<
  Na3TransfLabelTemplate,
  "id"
> & {
  batchId: string;
  copies: number;
  date: string;
  invoiceNumber: string;
  productQuantity: string;
  templateId: Na3TransfLabelTemplate["id"];
};
