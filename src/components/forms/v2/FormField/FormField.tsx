import type {
  AutoCompleteProps,
  FormItemProps,
  InputNumberProps,
  InputProps,
  SelectProps,
  SwitchProps,
} from "antd";
import { AutoComplete, Form, Input, InputNumber, Select, Switch } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import React, { useCallback, useMemo } from "react";
import { useController } from "react-hook-form";

import { isTouchDevice } from "../../../../utils";
import { InputDate } from "../fields/InputDate/InputDate";
import { InputMask } from "../fields/InputMask/InputMask";
import { FieldHelp } from "./FieldHelp/FieldHelp";
import classes from "./FormField.module.css";

type BaseInputOptionalProps = Partial<
  Pick<
    InputProps,
    | "addonAfter"
    | "addonBefore"
    | "allowClear"
    | "maxLength"
    | "prefix"
    | "suffix"
  >
>;

type InputTextAreaOptionalProps = Omit<
  BaseInputOptionalProps,
  "addonAfter" | "addonBefore" | "prefix" | "suffix"
>;

type InputNumberOptionalProps = Partial<
  Pick<InputNumberProps, "max" | "min" | "step">
>;

type InputDateOptionalProps = {
  allowClear?: boolean;
  allowFutureDates?: boolean;
  format?: string;
};

type AutoCompleteOptionalProps = Partial<
  Pick<AutoCompleteProps, "allowClear" | "defaultActiveFirstOption">
>;

type SelectOptionalProps = Partial<
  Pick<SelectProps<string>, "allowClear" | "defaultActiveFirstOption">
>;

type SwitchOptionalProps = Partial<
  Pick<SwitchProps, "checkedChildren" | "unCheckedChildren">
>;

type FormFieldBaseProps = {
  name: string;
} & (
  | (AutoCompleteOptionalProps & {
      options: { label: React.ReactNode; value: string }[];
      type: "autoComplete";
    })
  | (BaseInputOptionalProps & {
      mask: (RegExp | string)[];
      maskPlaceholder?: string | null;
      type: "mask";
    })
  | (BaseInputOptionalProps & { type: "input" })
  | (BaseInputOptionalProps & { type: "password" })
  | (InputDateOptionalProps & { type: "date" })
  | (InputNumberOptionalProps & { type: "number" })
  | (InputTextAreaOptionalProps & { type: "textArea" })
  | (SelectOptionalProps & {
      options: { label: React.ReactNode; value: string }[];
      type: "select";
    })
  | (SwitchOptionalProps & { type: "switch" })
);

type FormFieldOptionalProps = {
  autoFocus?: boolean;
  defaultHelpText?: string;
  disabled?: boolean;
  hidden?: boolean;
  isLoading?: boolean;
  label?: string;
  loadingHelpText?: string;
  notRequired?: boolean;
  placeholder?: string;
  tooltip?: FormItemProps["tooltip"];
};

type FormFieldProps = FormFieldBaseProps & FormFieldOptionalProps;

const defaultProps: Required<
  Record<
    keyof FormFieldOptionalProps,
    FormFieldOptionalProps[keyof FormFieldOptionalProps] | undefined
  >
> = {
  autoFocus: false,
  defaultHelpText: undefined,
  disabled: false,
  hidden: false,
  isLoading: false,
  label: undefined,
  loadingHelpText: undefined,
  notRequired: false,
  placeholder: undefined,
  tooltip: undefined,
};

