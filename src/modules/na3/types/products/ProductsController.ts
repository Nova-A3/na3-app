import type { ApiError, ApiProduct } from "../../../na3-types";
import type { Product } from "./Product";

type ControllerUtils = {
  readonly fixQuery: (query: string) => string;
};

export interface ProductsController {
  readonly getByCode: (
    code: string
  ) => Promise<
    { data: null; error: ApiError } | { data: Product; error: null }
  >;
  readonly getById: (
    id: string
  ) => Promise<
    { data: null; error: ApiError } | { data: Product; error: null }
  >;
  readonly isApiProduct: (testProduct: unknown) => testProduct is ApiProduct;
  readonly isDartBagCode: (testCode: unknown) => testCode is `S-${number}`;
  readonly isProductCode: (
    testCode: unknown
  ) => testCode is `${number}` | `S-${number}`;
  readonly isProductId: (testId: unknown) => testId is `00A000${number}`;
  readonly utils: ControllerUtils;
}
