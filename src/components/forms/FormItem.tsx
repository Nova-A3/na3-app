import type { SwitchProps } from "antd";
import { AutoComplete, Form, Radio, Select, Switch, Typography } from "antd";
import type { LabelTooltipType } from "antd/lib/form/FormItemLabel";
import type { FieldHelperProps, FieldInputProps, FieldMetaProps } from "formik";
import { useField } from "formik";
import { nanoid } from "nanoid";
import React, { useCallback, useEffect, useMemo } from "react";

import { isTouchDevice } from "../../utils";
import type { InputFieldType, InputOptionalProps } from "./fields/Input";
import { Input } from "./fields/Input";
import type { InputDateOptionalProps } from "./fields/InputDate";
import { InputDate } from "./fields/InputDate";
import { InputMask } from "./fields/InputMask";
import classes from "./FormItem.module.css";

type OptionsFieldType = "autoComplete" | "radio" | "select";

type FieldType = InputFieldType | OptionsFieldType | "date" | "mask" | "switch";

type FieldValue<T extends FieldType> = T extends "switch" ? boolean : string;

type FormItemBaseProps<T extends FieldType> = {
  autoCapitalize?: boolean;
  disabled?: boolean;
  /* help > error > helpDefault */
  help?: React.ReactNode;
  helpDefault?: React.ReactNode;
  hidden?: boolean;
  /* Required */
  label: string;
  labelSpan?: number;
  loading?: boolean;
  /* Required */
  name: string;
  noFeedback?: boolean;
  notRequired?: boolean;
  onValueChange?: (
    value: FieldValue<T>,
    field: [
      FieldInputProps<FieldValue<T>>,
      FieldMetaProps<FieldValue<T>>,
      FieldHelperProps<FieldValue<T>>
    ]
  ) => void;
  placeholder?: string;
  tooltip?: LabelTooltipType;
  /* Required */
  type: T;
} & {
  mask?: T extends "mask" ? (RegExp | string)[] : never;
  maskPlaceholder?: T extends "mask" ? string : never;
} & {
  options?: T extends OptionsFieldType
    ? { label: React.ReactNode; value: string }[]
    : never;
};

type PropsComposedWithBaseInput<T extends FieldType> = FormItemBaseProps<T> &
  (T extends InputFieldType
    ? InputOptionalProps<T>
    : Omit<
        Record<keyof InputOptionalProps, never>,
        keyof FormItemBaseProps<T>
      >);

type PropsComposedWithInputDate<T extends FieldType> =
  PropsComposedWithBaseInput<T> &
    (T extends "date"
      ? InputDateOptionalProps
      : Omit<
          Record<keyof InputDateOptionalProps, never>,
          keyof PropsComposedWithBaseInput<T>
        >);

type PropsComposedWithInputSwitch<T extends FieldType> =
  PropsComposedWithInputDate<T> &
    (T extends "switch"
      ? Partial<SwitchProps>
      : Omit<
          Record<keyof Partial<SwitchProps>, never>,
          keyof PropsComposedWithInputDate<T>
        >);

type FormItemProps<T extends FieldType> = PropsComposedWithInputSwitch<T>;

const defaultProps: Omit<
  FormItemProps<FieldType>,
  "label" | "name" | "type"
> = {
  autoCapitalize: undefined,
  disabled: undefined,
  help: undefined,
  helpDefault: undefined,
  hidden: false,
  labelSpan: undefined,
  loading: undefined,
  mask: undefined,
  maskPlaceholder: undefined,
  noFeedback: undefined,
  notRequired: undefined,
  onValueChange: undefined,
  options: undefined,
  placeholder: undefined,
  tooltip: undefined,
};

