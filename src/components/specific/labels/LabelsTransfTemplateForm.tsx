import { notification } from "antd";
import React, { useCallback, useEffect, useState } from "react";

import { useForm } from "../../../hooks";
import na3 from "../../../modules/na3";
import { useNa3TransfLabelTemplates } from "../../../modules/na3-react";
import type {
  ApiPerson,
  ApiProduct,
  Na3TransfLabelTemplate,
} from "../../../modules/na3-types";
import { formatProductUnit } from "../../../utils";
import { FormCollapse } from "../../forms/v2/components/FormCollapse/FormCollapse";
import { Form } from "../../forms/v2/Form";
import { FormField } from "../../forms/v2/FormField/FormField";

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
  const [productCodeMaskType, setProductCodeMaskType] = useState<
    "dart" | "default"
  >("default");

  const [productLoading, setProductLoading] = useState(false);
  const [productData, setProductData] = useState<ApiProduct>();

  const [customersLoading, setCustomersLoading] = useState(false);
  const [customersData, setCustomersData] = useState<ApiPerson[]>();

  const transfLabelTemplates = useNa3TransfLabelTemplates();

  const form = useForm<FormValues>({
    defaultValues: {
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
    },
  });

  const resetApiData = useCallback(() => {
    setCustomersData(undefined);
    setCustomersLoading(false);

    setProductData(undefined);
    setProductLoading(false);
  }, []);

  const fetchAndSetApiData = useCallback(
    async (productCode: string): Promise<{ error?: string }> => {
      setProductLoading(true);

      const productRes = await na3.products.getByCode(productCode);

      if (productRes.error) {
        return { error: productRes.error.message };
      } else {
        const productRef = productRes.data;
        const customers = await productRef.getCustomers({ ignoreErrors: true });

        setProductData(productRef.get());
        setCustomersData(customers);
      }

      setProductLoading(false);
      setCustomersLoading(false);

      return {};
    },
    []
  );

  const handleValidateProductCode = useCallback(
    async (value: string) => {
      const productCode = na3.products.utils.fixQuery(value);

      if (!na3.products.isProductCode(productCode)) {
        resetApiData();
        return "Código do produto inválido";
      }

      const apiRes = await fetchAndSetApiData(productCode);

      if (apiRes.error) {
        resetApiData();
        return apiRes.error;
      }
    },
    [resetApiData, fetchAndSetApiData]
  );

  const handleProductCodeChange = useCallback((value: string) => {
    if (value.startsWith("S")) setProductCodeMaskType("dart");
    else setProductCodeMaskType("default");
  }, []);

  const handleSubmit = useCallback(
    async ({
      templateName,
      productName,
      customerName,
      batchIdFormat,
    }: FormValues) => {
      function notifyError(message: string): void {
        notification.error({
          description: message,
          message: `Erro ao ${editingTemplate ? "editar" : "criar"} o modelo`,
        });
      }

      if (!productData || productData.name !== productName) {
        return notifyError("Não foi possível vincular um produto ao modelo.");
      }

      const customer = customersData?.find(
        (customer) => customer.name === customerName
      );
      const template: Omit<Na3TransfLabelTemplate, "id"> = {
        batchIdFormat: batchIdFormat,
        customerId: customer?.id.toUpperCase().trim() || null,
        customerName: customer?.name.toUpperCase().trim() || customerName,
        name: templateName.toUpperCase().trim(),
        productCode: productData.code.toUpperCase().trim(),
        productId: productData.id.toUpperCase().trim(),
        productName: productData.name.toUpperCase().trim(),
        productSnapshot: productData,
        productUnitAbbreviation: productData.unit.abbreviation
          .toUpperCase()
          .trim(),
        productUnitName: productData.unit.name.toUpperCase().trim(),
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

      onSubmit?.();
    },
    [
      editingTemplate,
      onSubmit,
      productData,
      customersData,
      transfLabelTemplates.helpers,
    ]
  );

  useEffect(() => {
    if (productData) {
      form.setValue("productName", productData.name.trim().toUpperCase());
      form.setValue(
        "productUnitDisplay",
        formatProductUnit(productData.unit.name, productData.unit.abbreviation)
      );
    } else {
      form.setValue("productName", "");
      form.setValue("customerName", "");
      form.setValue("productUnitDisplay", "");
    }
  }, [productData, form]);

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <FormField
        autoUpperCase={true}
        label="Nome do modelo"
        name="templateName"
        rules={{ required: "Atribua um nome para o modelo" }}
        type="input"
      />

      <FormField
        autoUpperCase={true}
        isLoading={productLoading}
        label="Código do produto"
        mask={[
          /[\ds]/i,
          ...(productCodeMaskType === "dart"
            ? ["-", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
            : [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]),
        ]}
        name="productCode"
        onValueChange={handleProductCodeChange}
        rules={{
          required: "Forneça o código do produto",
          validate: handleValidateProductCode,
        }}
        type="mask"
      />

      <FormField
        disabled={true}
        hidden={!productData}
        label="Produto"
        name="productName"
        rules={null}
        type="input"
      />

      <FormField
        autoUpperCase={true}
        hidden={!productData || !customersData}
        isLoading={customersLoading}
        label="Cliente"
        name="customerName"
        options={(customersData || []).map((customer) => ({
          label: customer.name.trim().toUpperCase(),
          value: customer.name.trim().toUpperCase(),
        }))}
        rules={{ required: "Selecione ou defina um cliente" }}
        type="autoComplete"
      />

      <FormField
        disabled={true}
        hidden={!productData || !customersData}
        label="Unidade"
        name="productUnitDisplay"
        rules={null}
        type="input"
      />

      {productData && customersData && (
        <FormCollapse title="Avançado">
          <FormField
            hidden={!productData || !customersData}
            label="Formato de numeração dos lotes"
            name="batchIdFormat"
            options={batchIdFormatOptions}
            rules={{
              required: "Selecione um formato para a numeração dos lotes",
            }}
            type="select"
          />
        </FormCollapse>
      )}
    </Form>
  );
}

const batchIdFormatOptions = [
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
];

LabelsTransfTemplateForm.defaultProps = defaultProps;
