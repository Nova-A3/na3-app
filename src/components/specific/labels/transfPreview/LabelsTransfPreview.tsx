import { Divider, Modal, Typography } from "antd";
import barcode from "jsbarcode";
import QrCode from "qrcode";
import React, { useCallback, useState } from "react";

import labelLayout from "../../../../assets/labelsTransfLayout.svg";
import type { ApiLabel } from "../../../../modules/na3-types";
import classes from "./LabelsTransfPreview.module.css";
import { PreviewData } from "./PreviewData";
import { PreviewFooter } from "./PreviewFooter";

type LabelsTransfPreviewProps = {
  copies: number | undefined;
  label: ApiLabel<"transf"> | undefined;
  onCancel: () => void;
  onPrint: (
    label: ApiLabel<"transf">,
    additionalConfig: {
      barcodeDataUrl: string;
      copies: number;
      qrDataUrl: string;
    }
  ) => void;
  onSave: (
    label: ApiLabel<"transf">,
    additionalConfig: {
      barcodeDataUrl: string;
      copies: number;
      qrDataUrl: string;
    }
  ) => void;
};

export function LabelsTransfPreview({
  copies,
  onCancel,
  onPrint,
  onSave,
  label,
}: LabelsTransfPreviewProps): JSX.Element | null {
  const [qrDataUrl, setQrDataUrl] = useState<string>();
  const [barcodeDataUrl, setBarcodeDataUrl] = useState<string>();

  const handleMakeQrCode = useCallback(
    async (canvasEl: HTMLCanvasElement | null) => {
      if (!canvasEl || !label?.batchId) return;
      const qrData = `https://app.novaa3.com.br/transf/${label.batchId
        .trim()
        .toUpperCase()
        .replace(/[- ]/g, "")}`;
      await QrCode.toCanvas(canvasEl, qrData, {
        color: {
          light: "#0000", // Transparent
        },
        margin: 0,
        width: 72,
      });
      setQrDataUrl(canvasEl.toDataURL());
    },
    [label?.batchId]
  );

  const handleMakeBarcode = useCallback(
    (canvasEl: HTMLCanvasElement | null) => {
      if (!canvasEl || !label?.productCode) return;
      barcode(canvasEl, label.productCode, {
        background: "#0000",
        margin: 0, // Transparent
      });
      setBarcodeDataUrl(canvasEl.toDataURL());
    },
    [label?.productCode]
  );

  const handlePrint = useCallback(() => {
    if (!(label && copies && qrDataUrl && barcodeDataUrl)) return;
    onPrint(label, { barcodeDataUrl, copies, qrDataUrl });
  }, [onPrint, label, copies, qrDataUrl, barcodeDataUrl]);

  const handleSave = useCallback(() => {
    if (!(label && copies && qrDataUrl && barcodeDataUrl)) return;
    onSave(label, { barcodeDataUrl, copies, qrDataUrl });
  }, [onSave, label, copies, qrDataUrl, barcodeDataUrl]);

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

        <canvas
          ref={handleMakeQrCode}
          style={{ left: 520, position: "absolute", top: 243 }}
        />

        <canvas
          ref={handleMakeBarcode}
          style={{
            height: 72,
            left: 672,
            position: "absolute",
            top: 243,
            width: 202,
          }}
        />
      </div>

      <Divider />

      <div style={{ textAlign: "right" }}>
        <Typography.Text>Nº de cópias: {copies}</Typography.Text>
      </div>
    </Modal>
  );
}
