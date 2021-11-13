import dayjs from "dayjs";
import { nanoid } from "nanoid";

import type { Na3AppDevice, Na3ServiceOrder } from "../../../na3-types";

export type ServiceOrderBuilderData = Required<
  Pick<
    Na3ServiceOrder,
    | "additionalInfo"
    | "cause"
    | "description"
    | "dpt"
    | "interruptions"
    | "machine"
    | "maintenanceType"
    | "team"
    | "username"
  >
>;

export function buildServiceOrder(
  id: string,
  data: ServiceOrderBuilderData,
  device: Na3AppDevice
): Na3ServiceOrder {
  const creationEvent = buildServiceOrderEvents(
    { type: "ticketCreated" },
    device
  );
  const serviceOrder: Na3ServiceOrder = {
    additionalInfo: data.additionalInfo?.trim(),
    cause: data.cause.trim(),
    createdAt: creationEvent.timestamp,
    description: data.description.trim(),
    dpt: data.dpt.trim(),
    events: [creationEvent],
    id: id.trim(),
    interruptions: data.interruptions,
    machine: data.machine.trim(),
    maintenanceType: data.maintenanceType.trim(),
    solutionSteps: [],
    status: "pending",
    team: data.team.trim(),
    username: data.username.trim(),
    version: "web-" + device.os.version.trim(),
  };

  return serviceOrder;
}

type EventBuildConfig = {
  payload?: Na3ServiceOrder["events"][0]["payload"];
  type: Na3ServiceOrder["events"][0]["type"];
};

export function buildServiceOrderEvents(
  events: EventBuildConfig,
  originDevice: Na3AppDevice
): Na3ServiceOrder["events"][0];
export function buildServiceOrderEvents(
  events: EventBuildConfig[],
  originDevice: Na3AppDevice
): Na3ServiceOrder["events"][0][];
export function buildServiceOrderEvents(
  events: EventBuildConfig | EventBuildConfig[],
  originDevice: Na3AppDevice
): Na3ServiceOrder["events"][0] | Na3ServiceOrder["events"][0][] {
  function buildOneEvent(
    config: EventBuildConfig
  ): Na3ServiceOrder["events"][0] {
    return {
      device: originDevice,
      id: nanoid(),
      payload: config.payload || null,
      timestamp: dayjs().format(),
      type: config.type,
    };
  }

  if (!("length" in events)) {
    return buildOneEvent(events);
  } else {
    return events.map(buildOneEvent);
  }
}
