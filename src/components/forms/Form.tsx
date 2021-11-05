import { Form as AntdForm } from "antd";
import type { FormikHelpers, FormikProps, FormikTouched } from "formik";
import { Formik } from "formik";
import React, { useCallback } from "react";

import { Spinner } from "../ui/Spinner/Spinner";
import classes from "./Form.module.css";

type FormStatus = "loading" | "ready";

type FormikTyped<Original, Values> = Omit<
  Original,
  "setFieldError" | "setFieldTouched" | "setFieldValue" | "setStatus" | "status"
> & {
  setFieldError: (
    field: Extract<keyof Values, string>,
    message: string | undefined
  ) => void;
  setFieldTouched: (
    field: Extract<keyof Values, string>,
    isTouched?: boolean,
    shouldValidate?: boolean
  ) => void;

  setFieldValue: <FieldName extends Extract<keyof Values, string>>(
    field: FieldName,
    value: Values[FieldName],
    shouldValidate?: boolean
  ) => void;
  setStatus: (status: FormStatus | undefined) => void;
  status?: FormStatus;
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
  children: (props: FormChildrenProps<Values>) => React.ReactNode;
  initialTouched?: FormikTouched<Values>;
  initialValues: Values;
  isHorizontal?: boolean;
  isOnModal?: boolean;
  onSubmit: HandleSubmit<Values>;
  onValidate?: HandleValidate<Values>;
};

const defaultProps: Omit<
  FormProps<Record<string, never>>,
  "children" | "initialValues" | "onSubmit"
> = {
  initialTouched: undefined,
  isHorizontal: false,
  isOnModal: false,
  onValidate: undefined,
};

export function Form<Values extends Record<string, boolean | number | string>>({
  initialValues,
  initialTouched,
  isOnModal,
  onSubmit,
  onValidate,
  isHorizontal,
  children,
}: FormProps<Values>): JSX.Element {
  const handleSubmit = useCallback(
    async (
      values: Values,
      helpers: FormikTyped<FormikHelpers<Values>, Values>
    ) => {
      await onSubmit(values, helpers);
    },
    [onSubmit]
  );

  return (
    <Formik<Values>
      enableReinitialize={true}
      initialTouched={initialTouched}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={onValidate}
    >
      {(formikProps): JSX.Element => (
        <>
          {process.env.NODE_ENV !== "production" &&
            console.log("FORM", formikProps)}

          <Spinner
            spinning={formikProps.status === "loading"}
            wrapperClassName={`${classes.FormContainer} ${
              isOnModal ? "" : classes.MobileAccessibleForm
            }`}
          >
            <AntdForm
              colon={false}
              labelAlign="left"
              labelCol={{ span: isHorizontal ? 6 : 24 }}
              onFinish={formikProps.handleSubmit}
              wrapperCol={{ span: isHorizontal ? 18 : 24 }}
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
