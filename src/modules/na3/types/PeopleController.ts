import type { ApiPerson, ApiResponse } from "../../na3-types";

export interface PeopleController {
  readonly getById: (id: string) => Promise<ApiResponse<ApiPerson>>;
}
