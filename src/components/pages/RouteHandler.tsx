import { nanoid } from "nanoid";
import React from "react";
import { Route, Switch } from "react-router-dom";

import { ROUTES } from "../../constants";
import { NoMatchPage, NotImplementedPage } from "../../pages";
import { PageContainer } from "./PageContainer";

export function RouteHandler(): JSX.Element {
  return (
    <Switch>
      {Object.entries(ROUTES).map(
        ([path, { component, authorized, notExact }]) => (
          <Route exact={!notExact} key={nanoid()} path={path}>
            <PageContainer authorized={authorized}>
              {component || <NotImplementedPage />}
            </PageContainer>
          </Route>
        )
      )}

      <Route component={NoMatchPage} path="*" />
    </Switch>
  );
}
