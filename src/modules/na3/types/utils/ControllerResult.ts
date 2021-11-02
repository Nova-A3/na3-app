import type { ApiError } from "../../../na3-types";

export type ControllerResult<T> =
  | { data: null; error: ApiError }
  | { data: T; error: null };
