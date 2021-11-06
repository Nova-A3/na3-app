import { Form as AntdForm } from "antd";
import React from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { FormProvider } from "react-hook-form";

type FormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object
> = {
  children: React.ReactNode;
  form: UseFormReturn<TFieldValues, TContext>;
};

export function Form<
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object
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
      <AntdForm onFinish={handleSubmit}>{children}</AntdForm>
    </FormProvider>
  );
}
