export type ApiTrovoError = {
  code: string;
  message: string;
};

export type ApiTrovoResponse<T> =
  | { data: null; error: ApiTrovoError }
  | { data: T; error: null };

export type ApiTrovoQrSlotEmpty = { empty: true; scanId: null; uid: null };

export type ApiTrovoQrSlotFulfilled = {
  empty: false;
  scanId: string;
  uid: string;
};

export type ApiTrovoQrSlot<IsEmpty extends boolean | undefined = undefined> =
  IsEmpty extends true
    ? ApiTrovoQrSlotEmpty
    : IsEmpty extends false
    ? ApiTrovoQrSlotFulfilled
    : ApiTrovoQrSlotEmpty | ApiTrovoQrSlotFulfilled;

export type ApiTrovoQrScan = {
  scanId: string;
  scannedAt: string;
  successful: boolean;
};

export type ApiTrovoQr<IsEmpty extends boolean | undefined = undefined> = {
  generatedAt: string;
  id: string;
  registeredAt: IsEmpty extends true
    ? null
    : IsEmpty extends false
    ? string
    : string | null;
  registeredBy: IsEmpty extends true
    ? null
    : IsEmpty extends false
    ? string
    : string | null;
  scans: IsEmpty extends true
    ? []
    : IsEmpty extends false
    ? ApiTrovoQrScan[] & { 0: ApiTrovoQrScan }
    : ApiTrovoQrScan[];
  slots: [
    ApiTrovoQrSlot<IsEmpty>,
    ApiTrovoQrSlot<IsEmpty>,
    ApiTrovoQrSlot<IsEmpty>,
    ApiTrovoQrSlot<IsEmpty>,
    ApiTrovoQrSlot<IsEmpty>
  ];
};
