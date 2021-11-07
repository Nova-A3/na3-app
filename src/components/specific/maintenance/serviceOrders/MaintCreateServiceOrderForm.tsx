import { Col, Divider, Grid, Row } from "antd";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router";

import { useNa3Auth } from "../../../../modules/na3-react";
import type { MaintCreateServiceOrderFormValues } from "../../../../types";
import { Form as FormV2 } from "../../../forms/v2/Form";
import { FormField } from "../../../forms/v2/FormField/FormField";
import { SubmitButton as SubmitButtonV2 } from "../../../forms/v2/SubmitButton";
import classes from "./MaintCreateServiceOrderForm.module.css";

export function MaintCreateServiceOrderForm(): JSX.Element {
  const breakpoint = Grid.useBreakpoint();

  const { department } = useNa3Auth();

  const form = useForm<MaintCreateServiceOrderFormValues>({
    criteriaMode: "all",
    defaultValues: {
      additionalInfo: "",
      cause: "eletrica",
      departmentDisplayName: department?.displayName.trim().toUpperCase() || "",
      departmentId: department?.id || "",
      didStopLine: false,
      didStopMachine: false,
      didStopProduction: false,
      issue: "",
      machineId: "",
      maintenanceType: "corretiva",
      team: "eletrica",
    },
    mode: "onChange",
  });

  const handleSubmit = useCallback(() => {
    return;
  }, []);

  const handleForceDidStopMachine = useCallback(
    (switchValue): void => {
      if (switchValue) {
        form.setValue("didStopMachine", true);
      }
    },
    [form]
  );

  if (!(department && department.type === "shop-floor")) {
    return <Redirect to="/manutencao" />;
  }

  return (
    <FormV2 form={form} onSubmit={handleSubmit}>
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
        rules={{ required: "Setor não identificado." }}
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
        rules={{ required: "Selecione uma máquina." }}
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
        rules={{ required: "Campo obrigatório." }}
        tooltip={
          <>
            <strong>Lembre-se!</strong> Dê sempre preferência aos problemas
            pré-definidos
          </>
        }
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
            disabled={
              form.getValues().didStopProduction || form.getValues().didStopLine
            }
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
        rules={null}
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
        rules={null}
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
        rules={null}
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

      <SubmitButtonV2 label="Abrir OS" labelWhenLoading="Enviando OS..." />
    </FormV2>
  );
}
