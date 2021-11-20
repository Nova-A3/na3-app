import type { ConfigState } from "../../types";

export function resolveCollectionId(
  collectionId:
    | "API-PEOPLE"
    | "departments"
    | "manut-projects"
    | "tickets"
    | "transf-label-templates",
  environment: ConfigState["environment"],
  options?: { forceProduction?: boolean }
): string {
  return environment === "production" || options?.forceProduction
    ? collectionId
    : `TEST-${collectionId}`;
}
