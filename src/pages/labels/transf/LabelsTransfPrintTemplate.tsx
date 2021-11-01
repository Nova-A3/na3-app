import { LeftCircleOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import React, { useCallback, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";

import {
  Centered,
  LabelsTransfPrintForm,
  PageDescription,
  PageTitle,
} from "../../../components";
import { useBreadcrumb } from "../../../hooks";
import { useNa3TransfLabelTemplates } from "../../../modules/na3-react";

type PageProps = {
  templateId: string;
};

export function LabelsTransfPrintTemplatePage({
  templateId,
}: PageProps): JSX.Element {
  const history = useHistory();
  const breadcrumb = useBreadcrumb();
  const {
    helpers: { getById: getTemplate },
  } = useNa3TransfLabelTemplates();

  const template = useMemo(
    () => getTemplate(templateId),
    [templateId, getTemplate]
  );

  const handleGoBack = useCallback(() => {
    history.replace("/etiquetas/imprimir/transferencia");
  }, [history]);

  const handleShowLabelPreview = useCallback(() => {
    return;
  }, []);

  useEffect(() => {
    breadcrumb.setExtra(template?.name.trim().toUpperCase());
  }, [template, breadcrumb]);

  return template ? (
    <>
      <PageTitle>Imprimir etiqueta</PageTitle>
      <PageDescription>Configure a etiqueta.</PageDescription>

      <LabelsTransfPrintForm
        onSubmit={handleShowLabelPreview}
        template={template}
      />
    </>
  ) : (
    <Centered>
      <Result
        extra={
          <Button
            icon={<LeftCircleOutlined />}
            onClick={handleGoBack}
            type="primary"
          >
            Voltar
          </Button>
        }
        status="404"
        subTitle="O modelo de etiqueta solicitado não existe ou foi desabilitado."
        title="Oops!"
      />
    </Centered>
  );
}
