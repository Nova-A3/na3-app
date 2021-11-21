type Na3EventType = "SERVICE_ORDER_CREATE";

type Na3EventBase<
  Type extends Na3EventType,
  Data extends Record<string, unknown>
> = {
  data: Data;
  fromId: string;
  id: string;
  timestamp: string;
  type: Type;
};

type Na3EventServiceOrderCreate = Na3EventBase<
  "SERVICE_ORDER_CREATE",
  { id: string }
>;

export type Na3Event = Na3EventServiceOrderCreate;
