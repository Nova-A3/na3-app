import { notification } from "antd";
import React, { useCallback, useMemo, useState } from "react";

import {
  useNa3Product,
  useNa3ProductCustomers,
  useNa3TransfLabelTemplates,
} from "../../../modules/na3-react";
import type { Na3TransfLabelTemplate } from "../../../modules/na3-types";
import { formatProductUnit } from "../../../utils";
import { FormCollapse } from "../../forms/components/FormCollapse";
import type { HandleSubmit, HandleValidate } from "../../forms/Form";
import { Form } from "../../forms/Form";
import { FormItem } from "../../forms/FormItem";
import { SubmitButton } from "../../forms/SubmitButton";

type LabelTemplateFormProps = {
  editingTemplate?: Na3TransfLabelTemplate;
  onSubmit?: () => void;
};

const defaultProps: LabelTemplateFormProps = {
  editingTemplate: undefined,
  onSubmit: undefined,
};

type FormValues = {
  batchIdFormat: "brazil" | "mexico";
  customerName: string;
  productCode: string;
  productName: string;
  productUnitDisplay: string;
  templateName: string;
};

export function LabelsTransfTemplateForm({
  editingTemplate,
  onSubmit,
}: LabelTemplateFormProps): JSX.Element {
  const [productCode, setProductCode] = useState(
    editingTemplate?.productCode || ""
  );

  const transfLabelTemplates = useNa3TransfLabelTemplates();

  const product = useNa3Product(productCode);
  const productCustomers = useNa3ProductCustomers(product.data);

  const handleValidate: HandleValidate<FormValues> = useCallback(
    ({ templateName, productCode, productName, customerName }) => {
      const errors: Partial<FormValues> = {};
      if (!templateName) errors.templateName = "Campo obrigatório";
      if (!productCode) errors.productCode = "Campo obrigatório";
      if (product.error) errors.productCode = product.error;
      if (productName && !customerName)
        errors.customerName = "Campo obrigatório";
      return errors;
    },
    [product.error]
  );

  const handleSubmit: HandleSubmit<FormValues> = useCallback(
    async (
      { templateName, productName, customerName, batchIdFormat },
      helpers
    ) => {
      const notifyError = (message: string): void => {
        notification.error({
          description: message,
          message: `Erro ao ${editingTemplate ? "editar" : "criar"} o modelo`,
        });
      };

      if (!product.data || product.data.name !== productName) {
        return notifyError("Não foi possível vincular um produto ao modelo.");
      } else if (!productCustomers.data) {
        return notifyError("Não foi possível vincular um cliente ao modelo.");
      }

      helpers.setStatus("loading");

      const customer = productCustomers.data.find(
        (customer) => customer.name === customerName
      );
      const template: Omit<Na3TransfLabelTemplate, "id"> = {
        batchIdFormat: batchIdFormat,
        customerId: customer?.id.toUpperCase().trim() || null,
        customerName: customer?.name.toUpperCase().trim() || customerName,
        name: templateName.toUpperCase().trim(),
        productCode: product.data.code.toUpperCase().trim(),
        productId: product.data.id.toUpperCase().trim(),
        productName: product.data.name.toUpperCase().trim(),
        productSnapshot: product.data,
        productUnitAbbreviation: product.data.unit.abbreviation
          .toUpperCase()
          .trim(),
        productUnitName: product.data.unit.name.toUpperCase().trim(),
      };

      const operationRes = await (editingTemplate
        ? transfLabelTemplates.helpers.update(editingTemplate.id, template)
        : transfLabelTemplates.helpers.add(template));

      if (operationRes.error) {
        notifyError(operationRes.error.message);
      } else {
        notification.success({
          description: `O modelo "${template.name}" foi ${
            editingTemplate ? "editado" : "criado"
          } com sucesso!`,
          message: `Modelo ${editingTemplate ? "editado" : "criado"}`,
        });
      }

      helpers.setStatus("ready");

      if (onSubmit) onSubmit();
    },
    [
      editingTemplate,
      onSubmit,
      product.data,
      productCustomers.data,
      transfLabelTemplates.helpers,
    ]
  );

  const batchIdFormatOptions = useMemo(
    () => [
      {
        label: (
          <>
            Brasil <em>(AA11-222-33344 B)</em>
          </>
        ),
        value: "brazil",
      },
      {
        label: (
          <>
            México <em>(AA-BB-1111)</em>
          </>
        ),
        value: "mexico",
      },
    ],
    []
  );

  return (
    <Form<FormValues>
      initialTouched={
        editingTemplate && { productCode: true, templateName: true }
      }
      initialValues={{
        batchIdFormat: editingTemplate?.batchIdFormat || "brazil",
        customerName: editingTemplate?.customerName || "",
        productCode: editingTemplate?.productCode.replace("-", "") || "",
        productName: editingTemplate?.productName || "",
        productUnitDisplay: editingTemplate
          ? formatProductUnit(
              editingTemplate.productUnitName,
              editingTemplate.productUnitAbbreviation
            )
          : "",
        templateName: editingTemplate?.name || "",
      }}
      onSubmit={handleSubmit}
      onValidate={handleValidate}
    >
      {({ values, touched, setFieldValue, setFieldTouched }): JSX.Element => (
        <>
          <FormItem
            autoCapitalize={true}
            label="Nome do modelo"
            name="templateName"
            type="input"
          />

          <FormItem
            autoCapitalize={true}
            disabled={product.loading}
            help={product.loading && "Buscando produto..."}
            label="Código do produto"
            loading={product.loading}
            mask={[
              /[\ds]/i,
              ...(values.productCode.startsWith("S")
                ? ["-", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
                : [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]),
            ]}
            name="productCode"
            onValueChange={setProductCode}
            type="mask"
          />

          {product.data ? (
            <>
              {values.productName !== product.data.name &&
                setFieldValue("productName", product.data.name)}
              {values.productUnitDisplay !==
                formatProductUnit(
                  product.data.unit.name,
                  product.data.unit.abbreviation
                ) &&
                setFieldValue(
                  "productUnitDisplay",
                  formatProductUnit(
                    product.data.unit.name,
                    product.data.unit.abbreviation
                  )
                )}
              {product.data.isMexicoProduct &&
                !editingTemplate &&
                !touched.batchIdFormat &&
                setFieldTouched("batchIdFormat", true) &&
                setFieldValue("batchIdFormat", "mexico")}

              <FormItem
                disabled={true}
                label="Produto"
                name="productName"
                type="input"
              />

              <FormItem
                autoCapitalize={true}
                disabled={productCustomers.loading}
                help={productCustomers.loading && "Buscando clientes..."}
                label="Cliente"
                loading={productCustomers.loading}
                name="customerName"
                options={(productCustomers.data || []).map((customer) => ({
                  label: customer.name.toUpperCase(),
                  value: customer.name.toUpperCase(),
                }))}
                type="autoComplete"
              />
              {(productCustomers.data || []).length > 0 &&
                editingTemplate &&
                !touched.customerName &&
                values.customerName === "" &&
                setFieldTouched("customerName") &&
                setFieldValue(
                  "customerName",
                  editingTemplate.customerName,
                  true
                )}

              <FormItem
                disabled={true}
                label="Unidade"
                name="productUnitDisplay"
                type="input"
              />

              <FormCollapse title="Avançado">
                <FormItem
                  label="Formato de numeração dos lotes"
                  name="batchIdFormat"
                  options={batchIdFormatOptions}
                  type="select"
                />
              </FormCollapse>

              <SubmitButton disableShowInvalidFields={!!editingTemplate}>
                {editingTemplate ? "Salvar alterações" : "Criar modelo"}
              </SubmitButton>
            </>
          ) : (
            <>
              {values.productName !== "" && setFieldValue("productName", "")}
              {values.customerName !== "" &&
                setFieldValue("customerName", "", true)}
              {values.productUnitDisplay !== "" &&
                setFieldValue("productUnitDisplay", "")}
            </>
          )}
        </>
      )}
    </Form>
  );
}

LabelsTransfTemplateForm.defaultProps = defaultProps;
