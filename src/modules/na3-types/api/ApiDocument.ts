import type { ApiCompany } from "./ApiCompany";
import type { ApiPerson } from "./ApiPerson";
import type { ApiProduct } from "./ApiProduct";

type ApiDocumentItem = {
  id: string;
  batchSeries: { id: string; code: string; type: "L" | "S" } | null;
  productId: string;
  inputDepartmentId: string | null;
  outputDepartmentId: string;
  quantity: number;
  unitPrice: number;
  weight: {
    net: number;
    gross: number;
  };
};

type ApiDocumentPayt = {
  id: string;
  taxRate: number;
  agreementRate: number;
  agreementTacRate: number;
  companyTacRate: number;
  shouldUpdateFinancial: boolean;
  dueDate: string;
  groupingDescription: string;
  paymentMethodId: string;
  naturezaLancamentoId: string;
  agreementPersonId: string | null;
  financialPersonId: string | null;
  writeOffTypeId: string | null;
  cardholderName: string | null;
  cardAuthorizationNumber: string | null;
  cardUniqueSequentialNumber: string | null;
  checkNumber: string;
  days: number;
  daysInterval: number;
  daysForFirstInstallment: number;
  daysReceipt: number;
  installments: number;
  installmentsReceipt: number;
  titleNumber: number;
  amount: number;
  amountFees: number;
  amountTacAgreement: number;
  amountTacCompany: number;
};

export type ApiDocument = {
  accessKey: string;
  id: string;
  number: string;
  inventoryBatchId: string;
  nfStatus: "A" | "C" | "D" | "E" | "I" | "N" | "R" | "S" | "X";
  commDocStatus: string;
  purposeType: string;
  documentType: "C" | "F" | "N" | "O" | "S" | "T";
  released: boolean;
  canceled: boolean;
  businessUnit: { id: string; code: string; description: string } | null;
  sellerCompanyCode: string;
  issuedAt: string;
  refDate: string;
  paymentRefDate: string;
  operationId: string;
  customerId: string;
  items: ApiDocumentItem[];
  originEntityName: string | null;
  billing: string | null;
  payments: ApiDocumentPayt[];
  note: string;
  messages: { id: string; code: string; description: string }[];
};

export type ApiDocumentExpanded = Omit<ApiDocument, "items"> & {
  items: (ApiDocumentItem & { product: ApiProduct | null })[];
  sellerCompany: ApiCompany | null;
  customer: ApiPerson | null;
};
