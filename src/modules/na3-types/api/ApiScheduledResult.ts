import type { ApiError } from "./ApiResponse";

export type ApiScheduledResultFnDataMap = {
  "auto-mailer":
    | {
        accDocIds: string[];
        accTotal: number;
        isSunday: false;
        mailAcceptedBy: string[];
        mailId: string;
        yesterdayDocIds: string[];
        yesterdayTotal: number;
      }
    | { isSunday: true };
};

export type ApiScheduledResult = {
  durationMs: number;
  functions: {
    [FunctionId in keyof ApiScheduledResultFnDataMap]:
      | { executed: false }
      | ({ attempts: number, executed: true; } & (
          | {
              data: ApiScheduledResultFnDataMap[FunctionId];
              errors: null;
              status: "success";
            }
          | { data: null, errors: ApiError[]; status: "fail"; }
        ));
  };
  ok: true;
  timestamp: string;
};
