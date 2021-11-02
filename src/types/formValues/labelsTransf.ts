export type LabelsTransfCreateTemplateFormValues = {
  batchIdFormat: "brazil" | "mexico";
  customerName: string;
  productCode: string;
  productName: string;
  productUnitDisplay: string;
  templateName: string;
};

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

export type LabelsTransfPrintFormOnSubmitValues = {
  batchId: string;
  batchIdFormat: "brazil" | "mexico";
  copies: number;
  customerName: string;
  date: string;
  invoiceNumber: string;
  productCode: string;
  productName: string;
  productQuantity: string;
  productUnitAbbreviation: string;
  productUnitName: string;
};
