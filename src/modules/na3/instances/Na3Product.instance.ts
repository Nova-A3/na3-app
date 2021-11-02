import type {
  ApiPerson,
  ApiProduct,
  ApiResponseArray,
  ApiResponseSuccess,
} from "../../na3-types";
import type { Product } from "../types";
import { Na3PeopleController } from "./Na3People.controller";

export class Na3Product implements Product {
  private readonly peopleController = new Na3PeopleController();

  constructor(private readonly _product: ApiProduct) {}

  get(): ApiProduct {
    return this._product;
  }

  async getCustomers(options?: {
    ignoreErrors?: false;
  }): Promise<ApiResponseArray<ApiPerson>>;
  async getCustomers(options?: { ignoreErrors: true }): Promise<ApiPerson[]>;
  async getCustomers(options?: {
    ignoreErrors?: boolean;
  }): Promise<ApiPerson[] | ApiResponseArray<ApiPerson>> {
    const customersRes = await Promise.all(
      this._product.customerIds.map(async (customerId) =>
        this.peopleController.getById(customerId)
      )
    );

    return options?.ignoreErrors
      ? customersRes
          .filter((res): res is ApiResponseSuccess<ApiPerson> => !!res.data)
          .map((r) => r.data)
      : {
          data: customersRes.map((response) => response.data),
          errors: customersRes.map((response) => response.error),
        };
  }
}
