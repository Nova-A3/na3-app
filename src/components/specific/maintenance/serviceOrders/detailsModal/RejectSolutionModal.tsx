import { Modal } from "antd";
import React, { useCallback } from "react";

import { useForm } from "../../../../../hooks/useForm";
import type { Na3ServiceOrder } from "../../../../../modules/na3-types";
import { Form as FormV2 } from "../../../../forms/v2/Form";
import { FormField } from "../../../../forms/v2/FormField/FormField";
import { SubmitButton } from "../../../../forms/v2/SubmitButton";

type RejectSolutionModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (
    data: Na3ServiceOrder,
    payload: { reason: string }
  ) => Promise<void> | void;
  serviceOrder: Na3ServiceOrder;
};

export function RejectSolutionModal({
  isVisible,
  serviceOrder,
  onSubmit,
  onClose,
}: RejectSolutionModalProps): JSX.Element {
  const form = useForm({ defaultValues: { reason: "" } });

  const handleSubmit = useCallback(
    (values: { reason: string }) => {
      return onSubmit(serviceOrder, values);
    },
    [onSubmit, serviceOrder]
  );

  return (
    <Modal
      footer={null}
      onCancel={onClose}
      title="Recusar solução"
      visible={isVisible}
    >
      <FormV2 form={form} onSubmit={handleSubmit}>
        <FormField
          label="Motivo"
          name="reason"
          rules={{ required: "Descreva o motivo para a recusa" }}
          type="textArea"
        />

        <SubmitButton
          label="Recusar solução"
          labelWhenLoading="Aguardando confirmação..."
        />
      </FormV2>
    </Modal>
  );
}
