import React from "react";
import { Provider as StoreProvider } from "react-redux";

import { store } from "../store";
import type { ConfigState } from "../types";
import { Na3MainController } from "./controllers/MainController";
import { Na3MaintenanceProjectsController } from "./controllers/MaintProjectsController";
import { Na3PeopleController } from "./controllers/na3/Na3PeopleController";
import { Na3ServiceOrdersController } from "./controllers/ServiceOrdersController";
import { Na3TransfLabelTemplatesController } from "./controllers/TransfLabelTemplatesController";

type Na3ProviderProps = {
  appVersion: string;
  children?: React.ReactNode;
  env?: ConfigState["environment"];
};

const defaultProps: Omit<Na3ProviderProps, "appVersion"> = {
  children: null,
  env: undefined,
};

export function Na3Provider({
  appVersion,
  env,
  children,
}: Na3ProviderProps): JSX.Element {
  return (
    <StoreProvider store={store}>
      {/* Main */}
      <Na3MainController
        appVersion={appVersion}
        env={env || process.env.NODE_ENV}
      />

      {/* Native */}
      <Na3TransfLabelTemplatesController />
      <Na3ServiceOrdersController />
      <Na3MaintenanceProjectsController />

      {/* Na3 */}
      <Na3PeopleController />

      {/* App */}
      {children}
    </StoreProvider>
  );
}

Na3Provider.defaultProps = defaultProps;
