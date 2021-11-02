import type { ApiPerson, ApiResponse } from "../../na3-types";
import type { PeopleController } from "../types";
import { formatQueryInput } from "../utils";
import { Na3BaseController } from "./Na3Base.controller";

export class Na3PeopleController
  extends Na3BaseController
  implements PeopleController
{
  getById(id: string): Promise<ApiResponse<ApiPerson>> {
    return this.getApi<ApiPerson>(`/people/${formatQueryInput(id)}`);
  }
}
