import { Col, Divider, Grid, Row } from "antd";
import React, { useCallback } from "react";
import { Redirect } from "react-router";

import { useNa3Auth } from "../../../../modules/na3-react";
import type { MaintCreateServiceOrderFormValues } from "../../../../types";
import { Form } from "../../../forms/Form";
import { FormItem } from "../../../forms/FormItem";
import { SubmitButton } from "../../../forms/SubmitButton";
import classes from "./MaintCreateServiceOrderForm.module.css";

export function MaintCreateServiceOrderForm(): JSX.Element {
  const breakpoint = Grid.useBreakpoint();

  const { department } = useNa3Auth();

  const handleSubmit = useCallback(() => {
    return;
  }, []);

  if (!(department && department.type === "shop-floor")) {
    return <Redirect to="/manutencao" />;
  }

  return (
    <Form<MaintCreateServiceOrderFormValues>
      initialValues={{
        additionalInfo: "",
        cause: "eletrica",
        departmentDisplayName: department.displayName.trim().toUpperCase(),
        departmentId: department.id,
        didStopLine: false,
        didStopMachine: false,
        didStopProduction: false,
        issue: "",
        machineId: "",
        maintenanceType: "corretiva",
        team: "eletrica",
      }}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }): JSX.Element => (
        <>
          <FormItem
            disabled={true}
            hidden={true}
            label="Setor (ID)"
            name="departmentId"
            type="input"
          />
          <FormItem
            disabled={true}
            label="Setor"
            name="departmentDisplayName"
            type="input"
          />

          <FormItem
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
            type="select"
          />

          <FormItem
            label="Descrição do problema"
            name="issue"
            options={Object.values(department.machines)
              .flatMap((machine) => machine.issues)
              .filter((issue, idx, arr) => arr.indexOf(issue) === idx)
              .sort((a, b) => a.localeCompare(b))
              .map((issue) => ({ label: issue.toUpperCase(), value: issue }))}
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
            <Col span={breakpoint.md ? 8 : 24}>
              <FormItem
                label="Parou produção?"
                labelSpan={16}
                name="didStopProduction"
                onValueChange={(switchValue): false | void => {
                  if (switchValue && !values.didStopMachine) {
                    setFieldValue("didStopMachine", true);
                  }
                }}
                type="switch"
              />
            </Col>

            <Col span={breakpoint.md ? 8 : 24}>
              <FormItem
                label="Parou linha?"
                labelSpan={16}
                name="didStopLine"
                onValueChange={(switchValue): false | void => {
                  if (switchValue && !values.didStopMachine) {
                    setFieldValue("didStopMachine", true);
                  }
                }}
                type="switch"
              />
            </Col>

            <Col span={breakpoint.md ? 8 : 24}>
              <FormItem
                disabled={!!(values.didStopProduction || values.didStopLine)}
                label="Parou máquina?"
                labelSpan={16}
                name="didStopMachine"
                type="switch"
              />
            </Col>
          </Row>

          <Divider className={classes.FormDivider} />

          <FormItem
            label="Equipe responsável"
            name="team"
            options={[
              { label: "Elétrica", value: "eletrica" },
              { label: "Mecânica", value: "mecanica" },
              { label: "Predial", value: "predial" },
            ]}
            type={breakpoint.md ? "radio" : "select"}
          />

          <FormItem
            label="Tipo de manutenção"
            name="maintenanceType"
            options={[
              { label: "Corretiva", value: "corretiva" },
              { label: "Preventiva", value: "preventiva" },
              { label: "Preditiva", value: "preditiva" },
            ]}
            type={breakpoint.md ? "radio" : "select"}
          />

          <FormItem
            label="Tipo de causa"
            name="cause"
            options={[
              { label: "Elétrica", value: "eletrica" },
              { label: "Mecânica", value: "mecanica" },
              { label: "Ajuste de máquina", value: "machineAdjustment" },
            ]}
            type={breakpoint.md ? "radio" : "select"}
          />

          <Divider className={classes.FormDivider} />

          <FormItem
            label="Informações adicionais"
            name="additionalInfo"
            notRequired={true}
            type="textArea"
          />

          <SubmitButton>Abrir OS</SubmitButton>
        </>
      )}
    </Form>
  );
}
