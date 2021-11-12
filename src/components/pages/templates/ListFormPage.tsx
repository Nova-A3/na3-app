import { PlusCircleOutlined } from "@ant-design/icons";
import type { ButtonProps } from "antd";
import { Button, Col, Divider, Grid, Row } from "antd";
import { nanoid } from "nanoid";
import React from "react";

import { PageActionButtons } from "../components/PageActionButtons";
import { PageTitle } from "../components/PageTitle";
import classes from "./ListFormPage.module.css";

type ListFormPageProps = {
  actions: {
    icon?: React.ReactNode;
    label: React.ReactNode;
    onClick: () => void;
    type?: ButtonProps["type"];
  }[];
  form: React.ReactNode;
  formTitle: React.ReactNode;
  list: React.ReactNode;
  listTitle: React.ReactNode;
  title: React.ReactNode;
};

export function ListFormPage({
  actions,
  form,
  formTitle,
  list,
  listTitle,
  title,
}: ListFormPageProps): JSX.Element {
  const breakpoint = Grid.useBreakpoint();

  return (
    <>
      <PageTitle>{title}</PageTitle>

      {!breakpoint.lg && (
        <PageActionButtons>
          {actions.map(({ onClick, ...action }) => (
            <Button
              icon={action.icon || <PlusCircleOutlined />}
              key={nanoid()}
              onClick={onClick}
              type={action.type || "primary"}
            >
              {action.label}
            </Button>
          ))}
        </PageActionButtons>
      )}

      <Row className={classes.PageRow} gutter={28}>
        <Col className={classes.PageGridCol} lg={8} xl={7} xs={24} xxl={6}>
          <div className={classes.ListTitle}>
            <Divider orientation="left">{listTitle}</Divider>
          </div>

          <div className={classes.PageContent}>{list}</div>
        </Col>

        {breakpoint.lg && (
          <Col className={classes.PageGridCol} lg={16} xl={17} xs={0} xxl={18}>
            <div>
              <Divider orientation="left">{formTitle}</Divider>
            </div>

            <div className={classes.PageContent}>{form}</div>
          </Col>
        )}
      </Row>
    </>
  );
}
