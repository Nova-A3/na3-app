import type { ApiCompany } from "./ApiCompany";
import type { ApiPerson } from "./ApiPerson";
import type { ApiProduct } from "./ApiProduct";

type ApiDocumentItem = {
  batchSeries: { code: string; id: string; type: "L" | "S" } | null;
  id: string;
  inputDepartmentId: string | null;
  outputDepartmentId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  weight: {
    gross: number;
    net: number;
  };
};

type ApiDocumentPayt = {
  agreementPersonId: string | null;
  agreementRate: number;
  agreementTacRate: number;
  amount: number;
  amountFees: number;
  amountTacAgreement: number;
  amountTacCompany: number;
  cardAuthorizationNumber: string | null;
  cardUniqueSequentialNumber: string | null;
  cardholderName: string | null;
  checkNumber: string;
  companyTacRate: number;
  days: number;
  daysForFirstInstallment: number;
  daysInterval: number;
  daysReceipt: number;
  dueDate: string;
  financialPersonId: string | null;
  groupingDescription: string;
  id: string;
  installments: number;
  installmentsReceipt: number;
  naturezaLancamentoId: string;
  paymentMethodId: string;
  shouldUpdateFinancial: boolean;
  taxRate: number;
  titleNumber: number;
  writeOffTypeId: string | null;
};

export type ApiDocument = {
  accessKey: string;
  billing: string | null;
  businessUnit: { code: string; description: string; id: string } | null;
  canceled: boolean;
  commDocStatus: string;
  customerId: string;
  documentType: "C" | "F" | "N" | "O" | "S" | "T";
  id: string;
  inventoryBatchId: string;
  issuedAt: string;
  items: ApiDocumentItem[];
  messages: { code: string; description: string; id: string }[];
  nfStatus: "A" | "C" | "D" | "E" | "I" | "N" | "R" | "S" | "X";
  note: string;
  number: string;
  operationId: string;
  originEntityName: string | null;
  paymentRefDate: string;
  payments: ApiDocumentPayt[];
  purposeType: string;
  refDate: string;
  released: boolean;
  sellerCompanyCode: string;
};

export type ApiDocumentExpanded = Omit<ApiDocument, "items"> & {
  customer: ApiPerson | null;
  items: (ApiDocumentItem & { product: ApiProduct | null })[];
  sellerCompany: ApiCompany | null;
};
