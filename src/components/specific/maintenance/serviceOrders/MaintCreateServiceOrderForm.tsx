import { InfoCircleOutlined } from "@ant-design/icons";
import { Col, Divider, Grid, Modal, notification, Row } from "antd";
import React, { useCallback, useState } from "react";
import { Redirect } from "react-router";

import { useForm } from "../../../../hooks";
import { useNa3Auth, useNa3ServiceOrders } from "../../../../modules/na3-react";
import type { Na3DepartmentId } from "../../../../modules/na3-types";
import { createErrorNotifier } from "../../../../utils";
import { Form } from "../../../forms/Form";
import { FormField } from "../../../forms/FormField/FormField";
import { SubmitButton } from "../../../forms/SubmitButton";
import classes from "./MaintCreateServiceOrderForm.module.css";

type MaintCreateServiceOrderFormProps = {
  onSubmit?: () => void;
};

const defaultProps = {
  onSubmit: undefined,
};

type FormValues = {
  additionalInfo: string;
  cause: "" | "eletrica" | "machineAdjustment" | "mecanica";
  departmentDisplayName: string;
  departmentId: Na3DepartmentId | "";
  didStopLine: boolean;
  didStopMachine: boolean;
  didStopProduction: boolean;
  issue: string;
  machineId: string;
  maintenanceType: "" | "corretiva" | "preditiva" | "preventiva";
  team: "" | "eletrica" | "mecanica" | "predial";
};

