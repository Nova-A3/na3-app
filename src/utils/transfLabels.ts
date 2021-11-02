import type { ApiLabel } from "../modules/na3-types";
import type { LabelsTransfPrintFormOnSubmitValues } from "../types";

export function formatProductUnit(name: string, abbreviation: string): string {
  return `${name.toUpperCase()} (${abbreviation.toUpperCase()})`;
}

export function createTransfLabelFromPrintForm({
  batchId,
  batchIdFormat,
  customerName,
  date,
  invoiceNumber,
  productCode,
  productName,
  productQuantity,
  productUnitAbbreviation,
  productUnitName,
}: LabelsTransfPrintFormOnSubmitValues): ApiLabel<"transf"> {
  return {
    barcodeData: productCode,
    batchId,
    batchIdFormat,
    customerName,
    date,
    invoiceNumber,
    productCode,
    productName,
    productQuantity,
    productUnitAbbreviation,
    productUnitName,
    qrData: `https://app.novaa3.com.br/transf/${batchId
      .trim()
      .toUpperCase()
      .replace(/[- ]/g, "")}`,
    transfId: null,
  };
}