export function FormField(props: FormFieldProps): JSX.Element {
  const {
    name,
    type,
    autoFocus,
    defaultHelpText,
    disabled: disabledProp,
    hidden,
    isLoading,
    label,
    loadingHelpText,
    notRequired,
    placeholder: placeholderProp,
    tooltip,
  } = props;

  const {
    field: { onChange, onBlur, ...field },
    fieldState: { error, isTouched },
    formState: { isSubmitting },
  } = useController({ name });

  const handleChange = useCallback(
    (
      eventOrValue:
        | Dayjs
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | boolean
        | number
        | string
        | null
    ) => {
      onChange(eventOrValue);
    },
    [onChange]
  );

  const handleBlur = useCallback(() => {
    onBlur();
  }, [onBlur]);

  const handleAutoCompleteFilterOption = useCallback(
    (input: string, option?: { label?: unknown; value?: unknown }) => {
      const compareTo =
        option &&
        (typeof option.label === "string"
          ? option.label
          : typeof option.value === "string"
          ? option.value
          : undefined);

      return (
        compareTo?.toUpperCase().trim().indexOf(input.toUpperCase().trim()) !==
        -1
      );
    },

    []
  );

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
    const verb = isTouchDevice() ? "Toque" : "Clique";
    switch (type) {
      case "input":
      case "password":
      case "textArea":
      case "number":
        return `${verb} para preencher`;
      case "select":
        return `${verb} para selecionar`;
      case "autoComplete":
      case "date":
        return `${verb} para preencher/selecionar`;
      case "mask":
      case "switch":
        return "";
    }
  }, [placeholderProp, type]);

  const disabled = useMemo(
    (): boolean => disabledProp || isLoading || isSubmitting,
    [disabledProp, isLoading, isSubmitting]
  );

  const fieldComponent = useMemo((): React.ReactNode => {
    if (typeof field.value === "string") {
      if (type === "input" || type === "password") {
        const Component = type === "input" ? Input : Input.Password;
        return (
          <Component
            addonAfter={props.addonAfter}
            addonBefore={props.addonBefore}
            allowClear={props.allowClear}
            autoFocus={autoFocus}
            disabled={disabled}
            maxLength={props.maxLength}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder={placeholder}
            prefix={props.prefix}
            suffix={props.suffix}
            value={field.value}
          />
        );
      } else if (type === "textArea") {
        return (
          <Input.TextArea
            allowClear={props.allowClear}
            autoFocus={autoFocus}
            disabled={disabled}
            maxLength={props.maxLength}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder={placeholder}
            value={field.value}
          />
        );
      } else if (type === "mask") {
        return (
          <InputMask
            addonAfter={props.addonAfter || null}
            addonBefore={props.addonBefore || null}
            allowClear={props.allowClear || false}
            autoFocus={autoFocus || false}
            disabled={disabled}
            mask={props.mask}
            maskPlaceholder={props.maskPlaceholder || "_"}
            onBlur={handleBlur}
            onChange={handleChange}
            prefix={props.prefix || null}
            suffix={props.suffix || null}
            value={field.value}
          />
        );
      } else if (type === "select") {
        return (
          <Select
            allowClear={props.allowClear}
            autoFocus={autoFocus}
            disabled={disabled}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder={placeholder}
            value={field.value}
          >
            {props.options.map(({ value, label }) => (
              <Select.Option key={nanoid()} value={value}>
                {label}
              </Select.Option>
            ))}
          </Select>
        );
      } else if (type === "autoComplete") {
        return (
          <AutoComplete
            allowClear={props.allowClear}
            autoFocus={autoFocus}
            defaultActiveFirstOption={props.defaultActiveFirstOption || false}
            disabled={disabled}
            filterOption={handleAutoCompleteFilterOption}
            onBlur={handleBlur}
            onChange={handleChange}
            options={props.options}
            placeholder={placeholder}
            value={field.value}
          />
        );
      }
    } else if (typeof field.value === "number" && type === "number") {
      return (
        <InputNumber
          autoFocus={autoFocus}
          className={classes.InputNumber}
          disabled={disabled}
          max={props.max}
          min={props.min}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder={placeholder}
          step={props.step}
          value={field.value}
        />
      );
    } else if (typeof field.value === "boolean" && type === "switch") {
      return (
        <Switch
          checked={field.value}
          checkedChildren={props.checkedChildren}
          onChange={handleChange}
          unCheckedChildren={props.unCheckedChildren}
        />
      );
    } else if (dayjs.isDayjs(field.value) && type === "date") {
      return (
        <InputDate
          allowClear={props.allowClear || false}
          allowFutureDates={props.allowFutureDates || false}
          autoFocus={autoFocus || false}
          disabled={disabled}
          format={props.format || "DD/MM/YYYY"}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder={placeholder}
          value={field.value}
        />
      );
    }
  }, [
    field.value,
    type,
    handleChange,
    handleBlur,
    handleAutoCompleteFilterOption,
    autoFocus,
    disabled,
    placeholder,
    props,
  ]);

  console.log("RENDER", name, field);

  return (
    <Form.Item
      hasFeedback={true}
      help={helpText}
      hidden={hidden}
      label={label}
      required={!notRequired}
      tooltip={tooltip}
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
      {fieldComponent}
    </Form.Item>
  );
}

FormField.defaultProps = defaultProps;
