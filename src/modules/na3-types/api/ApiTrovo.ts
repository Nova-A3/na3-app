export type ApiTrovoError = {
  code: string;
  message: string;
};

export type ApiTrovoResponse<T> =
  { error: ApiTrovoError; data: null } | { error: null; data: T };

export type ApiTrovoQrSlotEmpty = { empty: true; uid: null; scanId: null };

export type ApiTrovoQrSlotFulfilled = {
  empty: false;
  uid: string;
  scanId: string;
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
  id: string;
  generatedAt: string;
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
  slots: [
    ApiTrovoQrSlot<IsEmpty>,
    ApiTrovoQrSlot<IsEmpty>,
    ApiTrovoQrSlot<IsEmpty>,
    ApiTrovoQrSlot<IsEmpty>,
    ApiTrovoQrSlot<IsEmpty>
  ];
  scans: IsEmpty extends true
    ? []
    : IsEmpty extends false
    ? ApiTrovoQrScan[] & { 0: ApiTrovoQrScan }
    : ApiTrovoQrScan[];
};
