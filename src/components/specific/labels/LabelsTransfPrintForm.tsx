import { Col, Divider, Row } from "antd";
import dayjs from "dayjs";
import React, { useCallback, useMemo } from "react";

import { useForm } from "../../../hooks";
import { na3 } from "../../../modules/na3";
import { useNa3Departments } from "../../../modules/na3-react";
import type { Na3TransfLabelTemplate } from "../../../modules/na3-types";
import type { LabelsTransfPrintFormOnSubmitValues } from "../../../types";
import { formatProductUnit } from "../../../utils";
import { FormCollapse } from "../../forms/v2/components/FormCollapse/FormCollapse";
import { Form as FormV2 } from "../../forms/v2/Form";
import { FormField } from "../../forms/v2/FormField/FormField";
import { SubmitButton } from "../../forms/v2/SubmitButton";

type LabelsTransfPrintFormProps = {
  onSubmit: (labelConfig: LabelsTransfPrintFormOnSubmitValues) => void;
  template: Na3TransfLabelTemplate;
};

type FormValues = {
  batchId: string;
  copies: string;
  customerName: string;
  date: string;
  invoiceNumber: string;
  productCode: string;
  productName: string;
  productQuantity: string;
  productUnitDisplay: string;
};

export function LabelsTransfPrintForm({
  template,
  onSubmit,
}: LabelsTransfPrintFormProps): JSX.Element {
  const departments = useNa3Departments();

  const form = useForm<FormValues>({
    defaultValues: {
      batchId: "",
      copies: "",
      customerName: template.customerName.trim().toUpperCase(),
      date: dayjs().format(),
      invoiceNumber: "",
      productCode: template.productCode.trim().toUpperCase(),
      productName: template.productName.trim().toUpperCase(),
      productQuantity: "",
      productUnitDisplay: formatProductUnit(
        template.productUnitName,
        template.productUnitAbbreviation
      ),
    },
  });

  const handleBatchIdValidate = useCallback((value: string) => {
    if (!na3.batchId(value).isValid) {
      return "Número de lote inválido";
    }
  }, []);

  const handleSubmit = useCallback(
    ({
      batchId,
      copies,
      customerName,
      date,
      invoiceNumber,
      productCode,
      productName,
      productQuantity,
    }: FormValues): void => {
      onSubmit({
        ...template,
        batchId: na3.batchId(batchId).value,
        copies: parseInt(copies),
        customerName,
        date: dayjs(date).format("DD/MM/YYYY"),
        invoiceNumber,
        productCode,
        productName,
        productQuantity: productQuantity,
        templateId: template.id,
      });
    },
    [onSubmit, template]
  );

  const now = useMemo(() => dayjs(), []);

  const dptTwoLetterId = useMemo(() => {
    return (
      (template.departmentId &&
        departments.helpers.getById(template.departmentId)?.twoLetterId) ||
      null
    );
  }, [template.departmentId, departments.helpers]);

  const batchIdTooltip = useMemo(
    () => (
      <>
        Formato:{" "}
        <strong>
          {template.batchIdFormat === "commercial"
            ? "COMERCIAL"
            : template.batchIdFormat === "mexico"
            ? "MÉXICO"
            : "BRASIL"}
        </strong>
      </>
    ),
    [template.batchIdFormat]
  );

  return (
    <FormV2 form={form} onSubmit={handleSubmit}>
      <Row gutter={16}>
        <Col md={18} sm={16} xs={24}>
          <FormField
            disabled={true}
            label="Cliente"
            name="customerName"
            rules={null}
            type="input"
          />
        </Col>
        <Col md={6} sm={8} xs={24}>
          <FormField
            label="Data"
            name="date"
            rules={{ required: "Defina a data" }}
            type="date"
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col lg={4} md={6} xs={24}>
          <FormField
            disabled={true}
            label="Código do produto"
            name="productCode"
            rules={null}
            type="input"
          />
        </Col>
        <Col lg={14} md={12} sm={16} xs={24}>
          <FormField
            disabled={true}
            label="Produto"
            name="productName"
            rules={null}
            type="input"
          />
        </Col>
        <Col md={6} sm={8} xs={24}>
          <FormField
            disabled={true}
            label="Unidade"
            name="productUnitDisplay"
            rules={null}
            type="input"
          />
        </Col>
      </Row>

      <Divider />

      <Row gutter={16}>
        <Col lg={12} md={11} sm={8} xs={24}>
          <FormField
            autoUpperCase={true}
            label="Lote"
            mask={
              template.batchIdFormat === "mexico"
                ? [
                    /k/i,
                    "a",
                    "-",
                    /[cn]/i,
                    /[it]/i,
                    "-",
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                  ]
                : template.batchIdFormat === "brazil"
                ? [
                    /[c-fikr]/i,
                    /[a-dfgk-mx]/i,
                    /[0-3]/,
                    /\d/,
                    "-",
                    /\d/,
                    /\d/,
                    /\d/,
                    "-",
                    /[2-4]/,
                    /\d/,
                    /[0-3]/,
                    /\d/,
                    /\d/,
                    " ",
                    /[a-g]/i,
                  ]
                : [
                    /[c-fikr]/i,
                    /[a-dfgk-mx]/i,
                    "-",
                    /\d/,
                    /\d/,
                    /\d/,
                    "-",
                    /[2-4]/,
                    /\d/,
                    " ",
                    /[a-g]/i,
                  ]
            }
            maskPlaceholder={
              template.batchIdFormat === "mexico"
                ? "KA-__-____"
                : dptTwoLetterId
                ? template.batchIdFormat === "brazil"
                  ? `${dptTwoLetterId}__-___-_____ _`
                  : `${dptTwoLetterId}-___-__ _`
                : undefined
            }
            name="batchId"
            rules={{
              required: "Informe o número do lote",
              validate: handleBatchIdValidate,
            }}
            tooltip={batchIdTooltip}
            type="mask"
          />
        </Col>

        <Col lg={6} md={7} sm={8} xs={24}>
          <FormField
            defaultHelp={
              template.productSnapshot &&
              `Máx./caixa: ${template.productSnapshot.perCarton
                .toString()
                .replace(".", ",")} ${template.productUnitName.toLowerCase()}`
            }
            label="Valor de quantidade"
            max={template.productSnapshot?.perCarton}
            maxLength={8}
            name="productQuantity"
            rules={{
              min: { message: "Deve ser maior que zero", value: 0 },
              required: "Defina a quantidade na caixa",
              ...(template.productSnapshot?.perCarton && {
                max: {
                  message: "Deve ser menor que o máx./caixa",
                  value: template.productSnapshot.perCarton,
                },
              }),
            }}
            suffix={template.productUnitName.toLowerCase()}
            tooltip={
              <>
                Unidade:{" "}
                <strong>{template.productUnitName.toUpperCase()}</strong>
                {template.productSnapshot && (
                  <>
                    <br />
                    Máx./caixa:{" "}
                    <strong>
                      {template.productSnapshot.perCarton
                        .toString()
                        .replace(".", ",")}
                    </strong>
                  </>
                )}
              </>
            }
            type="number"
          />
        </Col>

        <Col md={6} sm={8} xs={24}>
          <FormField
            label="Qtd. de cópias"
            name="copies"
            noDecimal={true}
            rules={{
              min: { message: "Deve ser maior que zero", value: 0 },
              required: "Defina a quantidade na caixa",
            }}
            suffix="etiquetas"
            type="number"
          />
        </Col>
      </Row>

      <FormCollapse title="Mais...">
        <FormField
          label="Nº da NF"
          maxLength={8}
          name="invoiceNumber"
          noDecimal={true}
          required={false}
          rules={null}
          type="number"
        />
      </FormCollapse>

      <SubmitButton label="Pré-visualizar" labelWhenLoading="Aguardando..." />
    </FormV2>
  );
}
