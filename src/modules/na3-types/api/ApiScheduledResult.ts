import type { ApiError } from "./ApiResponse";

export type ApiScheduledResultFnDataMap = {
  "auto-mailer":
    | {
        isSunday: false;
        yesterdayDocIds: string[];
        accDocIds: string[];
        yesterdayTotal: number;
        accTotal: number;
        mailId: string;
        mailAcceptedBy: string[];
      }
    | { isSunday: true };
};

export type ApiScheduledResult = {
  ok: true;
  timestamp: string;
  functions: {
    [FunctionId in keyof ApiScheduledResultFnDataMap]:
      | { executed: false }
      | ({ executed: true; attempts: number } & (
          | {
              status: "success";
              errors: null;
              data: ApiScheduledResultFnDataMap[FunctionId];
            }
          | { status: "fail"; errors: ApiError[]; data: null }
        ));
  };
  durationMs: number;
};
