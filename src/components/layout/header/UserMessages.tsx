import { SettingOutlined } from "@ant-design/icons";
import { Badge, Button, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";

import { useNa3Auth } from "../../../modules/na3-react";
import type { Na3ServiceOrder } from "../../../modules/na3-types";
import classes from "./UserMessages.module.css";

type UserMessagesProps = {
  onActionBtnClick: () => void;
  serviceOrders: Na3ServiceOrder[];
};

export function UserMessages({
  serviceOrders,
  onActionBtnClick,
}: UserMessagesProps): JSX.Element {
  const { department } = useNa3Auth();

  return department && serviceOrders.length > 0 ? (
    <div className={classes.Messages}>
      <div className={classes.MessageGroup}>
        <Typography.Text strong={true}>
          <Badge
            className={classes.MessageGroupIcon}
            count={serviceOrders.length}
            size="small"
          >
            <SettingOutlined />
          </Badge>{" "}
          Manutenção
        </Typography.Text>

        <Typography.Text italic={true}>
          Você tem {serviceOrders.length} OS{" "}
          {department.id === "manutencao"
            ? `pendente${serviceOrders.length === 1 ? "" : "s"}`
            : "para encerrar"}
        </Typography.Text>

        <small>
          <Typography.Text italic={true} type="secondary">
            OS {serviceOrders.map((order) => `#${order.id}`).join(", ")}
          </Typography.Text>
        </small>

        <Link
          to={
            department.id === "manutencao"
              ? "/manutencao/dashboard"
              : "/manutencao/os"
          }
        >
          <Button
            block={true}
            className={classes.MessageGroupButton}
            onClick={onActionBtnClick}
            size="small"
            type="primary"
          >
            Ver
          </Button>
        </Link>
      </div>
    </div>
  ) : (
    <Typography.Text italic={true}>
      Você não tem novas mensagens
    </Typography.Text>
  );
}
