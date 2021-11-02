import type {
  ApiPerson,
  ApiProduct,
  ApiResponseArray,
} from "../../../na3-types";

export interface Product {
  get: () => ApiProduct;
  getCustomers(options?: {
    ignoreErrors?: false;
  }): Promise<ApiResponseArray<ApiPerson>>;
  getCustomers(options?: { ignoreErrors: true }): Promise<ApiPerson[]>;
}
