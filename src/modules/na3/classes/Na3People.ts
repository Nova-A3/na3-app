import type {
  ApiPerson,
  ApiProduct,
  ApiResponse,
  ApiResponseArray,
  ApiResponseSuccess,
} from "../../na3-types";
import { Na3Base } from "./Na3Base";

export class Na3People extends Na3Base {
  async getById(id: string): Promise<ApiResponse<ApiPerson>> {
    return this.getApi<ApiPerson>(`/people/${this.formatQueryInput(id)}`);
  }

  async getCustomers(
    product: ApiProduct,
    options?: { ignoreErrors?: false }
  ): Promise<ApiResponseArray<ApiPerson>>;
  async getCustomers(
    product: ApiProduct,
    options?: { ignoreErrors: true }
  ): Promise<ApiPerson[]>;
  async getCustomers(
    product: ApiProduct,
    options?: { ignoreErrors?: boolean }
  ): Promise<ApiPerson[] | ApiResponseArray<ApiPerson>> {
    const customersResponse = await Promise.all(
      product.customerIds.map(async (customerId) => this.getById(customerId))
    );

    return options?.ignoreErrors
      ? customersResponse
          .filter(
            (response): response is ApiResponseSuccess<ApiPerson> =>
              !!response.data
          )
          .map((r) => r.data)
      : {
          data: customersResponse.map((response) => response.data),
          errors: customersResponse.map((response) => response.error),
        };
  }
}
