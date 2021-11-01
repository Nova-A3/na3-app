import type firebase from "firebase";

export type Na3ServiceOrder = LegacyTicket & {
  id: string;
  ref?: firebase.firestore.DocumentReference<Na3ServiceOrder>;
};

/* LegacyTicket */

type LegacyTicketEditedEventChanges = {
  machine?: { old: string; new: string };
  description?: { old: string; new: string };
  interruptions?: {
    line?: { old: boolean; new: boolean };
    equipment?: { old: boolean; new: boolean };
  };
  team?: { old: string; new: string };
  maintenanceType?: { old: string; new: string };
  cause?: { old: string; new: string };
};

type LegacyTicket = {
  id: string;
  username: string;

  dpt: string;
  machine: string;
  description: string;
  interruptions: {
    line: boolean;
    equipment: boolean;
    production?: boolean;
  };
  team: string;
  maintenanceType: string;
  cause: string;
  additionalInfo?: string | null;

  status: "closed" | "pending" | "refused" | "solved" | "solving";
  priority?: "high" | "low" | "medium" | null;

  assignedMaintainer?: string;

  solution?: string | null;
  solutionSteps?: string[];
  refusalReason?: string | null;

  createdAt: string;
  acceptedAt?: string | null;
  solvedAt?: string | null;
  closedAt?: string | null;
  reopenedAt?: string;

  version?: string | null;

  events: {
    id: string;
    type:
      | "LegacyTicketClosed"
      | "LegacyTicketConfirmed"
      | "LegacyTicketCreated"
      | "LegacyTicketEdited"
      | "LegacyTicketReopened"
      | "maintainerChanged"
      | "poke"
      | "priorityChanged"
      | "solutionAccepted"
      | "solutionRefused"
      | "solutionStepAdded"
      | "solutionTransmitted";
    timestamp: string;
    device: {
      name: string | null;
      model: string | null;
      os: { name: string | null; version: string | null };
    };

    payload: {
      priority?: LegacyTicket["priority"];
      assignedMaintainer?: LegacyTicket["assignedMaintainer"];
      solution?: LegacyTicket["solution"] | { content?: string; who?: string };
      refusalReason?: LegacyTicket["refusalReason"];
      changes?: LegacyTicketEditedEventChanges;
      poke?: { from: string; to: string };
      solutionStep?: {
        type:
          | "solutionAccepted"
          | "solutionRefused"
          | "solutionTransmitted"
          | "step";
        content?: string;
        who?: string;
      };
    } | null;
  }[];
};

/*
type LegacyTicketStatsItem<T extends string | number> = {
  data: T | string;
  pos: number | string;
  best: T | string;
};
*/

/*
type LegacyTicketStats = {
  // Tempo até 1a Confirmação
  timeToFirstConfirmation: LegacyTicketStatsItem<string>;
  // Tempo até 1a Solução
  timeToFirstSolution: LegacyTicketStatsItem<string>;
  // Tempo até 1a Resposta do Solicitante
  timeToFirstAnswerToSolution: LegacyTicketStatsItem<string>;
  // Tempo até Encerramento
  timeToClosure: LegacyTicketStatsItem<string>;
  // Qtd de Soluções Recusadas
  solutionsRefused: LegacyTicketStatsItem<number>;
  // Qtd de Cutucadas
  pokes: LegacyTicketStatsItem<number>;
};
*/
