import { Divider, Grid } from "antd";
import React, { useCallback, useMemo } from "react";

import { EMPLOYEES } from "../../../../constants";
import { useForm } from "../../../../hooks";
import { Form } from "../../../forms/Form";
import { FormField } from "../../../forms/FormField/FormField";
import { SubmitButton } from "../../../forms/SubmitButton";

type MaintCreateProjectFormProps = {
  onSubmit?: () => void;
};

const defaultProps = {
  onSubmit: undefined,
};

type FormValues = {
  author: string;
  description: string;
  eta: string;
  priority: "" | "high" | "low" | "medium";
  teamManager: string;
  teamMembers: string[];
  title: string;
};

export function MaintCreateProjectForm({
  onSubmit,
}: MaintCreateProjectFormProps): JSX.Element {
  const breakpoint = Grid.useBreakpoint();

  const form = useForm<FormValues>({
    defaultValues: {
      author: "",
      description: "",
      eta: "",
      priority: "",
      teamManager: "",
      teamMembers: [],
      title: "",
    },
  });

  const handleSubmit = useCallback(() => {
    form.resetForm();
    onSubmit?.();
  }, [form, onSubmit]);

  const employeeOptions = useMemo(
    () =>
      EMPLOYEES.MAINTENANCE.sort((a, b) => a.name.localeCompare(b.name)).map(
        (maintainer) => ({
          label: maintainer.name,
          value: maintainer.name,
        })
      ),
    []
  );

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <FormField
        label="Autor"
        name="author"
        options={employeeOptions}
        rules={{ required: "Atribua um autor" }}
        type="select"
      />
      <FormField
        label="Título"
        name="title"
        rules={{ required: "Defina um título" }}
        type="input"
      />
      <FormField
        label="Descrição"
        name="description"
        rules={{ required: "Descreva o projeto" }}
        type="textArea"
      />

      <Divider />

      <FormField
        label="Responsável"
        name="teamManager"
        options={employeeOptions}
        rules={{ required: "Defina o manutentor responsável" }}
        type="select"
      />
      <FormField
        label="Equipe"
        name="teamMembers"
        onTagProps={(value): { color?: string } => ({
          color: EMPLOYEES.MAINTENANCE.find(
            (maintainer) => maintainer.name === value
          )?.color,
        })}
        options={employeeOptions}
        rules={{ required: "Selecione pelo menos um membro" }}
        sortValues={(a, b): number =>
          a.toLowerCase().localeCompare(b.toLowerCase())
        }
        type="select"
      />

      <Divider />

      <FormField
        label="Prioridade"
        name="priority"
        options={[
          { label: "Alta", value: "high" },
          { label: "Média", value: "medium" },
          { label: "Baixa", value: "low" },
        ]}
        rules={{ required: "Defina a prioridade" }}
        type={breakpoint.md ? "radio" : "select"}
      />

      <FormField
        disallowPastDates={true}
        label="Previsão de entrega"
        name="eta"
        rules={{ required: "Defina a data prevista para a conclusão" }}
        type="date"
      />

      <SubmitButton
        label="Abrir projeto"
        labelWhenLoading="Enviando projeto..."
      />
    </Form>
  );
}

MaintCreateProjectForm.defaultProps = defaultProps;
