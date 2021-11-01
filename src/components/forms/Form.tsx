import { Form as AntdForm } from "antd";
import type { FormikHelpers, FormikProps, FormikTouched } from "formik";
import { Formik } from "formik";
import React from "react";

import { Spinner } from "../ui/Spinner";

type FormStatus = "loading" | "ready";

type FormikTyped<Original, Values> = Omit<
  Original,
  "setFieldError" | "setFieldTouched" | "setFieldValue" | "setStatus" | "status"
> & {
  status?: FormStatus;
  setStatus: (status: FormStatus | undefined) => void;

  setFieldValue: <FieldName extends Extract<keyof Values, string>>(
    field: FieldName,
    value: Values[FieldName],
    shouldValidate?: boolean
  ) => void;
  setFieldTouched: (
    field: Extract<keyof Values, string>,
    isTouched?: boolean,
    shouldValidate?: boolean
  ) => void;
  setFieldError: (
    field: Extract<keyof Values, string>,
    message: string | undefined
  ) => void;
};

export type HandleSubmit<Values> = (
  values: Values,
  helpers: FormikTyped<FormikHelpers<Values>, Values>
) => Promise<void> | void;

export type HandleValidate<Values> = (
  values: Values
) => Partial<Record<keyof Values, string>>;

export type FormChildrenProps<Values> = FormikTyped<
  FormikProps<Values>,
  Values
>;

type FormProps<Values> = {
  initialValues: Values;
  onSubmit: HandleSubmit<Values>;
  onValidate?: HandleValidate<Values>;
  initialTouched?: FormikTouched<Values>;
  initialValid?: boolean;

  children: (props: FormChildrenProps<Values>) => React.ReactNode;
} & { horizontal?: boolean };

const defaultProps: Omit<
  FormProps<Record<string, never>>,
  "children" | "initialValues" | "onSubmit"
> = {
  horizontal: false,
  initialTouched: undefined,
  initialValid: false,
  onValidate: undefined,
};

export function Form<Values extends Record<string, boolean | number | string>>({
  initialValues,
  initialTouched,
  initialValid,
  onSubmit,
  onValidate,
  horizontal,
  children,
}: FormProps<Values>): JSX.Element {
  return (
    <Formik<Values>
      enableReinitialize={true}
      initialTouched={initialTouched}
      initialValues={initialValues}
      isInitialValid={initialValid || false}
      onSubmit={onSubmit}
      validate={onValidate}
    >
      {(formikProps): JSX.Element => (
        <>
          {console.log(formikProps)}

          <Spinner spinning={formikProps.status === "loading"}>
            <AntdForm
              colon={false}
              labelAlign="left"
              labelCol={{ span: horizontal ? 6 : 24 }}
              onFinish={formikProps.handleSubmit}
              wrapperCol={{ span: horizontal ? 18 : 24 }}
            >
              {children(formikProps)}
            </AntdForm>
          </Spinner>
        </>
      )}
    </Formik>
  );
}

Form.defaultProps = defaultProps;
