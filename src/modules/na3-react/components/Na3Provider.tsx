import React from "react";
import { Provider as StoreProvider } from "react-redux";

import { store } from "../store";
import type { ConfigState } from "../types";
import { Na3MainController } from "./controllers/MainController";
import { Na3ServiceOrdersController } from "./controllers/ServiceOrdersController";
import { Na3TransfLabelTemplatesController } from "./controllers/TransfLabelTemplatesController";

type Na3ProviderProps = {
  children?: React.ReactNode;
  env?: ConfigState["environment"];
};

const defaultProps: Na3ProviderProps = {
  children: null,
  env: "development",
};

export function Na3Provider({
  env,
  children,
}: Na3ProviderProps = defaultProps): JSX.Element {
  return (
    <StoreProvider store={store}>
      <Na3MainController env={env} />
      <Na3TransfLabelTemplatesController />
      <Na3ServiceOrdersController />

      {children}
    </StoreProvider>
  );
}

Na3Provider.defaultProps = defaultProps;
