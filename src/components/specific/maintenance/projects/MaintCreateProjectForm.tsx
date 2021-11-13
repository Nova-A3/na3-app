import { Divider, Grid, Modal, notification, Tag } from "antd";
import dayjs from "dayjs";
import React, { useCallback } from "react";

import { EMPLOYEES } from "../../../../constants";
import { useForm } from "../../../../hooks";
import { useNa3MaintProjects } from "../../../../modules/na3-react";
import { createErrorNotifier } from "../../../../utils";
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

export const employeeSelectOptions = EMPLOYEES.MAINTENANCE.sort((a, b) =>
  a.name.localeCompare(b.name)
).map((maintainer) => ({
  label: maintainer.name,
  labelWhenSelected: <Tag color={maintainer.color}>{maintainer.name}</Tag>,
  value: maintainer.name,
}));

export function MaintCreateProjectForm({
  onSubmit,
}: MaintCreateProjectFormProps): JSX.Element {
  const breakpoint = Grid.useBreakpoint();

  const { helpers } = useNa3MaintProjects();

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

  const handleSubmit = useCallback(
    (values: FormValues) => {
      const notifyError = createErrorNotifier("Erro ao criar o projeto");

      const internalId = helpers.getNextInternalId();

      if (!internalId) {
        notifyError(
          "Não foi possível vincular um identificador ao projeto. Por favor, recarregue a página ou tente novamente mais tarde."
        );
        return;
      }

      return new Promise<void>((resolve) => {
        const confirmModal = Modal.confirm({
          content: (
            <>
              Confirma a abertura do projeto{" "}
              {helpers.formatInternalId(internalId)} —{" "}
              <em>{values.title.trim()}</em>?
            </>
          ),
          okText: "Abrir projeto",
          onCancel: () => resolve(),
          onOk: async () => {
            confirmModal.update({ okText: "Enviando..." });

            const operationRes = await helpers.add(internalId, {
              author: values.author,
              description: values.description,
              eta: dayjs(values.eta),
              priority: values.priority === "" ? "low" : values.priority,
              team: {
                manager: values.teamManager,
                members: values.teamMembers,
              },
              title: values.title,
            });

            if (operationRes.error) {
              notifyError(operationRes.error.message);
            } else {
              notification.success({
                description: (
                  <>
                    Projeto {helpers.formatInternalId(internalId)}{" "}
                    <em>({values.title.trim()})</em> aberto com sucesso!
                  </>
                ),
                message: "Projeto aberto",
              });
              form.resetForm();
              onSubmit?.();
            }

            resolve();
          },
          title: "Abrir projeto?",
        });
      });
    },
    [form, onSubmit, helpers]
  );

  const handleDateHelpWhenValid = useCallback((dateString: string): string => {
    const daysFromToday = dayjs(dateString)
      .startOf("day")
      .diff(dayjs().startOf("day"), "days");

    return daysFromToday === 0
      ? "Hoje"
      : `Em ${daysFromToday} dia${daysFromToday === 1 ? "" : "s"}`;
  }, []);

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <FormField
        label="Autor"
        name="author"
        options={employeeSelectOptions}
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
        options={employeeSelectOptions}
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
        options={employeeSelectOptions}
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
        helpWhenValid={handleDateHelpWhenValid}
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
