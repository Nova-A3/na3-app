import type { ApiCompany } from "./ApiCompany";
import type { ApiDepartment } from "./ApiDepartment";
import type { ApiDocument } from "./ApiDocument";
import type { ApiLabelPrintResponse } from "./ApiLabel";
import type { ApiPerson } from "./ApiPerson";
import type { ApiProduct } from "./ApiProduct";
import type { ApiScheduledResult } from "./ApiScheduledResult";
import type { ApiStatus } from "./ApiStatus";

export type ApiError = {
  name: string;
  message: string;
  code?: string;
  status?: { code: number; text: string };
  possibleCause?: string;
};

export type ApiData =
  ApiCompany | ApiCompany[] | ApiDepartment | ApiDepartment[] | ApiDocument | ApiDocument[] | ApiLabelPrintResponse | ApiPerson | ApiProduct | ApiScheduledResult | ApiStatus;

export type ApiResponseSuccess<T extends ApiData> = { error: null; data: T };

export type ApiResponseFail = { error: ApiError; data: null };

export type ApiResponse<T extends ApiData> =
  ApiResponseFail | ApiResponseSuccess<T>;

export type ApiResponseArray<T extends ApiData> = {
  data: (T | null)[];
  errors: (ApiError | null)[];
};

type MakeApiResponseConfig<T extends ApiData = ApiData> =
  { type: "fail"; error: unknown } | { type: "success"; data: T };

export type MakeApiResponse = <T extends ApiData>(
  config: MakeApiResponseConfig<T>
) => ApiResponse<T>;