export function MaintCreateServiceOrderForm({
  onSubmit,
}: MaintCreateServiceOrderFormProps): JSX.Element {
  const breakpoint = Grid.useBreakpoint();

  const { department } = useNa3Auth();
  const { helpers } = useNa3ServiceOrders();

  const [didStopMachineDisabled, setDidStopMachineDisabled] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      additionalInfo: "",
      cause: "",
      departmentDisplayName: department?.displayName.trim().toUpperCase() || "",
      departmentId: department?.id || "",
      didStopLine: false,
      didStopMachine: false,
      didStopProduction: false,
      issue: "",
      machineId: "",
      maintenanceType: "",
      team: "",
    },
  });

  const handleSubmit = useCallback(
    (values: FormValues) => {
      const notifyError = createErrorNotifier("Erro ao abrir a OS");

      const orderId = helpers.getNextId();

      if (!orderId) {
        notifyError(
          "Não foi possível vincular um número à OS. Por favor, recarregue a página ou tente novamente mais tarde."
        );
        return;
      }

      const confirmModal = Modal.confirm({
        content: (
          <>
            Confirma a abertura da OS #{orderId} —{" "}
            <em>{values.issue.trim()}</em>?
          </>
        ),
        okText: "Abrir OS",
        onOk: async () => {
          confirmModal.update({ okText: "Enviando..." });

          const operationRes = await helpers.add(orderId, {
            additionalInfo: values.additionalInfo,
            cause: values.cause,
            description: values.issue,
            dpt: values.departmentDisplayName,
            interruptions: {
              equipment: values.didStopMachine,
              line: values.didStopLine,
              production: values.didStopProduction,
            },
            machine: values.machineId,
            maintenanceType: values.maintenanceType,
            team: values.team,
            username: values.departmentId,
          });

          if (operationRes.error) {
            notifyError(operationRes.error.message);
          } else {
            notification.success({
              description: (
                <>
                  OS #{orderId} <em>({values.issue.trim()})</em> aberta com
                  sucesso!
                </>
              ),
              message: "OS aberta",
            });
            form.resetForm();
            onSubmit?.();
          }
        },
        title: "Abrir OS?",
      });
    },
    [helpers, form, onSubmit]
  );

  const handleForceDidStopMachine = useCallback(
    (switchValue): void => {
      if (switchValue) form.setValue("didStopMachine", true);

      const { didStopProduction, didStopLine } = form.getValues();
      if (didStopProduction || didStopLine) setDidStopMachineDisabled(true);
      else setDidStopMachineDisabled(false);
    },
    [form]
  );

  if (!department || department.type !== "shop-floor") {
    return <Redirect to="/manutencao" />;
  }

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <FormField
        disabled={true}
        hidden={true}
        label="Setor (ID)"
        name="departmentId"
        rules={null}
        type="input"
      />
      <FormField
        disabled={true}
        label="Setor"
        name="departmentDisplayName"
        rules={{
          required:
            "Não foi possível verificar seu setor. Tente novamente mais tarde.",
        }}
        type="input"
      />

      <FormField
        label="Máquina"
        name="machineId"
        options={Object.values(department.machines)
          .sort((a, b) => a.number - b.number)
          .map((machine) => ({
            label: (
              <>
                {machine.name} <em>({machine.id.toUpperCase()})</em>
              </>
            ),
            value: machine.id,
          }))}
        rules={{ required: "Selecione uma máquina" }}
        type="select"
      />

      <FormField
        label="Descrição do problema"
        name="issue"
        options={Object.values(department.machines)
          .flatMap((machine) => machine.issues)
          .filter((issue, idx, arr) => arr.indexOf(issue) === idx)
          .sort((a, b) => a.localeCompare(b))
          .map((issue) => ({ label: issue.toUpperCase(), value: issue }))}
        rules={{ required: "Descreva o problema" }}
        tooltip={{
          icon: <InfoCircleOutlined />,
          title: (
            <>
              <strong>Lembre-se!</strong> Dê sempre preferência aos problemas
              pré-definidos
            </>
          ),
        }}
        type="autoComplete"
      />

      <Divider className={classes.FormDivider} />

      <Row gutter={36}>
        <Col span={breakpoint.lg ? 8 : 24}>
          <FormField
            label="Parou produção?"
            labelSpan={16}
            name="didStopProduction"
            onValueChange={handleForceDidStopMachine}
            rules={null}
            type="switch"
          />
        </Col>

        <Col span={breakpoint.lg ? 8 : 24}>
          <FormField
            label="Parou linha?"
            labelSpan={16}
            name="didStopLine"
            onValueChange={handleForceDidStopMachine}
            rules={null}
            type="switch"
          />
        </Col>

        <Col span={breakpoint.lg ? 8 : 24}>
          <FormField
            disabled={didStopMachineDisabled}
            label="Parou máquina?"
            labelSpan={16}
            name="didStopMachine"
            rules={null}
            type="switch"
          />
        </Col>
      </Row>

      <Divider className={classes.FormDivider} />

      <FormField
        label="Equipe responsável"
        name="team"
        options={[
          { label: "Elétrica", value: "eletrica" },
          { label: "Mecânica", value: "mecanica" },
          { label: "Predial", value: "predial" },
        ]}
        rules={{ required: "Defina a equipe responsável" }}
        type={breakpoint.md ? "radio" : "select"}
      />

      <FormField
        label="Tipo de manutenção"
        name="maintenanceType"
        options={[
          { label: "Corretiva", value: "corretiva" },
          { label: "Preventiva", value: "preventiva" },
          { label: "Preditiva", value: "preditiva" },
        ]}
        rules={{ required: "Defina o tipo de manutenção" }}
        type={breakpoint.md ? "radio" : "select"}
      />

      <FormField
        label="Tipo de causa"
        name="cause"
        options={[
          { label: "Elétrica", value: "eletrica" },
          { label: "Mecânica", value: "mecanica" },
          { label: "Ajuste de máquina", value: "machineAdjustment" },
        ]}
        rules={{ required: "Defina o tipo de causa" }}
        type={breakpoint.md ? "radio" : "select"}
      />

      <Divider className={classes.FormDivider} />

      <FormField
        label="Informações adicionais"
        name="additionalInfo"
        required={false}
        rules={null}
        type="textArea"
      />

      <SubmitButton label="Abrir OS" labelWhenLoading="Enviando OS..." />
    </Form>
  );
}

MaintCreateServiceOrderForm.defaultProps = defaultProps;
