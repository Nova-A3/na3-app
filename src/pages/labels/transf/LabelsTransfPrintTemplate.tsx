import { Button, Result } from "antd";
import React, { useCallback, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";

import {
  Centered,
  LabelsTransfPreview,
  LabelsTransfPrintForm,
  PageDescription,
  PageTitle,
} from "../../../components";
import { useBreadcrumb } from "../../../hooks";
import { useNa3TransfLabelTemplates } from "../../../modules/na3-react";
import type { ApiLabel } from "../../../modules/na3-types";
import type { LabelsTransfPrintFormOnSubmitValues } from "../../../types";
import { createTransfLabelFromPrintForm } from "../../../utils";

type PageProps = {
  templateId: string;
};

export function LabelsTransfPrintTemplatePage({
  templateId,
}: PageProps): JSX.Element {
  const history = useHistory();
  const { setExtra: setBreadcrumbExtra } = useBreadcrumb();
  const {
    helpers: { getById: getTemplate },
  } = useNa3TransfLabelTemplates();

  const [labelConfig, setLabelConfig] = React.useState<
    ApiLabel<"transf"> & { copies: number }
  >();

  const template = useMemo(
    () => getTemplate(templateId),
    [templateId, getTemplate]
  );

  const handleGoBack = useCallback(() => {
    history.replace("/etiquetas/imprimir/transferencia");
  }, [history]);

  const handleOpenLabelPreview = useCallback(
    (labelConfig: LabelsTransfPrintFormOnSubmitValues) => {
      setLabelConfig({
        ...createTransfLabelFromPrintForm(labelConfig),
        copies: labelConfig.copies,
      });
    },
    []
  );

  const handleCloseLabelPreview = useCallback(() => {
    setLabelConfig(undefined);
  }, []);

  const handlePrint = useCallback(
    (
      label: ApiLabel<"transf">,
      additionalConfig: {
        barcodeDataUrl: string;
        copies: number;
        qrDataUrl: string;
      }
    ) => {
      return [label, additionalConfig];
    },
    []
  );

  const handleSave = useCallback(
    (
      label: ApiLabel<"transf">,
      additionalConfig: {
        barcodeDataUrl: string;
        copies: number;
        qrDataUrl: string;
      }
    ) => {
      return [label, additionalConfig];
    },
    []
  );

  useEffect(() => {
    setBreadcrumbExtra(template?.name.trim().toUpperCase());
  }, [template, setBreadcrumbExtra]);

  return template ? (
    <>
      <PageTitle>Imprimir etiqueta</PageTitle>
      <PageDescription>Configure a etiqueta.</PageDescription>

      <LabelsTransfPrintForm
        onSubmit={handleOpenLabelPreview}
        template={template}
      />

      <LabelsTransfPreview
        copies={labelConfig?.copies}
        label={labelConfig}
        onCancel={handleCloseLabelPreview}
        onPrint={handlePrint}
        onSave={handleSave}
      />
    </>
  ) : (
    <Centered>
      <Result
        extra={
          <Button onClick={handleGoBack} type="primary">
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
