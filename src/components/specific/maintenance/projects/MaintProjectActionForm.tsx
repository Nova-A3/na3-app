import { Modal } from "antd";
import React, { useCallback } from "react";

import { useForm } from "../../../../hooks/useForm";
import type { Na3MaintenanceProject } from "../../../../modules/na3-types";
import { Form } from "../../../forms/Form";
import { FormField } from "../../../forms/FormField/FormField";
import { SubmitButton } from "../../../forms/SubmitButton";
import { employeeSelectOptions } from "./MaintCreateProjectForm";

type ActionFormType = "deliver" | "status";

type FormValues<T extends ActionFormType> = {
  author: string;
  message: T extends "status" ? string : string | null;
};

type MaintProjectActionFormProps<T extends ActionFormType> = {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (
    data: Na3MaintenanceProject,
    payload: FormValues<T>
  ) => Promise<void> | void;
  project: Na3MaintenanceProject;
  type: T;
};

export function MaintProjectActionForm<T extends ActionFormType>({
  type,
  isVisible,
  project,
  onSubmit,
  onClose,
}: MaintProjectActionFormProps<T>): JSX.Element {
  const form = useForm({
    defaultValues: { author: project.events[0]?.author || "", message: "" },
  });

  const handleSubmit = useCallback(
    (values: FormValues<T>) => {
      return onSubmit(project, values);
    },
    [onSubmit, project]
  );

  return (
    <Modal
      footer={null}
      onCancel={onClose}
      title={type === "status" ? "Informar status" : "Entregar projeto"}
      visible={isVisible}
    >
      <Form form={form} onSubmit={handleSubmit}>
        <FormField
          label="Autor"
          name="author"
          options={employeeSelectOptions}
          rules={{ required: "Atribua um autor" }}
          type="select"
        />

        <FormField
          label={type === "status" ? "Status do projeto" : "Comentários"}
          name="message"
          required={type === "status"}
          rules={
            type === "status"
              ? { required: "Descreva o status do projeto" }
              : null
          }
          type="textArea"
        />

        <SubmitButton
          label={type === "status" ? "Compartilhar status" : "Entregar projeto"}
          labelWhenLoading="Aguardando confirmação..."
        />
      </Form>
    </Modal>
  );
}
