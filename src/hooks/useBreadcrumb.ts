import { useContext, useEffect } from "react";
import type { BreadcrumbContext } from "../contexts";
import { BreadcrumbCtx } from "../contexts";

export function useBreadcrumb(): BreadcrumbContext {
  const { extra, setExtra } = useContext(BreadcrumbCtx);

  useEffect(() => () => setExtra([]), [setExtra]);

  return { extra, setExtra };
}
