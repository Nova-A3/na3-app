import { Divider, Modal, Typography } from "antd";
import React, { useCallback } from "react";

import labelLayout from "../../../../assets/labelsTransfLayout.svg";
import type { ApiLabel } from "../../../../modules/na3-types";
import classes from "./LabelsTransfPreview.module.css";
import { PreviewData } from "./PreviewData";
import { PreviewFooter } from "./PreviewFooter";

type LabelsTransfPreviewProps = {
  copies: number | undefined;
  label: ApiLabel<"transf"> | undefined;
  onCancel: () => void;
  onPrint: (label: ApiLabel<"transf">, copies: number) => void;
  onSave: (label: ApiLabel<"transf">, copies: number) => void;
};

export function LabelsTransfPreview({
  copies,
  onCancel,
  onPrint,
  onSave,
  label,
}: LabelsTransfPreviewProps): JSX.Element | null {
  const handlePrint = useCallback(() => {
    if (!label || !copies) return;
    onPrint(label, copies);
  }, [onPrint, label, copies]);

  const handleSave = useCallback(() => {
    if (!label || !copies) return;
    onSave(label, copies);
  }, [onSave, label, copies]);

  if (!label) {
    return null;
  }
  return (
    <Modal
      centered={true}
      footer={
        <PreviewFooter
          onCancel={onCancel}
          onPrint={handlePrint}
          onSave={handleSave}
        />
      }
      onCancel={onCancel}
      title="Pré-visualização"
      visible={!!label}
      width={1000}
    >
      <div className={classes.LabelPreview}>
        <img alt="Layout impresso da etiqueta" src={labelLayout} />

        <PreviewData x={311} y={65}>
          {label.customerName.toUpperCase()}
        </PreviewData>

        <PreviewData x={780} y={65}>
          {label.date.toUpperCase()}
        </PreviewData>

        <PreviewData w={700} x={46} y={150}>
          {label.productCode.toUpperCase()} — {label.productName.toUpperCase()}
        </PreviewData>

        <PreviewData x={780} y={150}>
          {label.productQuantity} {label.productUnitAbbreviation.toUpperCase()}
        </PreviewData>

        <PreviewData x={46} y={258}>
          {label.batchId.toUpperCase()}
        </PreviewData>

        {label.invoiceNumber && (
          <PreviewData x={275} y={258}>
            {label.invoiceNumber.toUpperCase()}
          </PreviewData>
        )}
      </div>

      <Divider />

      <div style={{ textAlign: "right" }}>
        <Typography.Text>Nº de cópias: {copies}</Typography.Text>
      </div>
    </Modal>
  );
}
