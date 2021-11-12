import type { ConfigState } from "../../types";

export function resolveCollectionId(
  collectionId: "manut-projects" | "tickets" | "transf-label-templates",
  environment: ConfigState["environment"]
): string {
  return environment === "production" ? collectionId : `TEST-${collectionId}`;
}
