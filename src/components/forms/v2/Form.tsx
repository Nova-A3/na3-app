import { Form as AntdForm } from "antd";
import React from "react";
import type {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { FormProvider } from "react-hook-form";

import { Spinner } from "../../ui/Spinner/Spinner";
import classes from "./Form.module.css";

export type HandleSubmit<TFieldValues extends FieldValues = FieldValues> =
  SubmitHandler<TFieldValues>;

export type HandleSubmitFailed<TFieldValues extends FieldValues = FieldValues> =
  SubmitErrorHandler<TFieldValues>;

type FormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext extends Record<string, unknown> = Record<string, unknown>
> = {
  children: React.ReactNode;
  form: UseFormReturn<TFieldValues, TContext>;
  isModal?: boolean;
  onSubmit: HandleSubmit<TFieldValues>;
  onSubmitFailed?: HandleSubmitFailed<TFieldValues>;
};

const defaultProps: Omit<FormProps, "children" | "form" | "onSubmit"> = {
  isModal: false,
  onSubmitFailed: undefined,
};

export function Form<
  Fields extends FieldValues = FieldValues,
  Context extends Record<string, unknown> = Record<string, unknown>
>({
  form: {
    clearErrors,
    control,
    formState,
    getValues,
    handleSubmit,
    register,
    reset,
    resetField,
    setError,
    setFocus,
    setValue,
    trigger,
    unregister,
    watch,
  },
  children,
  onSubmit,
  onSubmitFailed,
  isModal,
}: FormProps<Fields, Context>): JSX.Element {
  return (
    <FormProvider
      clearErrors={clearErrors}
      control={control}
      formState={formState}
      getValues={getValues}
      handleSubmit={handleSubmit}
      register={register}
      reset={reset}
      resetField={resetField}
      setError={setError}
      setFocus={setFocus}
      setValue={setValue}
      trigger={trigger}
      unregister={unregister}
      watch={watch}
    >
      <Spinner
        spinning={formState.isSubmitting}
        wrapperClassName={`${classes.FormContainer} ${
          isModal ? "" : classes.MobileAccessibleForm
        }`}
      >
        <AntdForm onFinish={handleSubmit(onSubmit, onSubmitFailed)}>
          {children}
        </AntdForm>
      </Spinner>
    </FormProvider>
  );
}

Form.defaultProps = defaultProps;
