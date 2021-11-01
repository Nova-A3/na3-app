import React, { useMemo } from "react";

import {
  useAppReady,
  useNa3Auth,
  useNa3Departments,
} from "../../modules/na3-react";
import type {
  Na3DepartmentId,
  Na3DepartmentType,
} from "../../modules/na3-types";
import { AuthPage } from "../../pages";
import classes from "./PageContainer.module.css";

type PageContainerProps = {
  authorized?: (Na3DepartmentId | Na3DepartmentType)[];
  children?: React.ReactNode;
};

const defaultProps: PageContainerProps = {
  authorized: undefined,
  children: null,
};

export function PageContainer({
  authorized,
  children,
}: PageContainerProps): JSX.Element | null {
  const appIsReady = useAppReady();
  const auth = useNa3Auth();
  const departments = useNa3Departments();

  const hasAccess = useMemo(
    () =>
      !authorized ||
      authorized.length === 0 ||
      (auth.department &&
        departments.helpers
          .getByIdsOrTypes(authorized)
          ?.map((dpt) => dpt.id)
          .includes(auth.department.id)),
    [authorized, auth.department, departments.helpers]
  );

  console.log(appIsReady);

  if (!appIsReady) {
    return null;
  }
  return (
    <div className={classes.PageContainer}>
      {hasAccess ? (
        <div>{children}</div>
      ) : (
        <AuthPage
          authorizedDpts={
            departments.helpers.getByIdsOrTypes(authorized || []) || []
          }
        />
      )}
    </div>
  );
}

PageContainer.defaultProps = defaultProps;
