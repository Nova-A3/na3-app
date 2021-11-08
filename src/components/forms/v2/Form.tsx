import { Form as AntdForm, message } from "antd";
import React, { useCallback, useState } from "react";
import type {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { FormProvider } from "react-hook-form";

import { Spinner } from "../../ui/Spinner/Spinner";
import classes from "./Form.module.css";
import type { FormFieldProps } from "./FormField/FormField";
import type { SubmitButtonProps } from "./SubmitButton";

export type HandleSubmit<TFieldValues extends FieldValues = FieldValues> =
  SubmitHandler<TFieldValues>;

export type HandleSubmitFailed<TFieldValues extends FieldValues = FieldValues> =
  SubmitErrorHandler<TFieldValues>;

type FormProps<
  Fields extends FieldValues = FieldValues,
  Context extends Record<string, unknown> = Record<string, unknown>
> = {
  children: React.ReactElement<FormFieldProps | SubmitButtonProps>[];
  form: UseFormReturn<Fields, Context>;
  isModal?: boolean;
  onSubmit: HandleSubmit<Fields>;
  onSubmitFailed?: HandleSubmitFailed<Fields>;
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
  const [spinnerText /* setSpinnerText */] = useState<string | null>(null);

  const handleSubmitFailed: SubmitErrorHandler<Fields> = useCallback(
    (errors, event) => {
      void message.error("Corrija os erros");
      onSubmitFailed?.(errors, event);
    },
    [onSubmitFailed]
  );

  /*
  useEffect(() => {
    React.Children.forEach(children, (child) => {
      // Check if is SubmitButton
      if (React.isValidElement(child) && "labelWhenLoading" in child.props) {
        setSpinnerText(child.props.labelWhenLoading);
      }
    });
  }, [children]);
  */

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
        text={spinnerText}
        wrapperClassName={`${classes.FormContainer} ${
          isModal ? "" : classes.MobileAccessibleForm
        }`}
      >
        <AntdForm onFinish={handleSubmit(onSubmit, handleSubmitFailed)}>
          {children}
        </AntdForm>
      </Spinner>
    </FormProvider>
  );
}

Form.defaultProps = defaultProps;
