import { Form as AntdForm } from "antd";
import React from "react";
import type {
  FieldValues,
  UseFormReturn,
  UseFormHandleSubmit,
  SubmitHandler,
  SubmitErrorHandler,
} from "react-hook-form";
import { FormProvider } from "react-hook-form";

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
  onSubmit: HandleSubmit<TFieldValues>;
  onSubmitFailed: HandleSubmitFailed<TFieldValues>;
};

export function Form<
  TFieldValues extends FieldValues = FieldValues,
  TContext extends Record<string, unknown> = Record<string, unknown>
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
}: FormProps<TFieldValues, TContext>): JSX.Element {
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
      <AntdForm onFinish={handleSubmit(onSubmit, onSubmitFailed)}>
        {children}
      </AntdForm>
    </FormProvider>
  );
}
