type ApiLabelId = "transf";

export type ApiLabel<Id extends ApiLabelId = ApiLabelId> = {
  transf: {
    transfId: string | null;
    customerName: string;
    date: string;
    productCode: string;
    productName: string;
    productQuantity: number | string;
    productUnitAbbreviation: string;
    productUnitName: string;
    batchId: string;
    qrData: string;
    barcodeData: string;
    batchIdFormat: "brazil" | "mexico";
    invoiceNumber: string | null;
  };
}[Id];

export type ApiLabelPrintResponse =
  | { failed: false; status: "success" }
  | { failed: true; status: "fail" };
