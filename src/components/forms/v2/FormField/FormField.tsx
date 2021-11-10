import type {
  AutoCompleteProps,
  FormItemProps,
  InputProps,
  RadioChangeEvent,
  SelectProps,
  SwitchProps,
} from "antd";
import { AutoComplete, Form, Input, Radio, Select, Switch } from "antd";
import { nanoid } from "nanoid";
import React, { useCallback, useEffect, useMemo } from "react";
import type { UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";

import { isTouchDevice } from "../../../../utils";
import { FieldHelp } from "../components/FieldHelp/FieldHelp";
import { FieldLabel } from "../components/FieldLabel/FieldLabel";
import { FieldPreSuffix } from "../components/FieldPreSuffix/FieldPreSuffix";
import { InputDate } from "../fields/InputDate/InputDate";
import { InputMask } from "../fields/InputMask/InputMask";
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

type FieldValue = boolean | string;

export type FieldStatus = "invalid" | "loading" | "untouched" | "valid";

type InputOptionalProps = Partial<
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
  InputOptionalProps,
  "addonAfter" | "addonBefore" | "prefix" | "suffix"
> & {
  rows?: { max?: number; min?: number };
};

type AutoCompleteOptionalProps = Partial<
  Pick<AutoCompleteProps, "allowClear" | "defaultActiveFirstOption">
>;

type SelectOptionalProps = Partial<
  Pick<SelectProps<string>, "allowClear" | "defaultActiveFirstOption">
>;

type InputNumberOptionalProps = InputOptionalProps & {
  max?: number;
  min?: number;
};

type SwitchOptionalProps = Partial<
  Pick<SwitchProps, "checkedChildren" | "unCheckedChildren">
>;

type InputDateOptionalProps = {
  allowClear?: boolean;
  allowFutureDates?: boolean;
  format?: string;
};

type ValueBasedFieldProps<Type extends FieldType, Value extends FieldValue> = {
  max?: Type extends "number" ? number : never;
  min?: Type extends "number" ? number : never;
  noDecimal?: Type extends "number" ? boolean : never;
  onValueChange?: (value: Value) => void;
};

type FormFieldBaseProps = {
  label: string;
  name: string;
  rules: Exclude<UseControllerProps["rules"], undefined> | null;
} & (
  | (AutoCompleteOptionalProps &
      ValueBasedFieldProps<"autoComplete", string> & {
        options: { label: React.ReactNode; value: string }[];
        type: "autoComplete";
      })
  | (InputDateOptionalProps &
      ValueBasedFieldProps<"date", string> & { type: "date" })
  | (InputNumberOptionalProps &
      ValueBasedFieldProps<"number", string> & { type: "number" })
  | (InputOptionalProps &
      ValueBasedFieldProps<"input", string> & { type: "input" })
  | (InputOptionalProps &
      ValueBasedFieldProps<"mask", string> & {
        mask: (RegExp | string)[];
        maskPlaceholder?: string | null;
        type: "mask";
      })
  | (InputOptionalProps &
      ValueBasedFieldProps<"password", string> & { type: "password" })
  | (InputTextAreaOptionalProps &
      ValueBasedFieldProps<"textArea", string> & { type: "textArea" })
  | (SelectOptionalProps &
      ValueBasedFieldProps<"select", string> & {
        options: { label: React.ReactNode; value: string }[];
        type: "select";
      })
  | (SwitchOptionalProps &
      ValueBasedFieldProps<"switch", boolean> & { type: "switch" })
  | (ValueBasedFieldProps<"radio", string> & {
      options: { label: React.ReactNode; value: string }[];
      type: "radio";
    })
);

type FormFieldOptionalProps = {
  autoFocus?: boolean;
  autoUpperCase?: boolean;
  defaultHelp?: React.ReactNode;
  disabled?: boolean;
  helpWhenLoading?: React.ReactNode;
  hidden?: boolean;
  hideHelpWhenValid?: boolean;
  isLoading?: boolean;
  labelCol?: FormItemProps["labelCol"];
  labelSpan?: number;
  placeholder?: string;
  required?: boolean;
  tooltip?: FormItemProps["tooltip"];
  wrapperCol?: FormItemProps["wrapperCol"];
};

export type FormFieldProps = FormFieldBaseProps & FormFieldOptionalProps;

const defaultProps: FormFieldOptionalProps = {
  autoFocus: false,
  autoUpperCase: false,
  defaultHelp: undefined,
  disabled: false,
  helpWhenLoading: undefined,
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
    required,
    placeholder: placeholderProp,
    tooltip,
    wrapperCol,
    /* Value-based props */
    max,
    min,
    noDecimal,
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

  const status = useMemo((): FieldStatus => {
    if (isLoading) return "loading";
    if (error?.message || invalid) return "invalid";
    if (isTouched && !!value) return "valid";
    return "untouched";
  }, [isLoading, error?.message, invalid, isTouched, value]);

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

      const extractedValue = isInputChangeEvent(eventOrValue)
        ? eventOrValue.target.value
        : eventOrValue;

      if (autoUpperCase) {
        if (
          isInputChangeEvent(eventOrValue) &&
          typeof eventOrValue.target.value === "string"
        ) {
          eventOrValue.target.value = eventOrValue.target.value.toUpperCase();
        } else if (typeof eventOrValue === "string") {
          eventOrValue = eventOrValue.toUpperCase();
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
          isInputChangeEvent(eventOrValue) &&
          ((min &&
            Number.parseFloat(extractedValue.replace(",", ".")) <= min) ||
            (max && Number.parseFloat(extractedValue.replace(",", ".")) > max))
        ) {
          if (/,.?$/.test(extractedValue)) {
            eventOrValue.target.value = extractedValue.slice(
              0,
              extractedValue.indexOf(",")
            );
          } else {
            return;
          }
        }
      }

      onChange(eventOrValue);
    },
    [onChange, type, autoUpperCase, noDecimal, min, max]
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

  useEffect(() => {
    if (
      (isTouched || !!value) &&
      (type === "autoComplete" ||
        type === "select" ||
        type === "radio" ||
        type === "date")
    ) {
      onBlur();
    }
    onValueChange?.(value as never);
  }, [value, type, isTouched, onValueChange, onBlur]);

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
    ]
  );

  const fieldComponent = useMemo((): JSX.Element => {
    switch (type) {
      case "input":
      case "number":
        if (typeof value !== "string")
          throw `[FormField] Expected value to be a string for type="${type}", got "${value.toString()}" instead.`;
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
            value={value}
          />
        );
      case "password":
        if (typeof value !== "string")
          throw `[FormField] Expected value to be a string for type="${type}", got "${value.toString()}" instead.`;
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
            value={value}
          />
        );
      case "textArea":
        if (typeof value !== "string")
          throw `[FormField] Expected value to be a string for type="${type}", got "${value.toString()}" instead.`;
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
            value={value}
          />
        );
      case "mask":
        if (typeof value !== "string")
          throw `[FormField] Expected value to be a string for type="${type}", got "${value.toString()}" instead.`;
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
            value={value}
          />
        );
      case "autoComplete":
        if (typeof value !== "string")
          throw `[FormField] Expected value to be a string for type="${type}", got "${value.toString()}" instead.`;
        return (
          <AutoComplete
            allowClear={props.allowClear}
            autoFocus={autoFocus}
            defaultActiveFirstOption={props.defaultActiveFirstOption || false}
            disabled={disabled}
            filterOption={handleAutoCompleteFilterOption}
            id={name}
            onBlur={handleBlur}
            onChange={handleChange}
            options={props.options}
            placeholder={placeholder}
            value={value}
          />
        );
      case "select":
        if (typeof value !== "string")
          throw `[FormField] Expected value to be a string for type="${type}", got "${value.toString()}" instead.`;
        return (
          <Select<string>
            allowClear={props.allowClear}
            autoFocus={autoFocus}
            disabled={disabled}
            id={name}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder={placeholder}
            value={value || undefined}
          >
            {props.options.map(({ value, label }) => (
              <Select.Option key={nanoid()} value={value}>
                {label}
              </Select.Option>
            ))}
          </Select>
        );
      case "radio":
        if (typeof value !== "string")
          throw `[FormField] Expected value to be a string for type="${type}", got "${value.toString()}" instead.`;
        return (
          <Radio.Group
            className={classes.RadioGroup}
            id={name}
            onChange={handleChange}
            value={value}
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
        if (typeof value !== "string")
          throw `[FormField] Expected value to be a string for type="${type}", got "${value.toString()}" instead.`;
        return (
          <InputDate
            allowClear={props.allowClear || false}
            allowFutureDates={props.allowFutureDates || false}
            autoFocus={autoFocus || false}
            disabled={disabled}
            format={props.format || "DD/MM/YYYY"}
            id={name}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder={placeholder}
            value={value}
          />
        );
    }
  }, [
    name,
    type,
    value,
    handleChange,
    handleBlur,
    handleAutoCompleteFilterOption,
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
