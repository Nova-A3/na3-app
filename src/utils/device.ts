import { detect as detectBrowser } from "detect-browser";

import { APP_VERSION } from "../constants";
import type { Device } from "../types";

export function isTouchDevice(): boolean {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

export function getDevice(): Device {
  const browser = detectBrowser();
  return {
    model: browser?.name || "Nova A3 App",
    name: "Nova A3 App",
    os: { name: browser?.os || "—", version: APP_VERSION },
  };
}
