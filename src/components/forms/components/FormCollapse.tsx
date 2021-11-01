import { Collapse } from "antd";
import React from "react";
import classes from "./FormCollapse.module.css";

type FormCollapseProps = {
  title: string;
  children?: React.ReactNode;
};

export function FormCollapse({
  title,
  children,
}: FormCollapseProps): JSX.Element {
  return (
    <Collapse className={classes.Collapse} ghost={true}>
      <Collapse.Panel header={title} key="form-collapse">
        {children}
      </Collapse.Panel>
    </Collapse>
  );
}
