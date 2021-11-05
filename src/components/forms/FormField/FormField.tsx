import type { InputNumberProps, InputProps } from "antd";
import { Input } from "antd";
import { Form } from "antd";
import React, { useCallback, useMemo } from "react";
import { useController } from "react-hook-form";

import { isTouchDevice } from "../../../utils";
import { FieldHelp } from "./FieldHelp/FieldHelp";

type BaseInputOptionalProps = Partial<
  Pick<
    InputProps,
    | "addonAfter"
    | "addonBefore"
    | "allowClear"
    | "autoFocus"
    | "maxLength"
    | "prefix"
    | "suffix"
  >
>;

type InputNumberOptionalProps = Partial<Pick<InputNumberProps, "max" | "min">>;

type FormFieldRequiredProps = {
  name: string;
} & (
  | (BaseInputOptionalProps & { type: "input" })
  | (BaseInputOptionalProps & { type: "password" })
  | (InputNumberOptionalProps & { type: "number" })
);

type FormFieldOptionalProps = {
  defaultHelpText?: string;
  disabled?: boolean;
  hidden?: boolean;
  isLoading?: boolean;
  label?: string;
  loadingHelpText?: string;
  notRequired?: boolean;
  placeholder?: string;
};

type FormFieldProps = FormFieldOptionalProps & FormFieldRequiredProps;

const defaultProps: Required<
  Record<
    keyof FormFieldOptionalProps,
    FormFieldOptionalProps[keyof FormFieldOptionalProps] | undefined
  >
> = {
  defaultHelpText: undefined,
  disabled: false,
  hidden: false,
  isLoading: false,
  label: undefined,
  loadingHelpText: undefined,
  notRequired: false,
  placeholder: undefined,
};

export function FormField(props: FormFieldProps): JSX.Element {
  const {
    name,
    type,
    defaultHelpText,
    disabled: disabledProp,
    hidden,
    isLoading,
    label,
    loadingHelpText,
    notRequired,
    placeholder: placeholderProp,
  } = props;

  const {
    // eslint-disable-next-line
    field: { value, onChange, onBlur },
    fieldState: { error, isTouched },
    formState: { isSubmitting },
  } = useController({ name });

  const handleChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      onChange(ev);
    },
    [onChange]
  );

  const handleBlur = useCallback(() => {
    onBlur();
  }, [onBlur]);

  const helpText = useMemo(
    (): React.ReactNode => (
      <FieldHelp
        defaultText={defaultHelpText}
        error={error?.message}
        isLoading={!!isLoading}
        isTouched={isTouched}
        loadingText={loadingHelpText}
      />
    ),
    [defaultHelpText, error?.message, isLoading, isTouched, loadingHelpText]
  );

  const placeholder = useMemo((): string => {
    if (placeholderProp) return placeholderProp;
    switch (type) {
      case "input":
      case "password":
      case "number":
        return `${isTouchDevice() ? "Toque" : "Clique"} para preencher`;
    }
  }, [placeholderProp, type]);

  const disabled = useMemo(
    (): boolean => disabledProp || isLoading || isSubmitting,
    [disabledProp, isLoading, isSubmitting]
  );

  const field = useMemo((): React.ReactNode => {
    if (
      typeof value === "string" &&
      (type === "input" || type === "password")
    ) {
      const Component = type === "input" ? Input : Input.Password;
      return (
        <Component
          addonAfter={props.addonAfter}
          addonBefore={props.addonBefore}
          allowClear={props.allowClear}
          autoFocus={props.autoFocus}
          disabled={disabled}
          maxLength={props.maxLength}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder={placeholder}
          prefix={props.prefix}
          suffix={props.suffix}
          value={value}
        />
      );
    }

    switch (type) {
      case "number":
      default:
        return null;
    }
  }, [value, type, handleChange, handleBlur, disabled, placeholder, props]);

  return (
    <Form.Item
      hasFeedback={true}
      help={helpText}
      hidden={hidden}
      label={label}
      required={!notRequired}
      validateStatus={
        isLoading
          ? "validating"
          : isTouched
          ? error
            ? "error"
            : "success"
          : undefined
      }
    >
      {field}
    </Form.Item>
  );
}

FormField.defaultProps = defaultProps;