export function FormItem<T extends FieldType>({
  label,
  name,
  type,
  /* Own optionals */
  autoCapitalize,
  disabled,
  help,
  helpDefault,
  loading,
  noFeedback,
  notRequired,
  onValueChange,
  placeholder: placeholderProp,
  tooltip,
  hidden,
  labelSpan,
  /* InputMask required props */
  mask,
  /* InputMask optionals */
  maskPlaceholder,
  /* Select/AutoComplete required props */
  options,
  /* Base Input optionals */
  addonAfter,
  addonBefore,
  allowClear,
  autoFocus,
  maxLength,
  prefix,
  suffix,
  /* InputNumber optionals */
  max,
  min,
  /* InputDate optionals */
  allowFutureDates,
  format,
}: FormItemProps<T>): JSX.Element {
  const [{ value, onChange, onBlur, ...fieldProps }, meta, helpers] =
    useField<FieldValue<T>>(name);

  const handleChange = useCallback(
    (value: string) => {
      onChange(name)(autoCapitalize ? value.toUpperCase() : value);
    },
    [onChange, name, autoCapitalize]
  );

  const handleBlur = useCallback(
    (ev: React.FocusEvent) => {
      onBlur(name)(ev);
    },
    [onBlur, name]
  );

  const handleSwitchChange = useCallback(
    (checked: boolean) => {
      helpers.setValue(checked as FieldValue<T>);
    },
    [helpers]
  );

  const handleAutoCompleteFilterOption: Exclude<
    React.ComponentProps<typeof AutoComplete>["filterOption"],
    boolean | undefined
  > = useCallback(
    (input, option) => {
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

  const placeholder = useMemo(
    () =>
      placeholderProp ||
      (type === "integer"
        ? "Somente dígitos"
        : type === "decimal"
        ? "Somente decimal"
        : `${isTouchDevice() ? "Toque" : "Clique"} para ${
            type === "select"
              ? "selecionar"
              : type === "autoComplete"
              ? "preencher/selecionar"
              : "preencher"
          }`),
    [type, placeholderProp]
  );

  const hasFeedback = useMemo(
    () => !(disabled || noFeedback),
    [disabled, noFeedback]
  );

  useEffect(() => {
    onValueChange?.(value, [
      { onBlur, onChange, value, ...fieldProps },
      meta,
      helpers,
    ]);
  }, [onValueChange, value, onBlur, onChange, fieldProps, meta, helpers]);

  // process.env.NODE_ENV === "development" && console.log(name, field);

  let field: JSX.Element | null = null;

  switch (type) {
    case "date":
      field = (
        <InputDate
          allowClear={allowClear}
          allowFutureDates={allowFutureDates}
          disabled={disabled}
          format={format}
          name={name}
          onBlur={onBlur}
          onChange={handleChange}
          value={value.toString()}
        />
      );
      break;
    case "input":
    case "password":
    case "integer":
    case "decimal":
    case "textArea":
      field = (
        <Input
          addonAfter={addonAfter}
          addonBefore={addonBefore}
          allowClear={allowClear}
          autoCapitalize={autoCapitalize}
          autoFocus={autoFocus}
          disabled={disabled}
          max={max}
          maxLength={maxLength}
          min={min}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={placeholder}
          prefix={prefix}
          suffix={suffix}
          type={type}
          value={value.toString()}
        />
      );
      break;
    case "mask":
      if (!mask) {
        throw new Error("You must specify a valid mask for masked inputs.");
      }
      field = (
        <InputMask
          addonAfter={addonAfter}
          addonBefore={addonBefore}
          allowClear={allowClear}
          autoFocus={autoFocus}
          disabled={disabled}
          mask={mask}
          maskPlaceholder={maskPlaceholder}
          name={name}
          onBlur={handleBlur}
          onChange={handleChange}
          prefix={prefix}
          suffix={suffix}
          value={value.toString()}
        />
      );
      break;
    case "select":
      if (!options) {
        throw new Error(
          "You must specify a valid set of options for select inputs."
        );
      }
      field = (
        <Select<string>
          disabled={disabled}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder={placeholder}
          value={value.toString() || undefined}
        >
          {options.map(({ value, label }) => (
            <Select.Option key={nanoid()} value={value}>
              {label}
            </Select.Option>
          ))}
        </Select>
      );
      break;
    case "autoComplete":
      if (!options) {
        throw new Error(
          "You must specify a valid set of options for autoComplete inputs."
        );
      }
      field = (
        <AutoComplete
          defaultActiveFirstOption={false}
          disabled={disabled}
          filterOption={handleAutoCompleteFilterOption}
          onBlur={handleBlur}
          onChange={handleChange}
          options={options}
          placeholder={placeholder}
          value={value.toString()}
        />
      );
      break;
    case "radio":
      if (!options) {
        throw new Error(
          "You must specify a valid set of options for radio inputs."
        );
      }
      field = (
        <Radio.Group
          className={classes.RadioGroup}
          onChange={onChange}
          value={value}
        >
          {options.map(({ value, label }) => (
            <Radio.Button
              key={nanoid()}
              style={{ width: `${100 / options.length}%` }}
              value={value}
            >
              {label}
            </Radio.Button>
          ))}
        </Radio.Group>
      );
      break;
    case "switch":
      field = (
        <div className={classes.SwitchContainer}>
          <Switch
            checked={!!value}
            disabled={disabled}
            onChange={handleSwitchChange}
          />
        </div>
      );
  }

  return (
    <Form.Item
      hasFeedback={hasFeedback}
      help={help || (hasFeedback && meta.touched && meta.error) || helpDefault}
      hidden={hidden}
      label={
        notRequired ? (
          <>
            {label}{" "}
            <small className={classes.OptionalFieldLabelSuffix}>
              <Typography.Text italic={true} type="secondary">
                (opcional)
              </Typography.Text>
            </small>
          </>
        ) : (
          label
        )
      }
      labelCol={{ span: labelSpan || 24 }}
      required={!notRequired}
      tooltip={tooltip}
      validateStatus={
        hasFeedback && loading
          ? "validating"
          : meta.touched
          ? meta.error
            ? "error"
            : "success"
          : undefined
      }
      wrapperCol={{ span: 24 - (labelSpan || 0) }}
    >
      {field}
    </Form.Item>
  );
}

FormItem.defaultProps = defaultProps;
