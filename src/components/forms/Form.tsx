import { Form as AntdForm, message } from "antd";
import React, { useCallback } from "react";
import type {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { FormProvider } from "react-hook-form";

import { Spinner } from "../ui/Spinner/Spinner";

export type HandleSubmit<Fields extends FieldValues = FieldValues> =
  SubmitHandler<Fields>;

export type HandleSubmitFailed<Fields extends FieldValues = FieldValues> =
  SubmitErrorHandler<Fields>;

type FormProps<
  Fields extends FieldValues = FieldValues,
  Context extends Record<string, unknown> = Record<string, unknown>
> = {
  children: React.ReactNode;
  form: UseFormReturn<Fields, Context>;
  onSubmit: HandleSubmit<Fields>;
  onSubmitFailed?: HandleSubmitFailed<Fields>;
};

const defaultProps: Omit<FormProps, "children" | "form" | "onSubmit"> = {
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
}: FormProps<Fields, Context>): JSX.Element {
  const handleSubmitFailed: SubmitErrorHandler<Fields> = useCallback(
    (errors, event) => {
      void message.error("Corrija os erros");
      onSubmitFailed?.(errors, event);
    },
    [onSubmitFailed]
  );

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
      <Spinner spinning={formState.isSubmitting} text={null}>
        <AntdForm onFinish={handleSubmit(onSubmit, handleSubmitFailed)}>
          {children}
        </AntdForm>
      </Spinner>
    </FormProvider>
  );
}

Form.defaultProps = defaultProps;
