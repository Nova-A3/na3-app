import { Col, Divider, Row } from "antd";
import dayjs from "dayjs";
import React, { useCallback } from "react";
import { na3 } from "../../../modules/na3";
import type {
  ApiLabel,
  Na3TransfLabelTemplate,
} from "../../../modules/na3-types";
import { formatProductUnit } from "../../../utils";
import { FormCollapse } from "../../forms/components/FormCollapse";
import type { HandleSubmit, HandleValidate } from "../../forms/Form";
import { Form } from "../../forms/Form";
import { FormItem } from "../../forms/FormItem";
import { SubmitButton } from "../../forms/SubmitButton";

type LabelsTransfPrintFormProps = {
  template: Na3TransfLabelTemplate;
  onSubmit: HandleSubmit<FormValues>;
};

type FormValues = Record<
  keyof Pick<
    ApiLabel<"transf">,
    | "batchId"
    | "customerName"
    | "date"
    | "productCode"
    | "productName"
    | "productQuantity"
  >,
  string
> & {
  productUnitDisplay: string;
  copies: string;
  invoiceNumber: string;
};

export function LabelsTransfPrintForm({
  template,
  onSubmit,
}: LabelsTransfPrintFormProps): JSX.Element {
  const formatBatchId = useCallback(
    (batchId: string) => {
      return template.batchIdFormat === "brazil"
        ? batchId.slice(0, 4) +
            "-" +
            batchId.slice(4, 7) +
            "-" +
            batchId.slice(7, 12) +
            " " +
            batchId.slice(12)
        : "KA-" +
            batchId[1] +
            (batchId[1] === "N" ? "T" : "I") +
            "-" +
            batchId.slice(2);
    },
    [template.batchIdFormat]
  );

  const handleValidate: HandleValidate<FormValues> = useCallback(
    (values) => {
      const errors: Partial<FormValues> = {};

      if (!values.batchId) errors.batchId = "Campo obrigatório";
      else if (
        !na3
          .validator()
          .isBatchId(formatBatchId(values.batchId), template.batchIdFormat)
      ) {
        errors.batchId = "Nº do Lote inválido";
      }

      if (!values.productQuantity) errors.productQuantity = "Campo obrigatório";
      else if (
        Number.parseFloat(values.productQuantity.replace(",", ".")) <= 0
      ) {
        errors.productQuantity = "Deve ser maior que zero";
      }

      if (!values.copies) errors.copies = "Campo obrigatório";
      else if (Number.parseInt(values.copies) <= 0) {
        errors.copies = "Deve ser maior que zero";
      }

      if (values.invoiceNumber && Number.parseInt(values.invoiceNumber) <= 0) {
        errors.invoiceNumber = "Nº da NF inválido";
      }

      return errors;
    },
    [formatBatchId, template.batchIdFormat]
  );

  return (
    <Form<FormValues>
      initialValues={{
        batchId: "",
        copies: "",
        customerName: template.customerName.trim().toUpperCase(),
        date: dayjs().format("DD/MM/YYYY"),
        invoiceNumber: "",
        productCode: template.productCode.trim().toUpperCase(),
        productName: template.productName.trim().toUpperCase(),
        productQuantity: "",
        productUnitDisplay: formatProductUnit(
          template.productUnitName,
          template.productUnitAbbreviation
        ),
      }}
      onSubmit={onSubmit}
      onValidate={handleValidate}
    >
      {({ values }) => (
        <>
          <PrintFormHeader />

          <Divider />

          <Row gutter={16}>
            <Col lg={12} md={11} sm={8} xs={24}>
              <FormItem
                autoCapitalize={true}
                label="Lote"
                mask={
                  template.batchIdFormat === "mexico"
                    ? [
                        /k/i,
                        "A",
                        "-",
                        /[cn]/i,
                        values.batchId[1] === "N"
                          ? "T"
                          : values.batchId[1] === "C"
                          ? "I"
                          : /[it]/i,
                        "-",
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                      ]
                    : [
                        /[c-fikr]/i,
                        // /[abcdfgklmx]/i,
                        values.batchId.startsWith("C")
                          ? /[glm]/i
                          : values.batchId.startsWith("D")
                          ? /b/i
                          : values.batchId.startsWith("E")
                          ? /[kx]/i
                          : values.batchId.startsWith("F")
                          ? /k/i
                          : values.batchId.startsWith("I")
                          ? /[df]/i
                          : values.batchId.startsWith("K")
                          ? /a/i
                          : /c/i,
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
                }
                maskPlaceholder={
                  template.batchIdFormat === "mexico" ? `KA-__-____` : undefined
                }
                name="batchId"
                tooltip={{
                  title: (
                    <>
                      Formato:{" "}
                      <strong>
                        {template.batchIdFormat === "mexico"
                          ? "MÉXICO"
                          : "BRASIL"}
                      </strong>
                    </>
                  ),
                }}
                type="mask"
              />
            </Col>

            <Col lg={6} md={7} sm={8} xs={24}>
              <FormItem
                helpDefault={
                  template.productSnapshot &&
                  `Máx./caixa: 
                          ${template.productSnapshot.perCarton} 
                          ${template.productUnitName.toLowerCase()}`
                }
                label="Valor de quantidade"
                max={template.productSnapshot?.perCarton}
                name="productQuantity"
                suffix={template.productUnitName.toLowerCase()}
                tooltip={
                  <>
                    Unidade:{" "}
                    <strong>{template.productUnitName.toUpperCase()}</strong>
                    {template.productSnapshot && (
                      <>
                        <br />
                        Máx./caixa:{" "}
                        <strong>{template.productSnapshot.perCarton}</strong>
                      </>
                    )}
                  </>
                }
                type="decimal"
              />
            </Col>

            <Col md={6} sm={8} xs={24}>
              <FormItem
                label="Qtd. de etiquetas"
                name="copies"
                suffix="cópias"
                type="integer"
              />
            </Col>
          </Row>

          <FormCollapse title="Mais...">
            <FormItem
              label="Nº da NF"
              maxLength={8}
              name="invoiceNumber"
              notRequired={true}
              type="integer"
            />
          </FormCollapse>

          <SubmitButton>Pré-visualizar etiqueta</SubmitButton>
        </>
      )}
    </Form>
  );
}

function PrintFormHeader() {
  return (
    <>
      <Row gutter={16}>
        <Col md={18} sm={16} xs={24}>
          <FormItem
            disabled={true}
            label="Cliente"
            name="customerName"
            type="input"
          />
        </Col>

        <Col md={6} sm={8} xs={24}>
          <FormItem disabled={true} label="Data" name="date" type="input" />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col lg={4} md={6} xs={24}>
          <FormItem
            disabled={true}
            label="Código do produto"
            name="productCode"
            type="input"
          />
        </Col>

        <Col lg={14} md={12} sm={16} xs={24}>
          <FormItem
            disabled={true}
            label="Produto"
            name="productName"
            type="input"
          />
        </Col>

        <Col md={6} sm={8} xs={24}>
          <FormItem
            disabled={true}
            label="Unidade"
            name="productUnitDisplay"
            type="input"
          />
        </Col>
      </Row>
    </>
  );
}
