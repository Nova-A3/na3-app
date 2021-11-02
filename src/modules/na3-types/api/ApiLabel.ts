type ApiLabelId = "transf";

export type ApiLabel<Id extends ApiLabelId = ApiLabelId> = {
  transf: {
    barcodeData: string;
    batchId: string;
    batchIdFormat: "brazil" | "mexico";
    customerName: string;
    date: string;
    invoiceNumber: string | null;
    productCode: string;
    productName: string;
    productQuantity: number | string;
    productUnitAbbreviation: string;
    productUnitName: string;
    qrData: string;
    transfId: string | null;
  };
}[Id];

export type ApiLabelPrintResponse =
  | { failed: false; status: "success" }
  | { failed: true; status: "fail" };
