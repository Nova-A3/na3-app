import axios from "axios";
import type { ApiData, ApiResponse } from "../../na3-types";

export abstract class Na3Base {
  private _api = axios.create({
    baseURL:
      "https://us-central1-nova-a3-ind.cloudfunctions.net/api/rest/novaa3/",
    headers: { "Content-Type": "application/json" },
  });

  protected async getApi<T extends ApiData>(
    endpoint: `/${string}`
  ): Promise<ApiResponse<T>> {
    const { data } = await this._api.get<ApiResponse<T>>(endpoint);
    return data;
  }

  protected formatQueryInput(input: string): string {
    return input.trim().toUpperCase();
  }
}
