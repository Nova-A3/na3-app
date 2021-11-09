import dayjs from "dayjs";
import { nanoid } from "nanoid";

import type { Na3AppDevice, Na3ServiceOrder } from "../../../na3-types";

export function buildServiceOrder(
  id: string,
  data: Required<
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
  >,
  eventData: {
    appVersion: string;
    device: Na3AppDevice;
  }
): Na3ServiceOrder {
  const creationEvent = buildOrderEvent("ticketCreated", eventData.device);
  const serviceOrder: Na3ServiceOrder = {
    additionalInfo: data.additionalInfo,
    cause: data.cause,
    createdAt: creationEvent.timestamp,
    description: data.description,
    dpt: data.dpt,
    events: [creationEvent],
    id: id,
    interruptions: data.interruptions,
    machine: data.machine,
    maintenanceType: data.maintenanceType,
    solutionSteps: [],
    status: "pending",
    team: data.team,
    username: data.username,
    version: "web-" + eventData.appVersion,
  };
  return serviceOrder;
}

function buildOrderEvent<T extends Na3ServiceOrder["events"][0]["type"]>(
  type: T,
  originDevice: Na3AppDevice,
  payload?: Na3ServiceOrder["events"][0]["payload"]
): Na3ServiceOrder["events"][0] {
  return {
    device: originDevice,
    id: nanoid(),
    payload: payload || null,
    timestamp: dayjs().format(),
    type,
  };
}
