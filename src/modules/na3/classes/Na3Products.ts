import type { ApiProduct, ApiResponse } from "../../na3-types";
import { Na3Base } from "./Na3Base";

export class Na3Products extends Na3Base {
  async getById(id: string): Promise<ApiResponse<ApiProduct>> {
    return this.getApi<ApiProduct>(`/products/${this.formatQueryInput(id)}`);
  }

  async getByCode(code: string): Promise<ApiResponse<ApiProduct>> {
    return this.getApi<ApiProduct>(
      `/products?code=${this.formatQueryInput(code)}`
    );
  }

  fixQuery(query: string): string {
    const formatted = this.formatQueryInput(query);
    if (formatted.startsWith("S") && formatted[1] !== "-") {
      return `S-${formatted.slice(1)}`;
    }
    return query;
  }

  isProduct(test: unknown): test is ApiProduct {
    return (
      test instanceof Object &&
      Object.prototype.hasOwnProperty.call(test, "masterProductId") &&
      Object.prototype.hasOwnProperty.call(test, "originProductId") &&
      Object.prototype.hasOwnProperty.call(test, "perCarton")
    );
  }

  isProductId(id: string): boolean {
    const formatted = this.formatQueryInput(id);
    return /^00A000[\dA-Z]{4}$/.test(formatted);
  }

  isProductCode(code: string): boolean {
    const formatted = this.formatQueryInput(code);
    return /^((\d{10})|(S-\d{7}))$/.test(formatted);
  }
}
