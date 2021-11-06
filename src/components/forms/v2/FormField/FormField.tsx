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
import { Control, useController, UseControllerProps } from "react-hook-form";

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
> & {
  noDecimal?: boolean;
};

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
  rules: UseControllerProps["rules"];
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
  labelCol?: FormItemProps["labelCol"];
  wrapperCol?: FormItemProps["wrapperCol"];
  autoUpperCase?: boolean;
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
  labelCol: undefined,
  wrapperCol: undefined,
  autoUpperCase: false,
};

export function FormField(props: FormFieldProps): JSX.Element {
  const {
    name,
    type,
    rules,
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
    labelCol,
    wrapperCol,
    autoUpperCase,
  } = props;

  const {
    field: { onChange, onBlur, ...field },
    fieldState: { error, isTouched, invalid, isDirty },
    formState: { isSubmitting, ...formState },
  } = useController({ name, rules, shouldUnregister: true });

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
      function isEvent(
        param: unknown
      ): param is React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> {
        return typeof param === "object" && param !== null && "target" in param;
      }

      const extractedValue = isEvent(eventOrValue)
        ? eventOrValue.target.value
        : eventOrValue;

      if (autoUpperCase) {
        if (
          isEvent(eventOrValue) &&
          typeof eventOrValue.target.value === "string"
        ) {
          eventOrValue.target.value = eventOrValue.target.value.toUpperCase();
        } else if (typeof eventOrValue === "string") {
          eventOrValue = eventOrValue.toUpperCase();
        }
      }

      if (type === "number" && typeof extractedValue === "string") {
        if (
          ("noDecimal" in props &&
            !!props.noDecimal &&
            !/^\d*$/.test(extractedValue)) ||
          !/^\d*(?:,\d*)?$/.test(extractedValue)
        ) {
          return;
        }
      }

      onChange(eventOrValue || null);
    },
    [onChange, autoUpperCase]
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
        isDirty={isDirty}
        defaultText={defaultHelpText}
        error={error?.message}
        isLoading={!!isLoading}
        isTouched={isTouched}
        loadingText={loadingHelpText}
        isInvalid={invalid}
      />
    ),
    [
      defaultHelpText,
      error?.message,
      isLoading,
      isDirty,
      isTouched,
      loadingHelpText,
      invalid,
    ]
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
    if (type === "input" || type === "password") {
      if (!(typeof field.value === "string")) return null;
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
    }
    switch (type) {
      case "textArea":
        if (!(typeof field.value === "string")) return null;
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
      case "mask":
        if (!(typeof field.value === "string")) return null;
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
      case "select":
        if (!(typeof field.value === "string" || field.value === undefined))
          return null;
        return (
          <Select<string>
            allowClear={props.allowClear}
            autoFocus={autoFocus}
            disabled={disabled}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder={placeholder}
            value={(field.value as string) || undefined}
          >
            {props.options.map(({ value, label }) => (
              <Select.Option key={nanoid()} value={value}>
                {label}
              </Select.Option>
            ))}
          </Select>
        );
      case "autoComplete":
        if (!(typeof field.value === "string" || field.value === undefined))
          return null;
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
            value={(field.value as string) || undefined}
          />
        );
      case "number":
        if (!(typeof field.value === "number")) return null;
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
      case "switch":
        if (!(typeof field.value === "boolean")) return null;
        return (
          <Switch
            checked={field.value}
            checkedChildren={props.checkedChildren}
            onChange={handleChange}
            unCheckedChildren={props.unCheckedChildren}
          />
        );
      case "date":
        if (!dayjs.isDayjs(field.value)) return null;
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
          : isTouched && isDirty
          ? error || invalid
            ? "error"
            : "success"
          : undefined
      }
      labelCol={labelCol || { span: 24 }}
      wrapperCol={wrapperCol || { span: 24 }}
      labelAlign="left"
      colon={false}
    >
      {fieldComponent}
    </Form.Item>
  );
}

FormField.defaultProps = defaultProps;
