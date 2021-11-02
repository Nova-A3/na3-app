import type { ApiLabel } from "../api/ApiLabel";
import type { ApiProduct } from "../api/ApiProduct";

export type Na3TransfLabelTemplate = Pick<
  ApiLabel<"transf">,
  | "batchIdFormat"
  | "customerName"
  | "productCode"
  | "productName"
  | "productUnitAbbreviation"
  | "productUnitName"
> & {
  customerId: string | null;
  id: string;
  name: string;
  productId: string;
  productSnapshot: ApiProduct | null;
};
