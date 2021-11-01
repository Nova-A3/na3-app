import React, { createContext, useCallback } from "react";

export type BreadcrumbContext = {
  extra: string[];
  setExtra: (extra: string[] | string | undefined) => void;
};

export const BreadcrumbCtx = createContext<BreadcrumbContext>({
  extra: [],
  setExtra: () => null,
});

export function BreadcrumbProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [extra, setExtra] = React.useState<string[]>([]);

  const handleSetExtra = useCallback(
    (updatedExtra: string[] | string | undefined) => {
      if (!updatedExtra) return setExtra([]);
      const extraArray =
        typeof updatedExtra === "string" ? [updatedExtra] : [...updatedExtra];
      setExtra(extraArray);
    },
    []
  );

  return (
    <BreadcrumbCtx.Provider value={{ extra, setExtra: handleSetExtra }}>
      {children}
    </BreadcrumbCtx.Provider>
  );
}
