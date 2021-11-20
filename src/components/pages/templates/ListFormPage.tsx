import { PlusCircleOutlined } from "@ant-design/icons";
import type { ButtonProps } from "antd";
import { Button, Col, Divider, Grid, Row } from "antd";
import { nanoid } from "nanoid";
import React from "react";
import type { Falsy } from "utility-types";

import { PageDescription } from "../..";
import { PageActionButtons } from "../components/PageActionButtons";
import { PageTitle } from "../components/PageTitle";
import { Page } from "../Page";
import classes from "./ListFormPage.module.css";

type ListFormPageProps = {
  actions:
    | {
        disabled?: boolean;
        icon?: React.ReactNode;
        label: React.ReactNode;
        onClick: () => void;
        type?: ButtonProps["type"];
      }[]
    | Falsy;
  description?: React.ReactNode;
  form: React.ReactNode;
  formTitle: React.ReactNode;
  list: React.ReactNode;
  listTitle: React.ReactNode;
  title: React.ReactNode;
};

const defaultProps = {
  description: undefined,
};

export function ListFormPage({
  actions,
  form,
  formTitle,
  list,
  listTitle,
  title,
  description,
}: ListFormPageProps): JSX.Element {
  const breakpoint = Grid.useBreakpoint();

  return (
    <>
      <PageTitle>{title}</PageTitle>

      {description && <PageDescription>{description}</PageDescription>}

      {!breakpoint.lg && actions && (
        <PageActionButtons>
          {actions.map(({ onClick, ...action }) => (
            <Button
              disabled={action.disabled}
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

          <Page additionalPaddingBottom={breakpoint.lg ? 8 : 96}>{list}</Page>
        </Col>

        {breakpoint.lg && (
          <Col className={classes.PageGridCol} lg={16} xl={17} xs={0} xxl={18}>
            <div>
              <Divider orientation="left">{formTitle}</Divider>
            </div>

            <Page additionalPaddingBottom={24} scrollTopOffset={16}>
              {form}
            </Page>
          </Col>
        )}
      </Row>
    </>
  );
}

ListFormPage.defaultProps = defaultProps;
