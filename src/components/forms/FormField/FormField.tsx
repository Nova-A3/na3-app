import type {
  FormItemProps,
  InputProps,
  RadioChangeEvent,
  SwitchProps,
} from "antd";
import { Form, Input, Radio, Switch } from "antd";
import { nanoid } from "nanoid";
import React, { useCallback, useEffect, useMemo } from "react";
import type { UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";

import { isArray, isTouchDevice } from "../../../utils";
import { FieldHelp } from "../components/FieldHelp/FieldHelp";
import { FieldLabel } from "../components/FieldLabel/FieldLabel";
import { FieldPreSuffix } from "../components/FieldPreSuffix/FieldPreSuffix";
import type { AutoCompleteAsFieldProps } from "../fields/AutoComplete/AutoComplete";
import { AutoComplete } from "../fields/AutoComplete/AutoComplete";
import type { InputDateAsFieldProps } from "../fields/InputDate/InputDate";
import { InputDate } from "../fields/InputDate/InputDate";
import { InputMask } from "../fields/InputMask/InputMask";
import type { SelectAsFieldProps } from "../fields/Select/Select";
import { Select } from "../fields/Select/Select";
import classes from "./FormField.module.css";

type FieldType =
  | "autoComplete"
  | "date"
  | "input"
  | "mask"
  | "number"
  | "password"
  | "radio"
  | "select"
  | "switch"
  | "textArea";

type FieldValue = string[] | boolean | string;

export type FieldStatus = "invalid" | "loading" | "untouched" | "valid";

type InputBaseOptionalProps = Partial<
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
  InputBaseOptionalProps,
  "addonAfter" | "addonBefore" | "prefix" | "suffix"
> & {
  rows?: { max?: number; min?: number };
};

type InputNumberOptionalProps = InputBaseOptionalProps & {
  max?: number;
  min?: number;
};

type SwitchOptionalProps = Partial<
  Pick<SwitchProps, "checkedChildren" | "unCheckedChildren">
>;

type FormFieldBaseProps<Type extends FieldType, Value extends FieldValue> = {
  autoFocus?: boolean;
  autoUpperCase?: boolean;
  defaultHelp?: React.ReactNode;
  disabled?: boolean;
  helpWhenLoading?: React.ReactNode;
  helpWhenValid?: React.ReactNode | ((value: Value) => React.ReactNode);
  hidden?: boolean;
  hideHelpWhenValid?: boolean;
  isLoading?: boolean;
  labelCol?: FormItemProps["labelCol"];
  labelSpan?: number;
  max?: Type extends "number" ? number : never;
  min?: Type extends "number" ? number : never;
  noDecimal?: Type extends "number" ? boolean : never;
  onValueChange?: (value: Value) => void;
  placeholder?: string;
  required?: boolean;
  sortValues?: Type extends "select" ? (a: string, b: string) => number : never;
  tooltip?: FormItemProps["tooltip"];
  type: Type;
  wrapperCol?: FormItemProps["wrapperCol"];
};

export type FormFieldProps = {
  label: string;
  name: string;
  rules: Exclude<UseControllerProps["rules"], undefined> | null;
} & (
  | (AutoCompleteAsFieldProps & FormFieldBaseProps<"autoComplete", string>)
  | (FormFieldBaseProps<"date", string> & InputDateAsFieldProps)
  | (FormFieldBaseProps<"input", string> & InputBaseOptionalProps)
  | (FormFieldBaseProps<"mask", string> &
      InputBaseOptionalProps & {
        mask: (RegExp | string)[];
        maskPlaceholder?: string | null;
      })
  | (FormFieldBaseProps<"number", string> & InputNumberOptionalProps)
  | (FormFieldBaseProps<"password", string> & InputBaseOptionalProps)
  | (FormFieldBaseProps<"radio", string> & {
      options: { label: React.ReactNode; value: string }[];
    })
  | (FormFieldBaseProps<"select", string[] | string> & SelectAsFieldProps)
  | (FormFieldBaseProps<"switch", boolean> & SwitchOptionalProps)
  | (FormFieldBaseProps<"textArea", string> & InputTextAreaOptionalProps)
);

const defaultProps: Omit<FormFieldBaseProps<FieldType, FieldValue>, "type"> = {
  autoFocus: false,
  autoUpperCase: false,
  defaultHelp: undefined,
  disabled: false,
  helpWhenLoading: undefined,
  helpWhenValid: undefined,
  hidden: false,
  hideHelpWhenValid: false,
  isLoading: false,
  labelCol: undefined,
  labelSpan: undefined,
  placeholder: undefined,
  required: true,
  tooltip: undefined,
  wrapperCol: undefined,
};

export function FormField(props: FormFieldProps): JSX.Element {
  const {
    /* Required props */
    label,
    name: nameProp,
    type,
    rules,
    /* Common optional props */
    autoFocus,
    autoUpperCase,
    defaultHelp,
    disabled: disabledProp,
    hidden,
    hideHelpWhenValid,
    isLoading,
    labelCol,
    labelSpan,
    helpWhenLoading,
    helpWhenValid,
    required,
    placeholder: placeholderProp,
    tooltip,
    wrapperCol,
    /* Type-based props */
    // number
    max,
    min,
    noDecimal,
    // select
    sortValues,
    /* Value-based props */
    onValueChange,
  } = props;

  const {
    field: { name, onChange, onBlur, ...field },
    fieldState: { error, isTouched, invalid },
    formState: { isSubmitting },
  } = useController({
    name: nameProp,
    rules: rules
      ? {
          required: required && (rules.required || "Campo obrigatório"),
          ...rules,
        }
      : undefined,
    shouldUnregister: true,
  });

  const value = useMemo(
    (): FieldValue => field.value as FieldValue,
    [field.value]
  );

  const hasValue = useMemo(
    () => (isArray(value) ? !!value[0] : !!value),
    [value]
  );

  const status = useMemo((): FieldStatus => {
    if (isLoading) return "loading";
    if (error?.message || invalid) return "invalid";
    if (isTouched && hasValue) return "valid";
    return "untouched";
  }, [isLoading, error?.message, invalid, isTouched, hasValue]);

  const handleChange = useCallback(
    (
      eventOrValue:
        | FieldValue
        | RadioChangeEvent
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | null
        | undefined
    ) => {
      function isInputChangeEvent(
        param: unknown
      ): param is React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> {
        return typeof param === "object" && param !== null && "target" in param;
      }

      let extractedValue = isInputChangeEvent(eventOrValue)
        ? eventOrValue.target.value
        : eventOrValue;

      if (autoUpperCase) {
        if (typeof extractedValue === "string") {
          extractedValue = extractedValue.toUpperCase();
        } else if (isArray(extractedValue)) {
          extractedValue = extractedValue.map((v) => v.toUpperCase());
        }
      }

      if (type === "number" && typeof extractedValue === "string") {
        if (
          (noDecimal && !/^\d*$/.test(extractedValue)) ||
          !/^\d*(?:,\d*)?$/.test(extractedValue)
        ) {
          return;
        }

        if (
          (min && Number.parseFloat(extractedValue.replace(",", ".")) <= min) ||
          (max && Number.parseFloat(extractedValue.replace(",", ".")) > max)
        ) {
          if (/,.?$/.test(extractedValue)) {
            extractedValue = extractedValue.slice(
              0,
              extractedValue.indexOf(",")
            );
          } else {
            return;
          }
        }
      }

      if (isArray(extractedValue) && sortValues) {
        extractedValue = [...extractedValue].sort((a, b) => sortValues(a, b));
      }

      onChange(extractedValue);
    },
    [onChange, type, autoUpperCase, noDecimal, min, max, sortValues]
  );

  const handleBlur = useCallback(() => {
    onBlur();
  }, [onBlur]);

  const handleFilterSelectOptions = useCallback(
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

  useEffect(() => {
    if (
      (isTouched || hasValue) &&
      (type === "autoComplete" ||
        type === "select" ||
        type === "radio" ||
        type === "date")
    ) {
      handleBlur();
    }
    onValueChange?.(value as never);
  }, [value, type, isTouched, hasValue, onValueChange, handleBlur]);

  const placeholder = useMemo((): string => {
    if (placeholderProp) return placeholderProp;
    else {
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
        case "radio":
        case "switch":
          return "";
      }
    }
  }, [placeholderProp, type]);

  const disabled = useMemo(
    (): boolean => disabledProp || isLoading || isSubmitting,
    [disabledProp, isLoading, isSubmitting]
  );

  const labelComponent = useMemo(
    (): JSX.Element => <FieldLabel isOptional={!required} text={label} />,
    [required, label]
  );

  const helpComponent = useMemo(
    (): JSX.Element => (
      <FieldHelp
        contentWhenLoading={helpWhenLoading}
        contentWhenValid={
          typeof helpWhenValid === "function"
            ? (helpWhenValid(value as never) as React.ReactNode)
            : helpWhenValid
        }
        defaultContent={defaultHelp}
        error={error?.message}
        fieldStatus={status}
        isFormSubmitting={isSubmitting}
        isHidden={status === "valid" ? !!hideHelpWhenValid : false}
      />
    ),
    [
      defaultHelp,
      error?.message,
      status,
      isSubmitting,
      hideHelpWhenValid,
      helpWhenLoading,
      helpWhenValid,
      value,
    ]
  );

  const fieldComponent = useMemo((): JSX.Element => {
    switch (type) {
      case "input":
      case "number":
        return (
          <Input
            addonAfter={props.addonAfter}
            addonBefore={props.addonBefore}
            allowClear={props.allowClear}
            autoFocus={autoFocus}
            disabled={disabled}
            id={name}
            maxLength={props.maxLength}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder={placeholder}
            prefix={<FieldPreSuffix>{props.prefix}</FieldPreSuffix>}
            suffix={<FieldPreSuffix>{props.suffix}</FieldPreSuffix>}
            value={typeof value === "string" ? value : ""}
          />
        );
      case "password":
        return (
          <Input.Password
            addonAfter={props.addonAfter}
            addonBefore={props.addonBefore}
            allowClear={props.allowClear}
            autoFocus={autoFocus}
            disabled={disabled}
            id={name}
            maxLength={props.maxLength}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder={placeholder}
            prefix={<FieldPreSuffix>{props.prefix}</FieldPreSuffix>}
            suffix={<FieldPreSuffix>{props.suffix}</FieldPreSuffix>}
            value={typeof value === "string" ? value : ""}
          />
        );
      case "textArea":
        return (
          <Input.TextArea
            allowClear={props.allowClear}
            autoFocus={autoFocus}
            autoSize={{
              maxRows: props.rows?.max,
              minRows: props.rows?.min || 3,
            }}
            disabled={disabled}
            id={name}
            maxLength={props.maxLength}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder={placeholder}
            value={typeof value === "string" ? value : ""}
          />
        );
      case "mask":
        return (
          <InputMask
            addonAfter={props.addonAfter || null}
            addonBefore={props.addonBefore || null}
            allowClear={props.allowClear || false}
            autoFocus={autoFocus || false}
            disabled={disabled}
            id={name}
            mask={props.mask}
            maskPlaceholder={props.maskPlaceholder || "_"}
            onBlur={handleBlur}
            onChange={handleChange}
            prefix={<FieldPreSuffix>{props.prefix}</FieldPreSuffix>}
            suffix={<FieldPreSuffix>{props.suffix}</FieldPreSuffix>}
            value={typeof value === "string" ? value : ""}
          />
        );
      case "autoComplete":
        return (
          <AutoComplete
            allowClear={props.allowClear ?? true}
            autoFocus={autoFocus || false}
            defaultActiveFirstOption={props.defaultActiveFirstOption || false}
            disabled={disabled}
            id={name}
            onBlur={handleBlur}
            onChange={handleChange}
            onFilterOptions={handleFilterSelectOptions}
            options={props.options}
            placeholder={placeholder}
            value={typeof value === "string" ? value : ""}
          />
        );
      case "select":
        return (
          <Select
            allowClear={props.allowClear ?? true}
            autoFocus={autoFocus || false}
            defaultActiveFirstOption={props.defaultActiveFirstOption ?? true}
            disabled={disabled}
            id={name}
            multiple={props.multiple || false}
            onBlur={handleBlur}
            onChange={handleChange}
            onFilterOptions={handleFilterSelectOptions}
            onTagProps={props.onTagProps || null}
            options={props.options}
            placeholder={placeholder}
            showSearch={props.showSearch || false}
            value={(value !== true && value) || undefined}
          />
        );
      case "radio":
        return (
          <Radio.Group
            className={classes.RadioGroup}
            id={name}
            onChange={handleChange}
            value={typeof value === "string" ? value : ""}
          >
            {props.options.map(({ value, label }) => (
              <Radio.Button
                key={nanoid()}
                style={{ width: `${100 / props.options.length}%` }}
                value={value}
              >
                {label}
              </Radio.Button>
            ))}
          </Radio.Group>
        );
      case "switch":
        return (
          <div className={classes.SwitchContainer}>
            <Switch
              checked={!!value}
              checkedChildren={props.checkedChildren}
              disabled={disabled}
              onChange={handleChange}
              unCheckedChildren={props.unCheckedChildren}
            />
          </div>
        );
      case "date":
        return (
          <InputDate
            allowClear={props.allowClear || false}
            autoFocus={autoFocus || false}
            disabled={disabled}
            disallowFutureDates={props.disallowFutureDates || false}
            disallowPastDates={props.disallowPastDates || false}
            format={props.format || "DD/MM/YYYY"}
            id={name}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder={placeholder}
            value={typeof value === "string" ? value : ""}
          />
        );
    }
  }, [
    name,
    type,
    value,
    handleChange,
    handleBlur,
    handleFilterSelectOptions,
    autoFocus,
    disabled,
    placeholder,
    props,
  ]);

  return (
    <Form.Item
      colon={false}
      hasFeedback={true}
      help={helpComponent}
      hidden={hidden}
      htmlFor={name}
      label={labelComponent}
      labelAlign="left"
      labelCol={labelCol || (labelSpan && { span: labelSpan }) || { span: 24 }}
      required={required}
      tooltip={tooltip}
      validateStatus={
        status === "loading"
          ? "validating"
          : status === "invalid"
          ? "error"
          : status === "valid"
          ? "success"
          : undefined
      }
      wrapperCol={
        wrapperCol || (labelSpan && { span: 24 - labelSpan }) || { span: 24 }
      }
    >
      {fieldComponent}
    </Form.Item>
  );
}

FormField.defaultProps = defaultProps;
