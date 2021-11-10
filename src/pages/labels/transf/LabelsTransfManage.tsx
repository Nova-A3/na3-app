import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Modal, notification } from "antd";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

import {
  LabelsTransfList,
  LabelsTransfTemplateForm,
  PageActionButtons,
  PageTitle,
} from "../../../components";
import { useNa3TransfLabelTemplates } from "../../../modules/na3-react";
import type { Na3TransfLabelTemplate } from "../../../modules/na3-types";

export function LabelsTransfManagePage(): JSX.Element {
  const [selectedTemplate, setSelectedTemplate] =
    useState<Na3TransfLabelTemplate>();

  const history = useHistory();

  const transfLabelTemplates = useNa3TransfLabelTemplates();

  const handleCreateTemplateClick = useCallback(() => {
    history.push("/etiquetas/gerenciar/transferencia/criar-modelo");
  }, [history]);

  const handleSelectTemplate = useCallback(
    (template: Na3TransfLabelTemplate) => {
      setSelectedTemplate(template);
    },
    []
  );

  const handleCloseModal = useCallback(() => {
    setSelectedTemplate(undefined);
  }, []);

  const handleDeleteTemplate = useCallback(
    (template: Na3TransfLabelTemplate) => {
      const onConfirmDelete = async (): Promise<void> => {
        const deletionResult = await transfLabelTemplates.helpers.delete(
          template.id
        );
        if (deletionResult.error)
          notification.error({
            description: deletionResult.error.message,
            message: "Erro ao excluir o modelo",
          });
        else
          notification.success({
            description: `O modelo "${template.name}" foi excluído com sucesso.`,
            message: "Modelo excluído",
          });
      };

      Modal.confirm({
        cancelText: "Voltar",
        content: "Esta ação é permanente.",
        okButtonProps: { danger: true },
        okText: "Excluir",
        onOk: onConfirmDelete,
        title: `Excluir "${template.name}"?`,
      });
    },
    [transfLabelTemplates.helpers]
  );

  return (
    <>
      <PageTitle>Modelos • Transferência</PageTitle>
      <PageActionButtons>
        <Button
          icon={<PlusCircleOutlined />}
          onClick={handleCreateTemplateClick}
          type="primary"
        >
          Criar modelo
        </Button>
      </PageActionButtons>

      <LabelsTransfList
        cardTooltipActionText="editar"
        onDeleteTemplate={handleDeleteTemplate}
        onSelectTemplate={handleSelectTemplate}
      />

      <Modal
        footer={null}
        onCancel={handleCloseModal}
        title={selectedTemplate?.name.trim().toUpperCase()}
        visible={!!selectedTemplate}
        width="80vw"
      >
        <LabelsTransfTemplateForm
          editingTemplate={selectedTemplate}
          onSubmit={handleCloseModal}
        />
      </Modal>
    </>
  );
}
