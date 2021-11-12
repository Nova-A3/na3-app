import type firebase from "firebase";

export type Na3MaintenanceProject = LegacyInternalProject & {
  id: string;
  ref?: firebase.firestore.DocumentReference<Na3MaintenanceProject>;
};

/* LegacyInternalProject */

type LegacyInternalProjectChanges = Partial<{
  description: {
    new: LegacyInternalProject["description"];
    old: LegacyInternalProject["description"];
  };
  eta: { new: LegacyInternalProject["eta"]; old: LegacyInternalProject["eta"] };
  priority: {
    new: LegacyInternalProject["priority"];
    old: LegacyInternalProject["priority"];
  };
  teamManager: {
    new: LegacyInternalProject["team"]["manager"];
    old: LegacyInternalProject["team"]["manager"];
  };
  teamOthers: {
    new: LegacyInternalProject["team"]["others"];
    old: LegacyInternalProject["team"]["others"];
  };
  title: {
    new: LegacyInternalProject["title"];
    old: LegacyInternalProject["title"];
  };
}>;

type LegacyInternalProjectEvent = {
  author: string;
  timestamp: firebase.firestore.Timestamp;
} & (
  | { changes: LegacyInternalProjectChanges; type: "edit" }
  | { message: string; type: "status" }
  | { message?: string; type: "complete" }
  | { type: "create" }
);

type LegacyInternalProject = {
  description: string;
  eta: firebase.firestore.Timestamp;
  events: LegacyInternalProjectEvent[];
  internalId: number;
  priority: "high" | "low" | "medium";
  team: {
    manager: string;
    others: string;
  };
  title: string;
};
