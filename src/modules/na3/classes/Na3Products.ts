import type { ApiProduct, ApiResponse } from "../../na3-types";
import { formatQueryInput } from "../utils";
import { Na3Base } from "./Na3Base";
import { Na3ProductsValidator } from "./validators/Na3ProductsValidator";

export class Na3Products extends Na3Base {
  private readonly _validator = new Na3ProductsValidator();

  validator(): Na3ProductsValidator {
    return this._validator;
  }

  async getById(id: string): Promise<ApiResponse<ApiProduct>> {
    return this.getApi<ApiProduct>(`/products/${formatQueryInput(id)}`);
  }

  async getByCode(code: string): Promise<ApiResponse<ApiProduct>> {
    return this.getApi<ApiProduct>(`/products?code=${formatQueryInput(code)}`);
  }

  fixQuery(query: string): string {
    const formatted = formatQueryInput(query);
    if (formatted.startsWith("S") && formatted[1] !== "-") {
      return `S-${formatted.slice(1)}`;
    }
    return query;
  }
}
