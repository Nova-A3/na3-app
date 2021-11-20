import { useCallback, useEffect, useState } from "react";

import type { BeforeInstallPromptEvent } from "../types";

type UseA2HSReturn = [boolean, () => Promise<void>];

export function useA2HS(): UseA2HSReturn {
  const [hasA2HS, setHasA2HS] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent>();

  const prompt = useCallback(async (): Promise<void> => {
    if (!deferredPrompt) {
      return prompt();
    }
    await deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    setHasA2HS(choiceResult.outcome === "accepted");
    setDeferredPrompt(undefined);
  }, [deferredPrompt]);

  useEffect(() => {
    function handleBeforeInstallPrompt(ev: Event): void {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      ev.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(ev as BeforeInstallPromptEvent);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return (): void => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  return [hasA2HS, prompt];
}
