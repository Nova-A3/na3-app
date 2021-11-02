export type BatchIdType = "brazil" | "invalid" | "mexico";

export interface BatchId {
  readonly hasBeenFixed: boolean;
  readonly isBrazilian: boolean;
  readonly isMexican: boolean;
  readonly isValid: boolean;
  readonly originalValue: string;
  readonly type: "brazil" | "invalid" | "mexico";
  readonly value: string;
}
