import { AutoComplete, Form, Select, Typography } from "antd";
import type { LabelTooltipType } from "antd/lib/form/FormItemLabel";
import { useField } from "formik";
import { nanoid } from "nanoid";
import React, { useCallback, useEffect, useMemo } from "react";

import { isTouchDevice } from "../../utils";
import type { InputNumberProps, InputProps } from "./fields/Input";
import { Input } from "./fields/Input";
import type { InputMaskProps } from "./fields/InputMask";
import { InputMask } from "./fields/InputMask";
import classes from "./FormItem.module.css";

type FormItemProps = {
  name: string;
  label: string;
  placeholder?: string;
  tooltip?: LabelTooltipType;
  /**
   * Defines a top-level help text. Takes precedence over both the field's generated error message *and* its `helpDefault` prop.
   *
   * ```
   * help > error > helpDefault
   * ```
   */
  help?: React.ReactNode;
  /**
   * Defines a bottom-level help text. Appears only when no error message nor the `help` prop could be rendered.
   *
   * ```
   * help > error > helpDefault
   * ```
   */
  helpDefault?: React.ReactNode;
  loading?: boolean;
  onValueChange?: (value: string) => void;
  autoCapitalize?: boolean;
  disabled?: boolean;
  noFeedback?: boolean;
  notRequired?: boolean;
} & (
  | {
      type: "autoComplete" | "select";
      options: { value: string; label: React.ReactNode }[];
    }
  | (InputNumberProps &
      Omit<InputProps, "name" | "placeholder" | "type"> & {
        type: "decimal" | "integer";
      })
  | (Omit<InputMaskProps, "name"> & {
      type: "mask";
      mask: (RegExp | string)[];
      maskPlaceholder?: string;
    })
  | (Omit<InputProps, "name" | "placeholder" | "type"> & {
      type: "input" | "password";
    })
);

const defaultProps: Omit<FormItemProps, "label" | "name" | "type"> = {
  autoCapitalize: false,
  disabled: false,
  help: undefined,
  helpDefault: undefined,
  loading: false,
  noFeedback: false,
  notRequired: false,
  onValueChange: undefined,
  placeholder: "",
  tooltip: null,
};

export function FormItem({
  type,
  name,
  label,
  placeholder: placeholderProperty,
  tooltip,
  help,
  helpDefault,
  loading,
  onValueChange,
  autoCapitalize,
  disabled,
  noFeedback,
  notRequired,
  ...props
}: FormItemProps): JSX.Element {
  const [field, meta] = useField<string>(name);

  const handleChange = useCallback(
    (value: string) => {
      field.onChange(field.name)(autoCapitalize ? value.toUpperCase() : value);
    },
    [field, autoCapitalize]
  );

  const handleBlur = useCallback(
    (ev: React.FocusEvent) => {
      field.onBlur(field.name)(ev);
    },
    [field]
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
      placeholderProperty ||
      (type === "integer"
        ? "Somente dígitos"
        : type === "decimal"
        ? "Somente decimal"
        : `${isTouchDevice() ? "Toque" : "Clique"} para ${
            type === "select" || type === "autoComplete"
              ? "selecionar"
              : "preencher"
          }`),
    [type, placeholderProperty]
  );

  const hasFeedback = useMemo(
    () => !(disabled || noFeedback),
    [disabled, noFeedback]
  );

  useEffect(() => {
    onValueChange?.(field.value);
  }, [field.value, onValueChange]);

  process.env.NODE_ENV === "development" && console.log(name, field);

  return (
    <Form.Item
      hasFeedback={hasFeedback}
      help={help || (hasFeedback && meta.touched && meta.error) || helpDefault}
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
    >
      {type === "input" ||
      type === "password" ||
      type === "integer" ||
      type === "decimal" ? (
        <Input
          addonAfter={"addonAfter" in props && props.addonAfter}
          addonBefore={"addonBefore" in props && props.addonBefore}
          allowClear={"allowClear" in props && props.allowClear}
          autoCapitalize={autoCapitalize}
          autoFocus={"autoFocus" in props && props.autoFocus}
          disabled={disabled}
          max={"max" in props ? props.max : null}
          maxLength={"maxLength" in props ? props.maxLength : null}
          min={"min" in props ? props.min : null}
          name={name}
          placeholder={placeholder}
          prefix={"prefix" in props && props.prefix}
          suffix={"suffix" in props && props.suffix}
          type={type}
        />
      ) : type === "mask" ? (
        <InputMask
          addonAfter={"addonAfter" in props && props.addonAfter}
          addonBefore={"addonBefore" in props && props.addonBefore}
          allowClear={"allowClear" in props && props.allowClear}
          autoCapitalize={autoCapitalize}
          autoFocus={"autoFocus" in props && props.autoFocus}
          disabled={disabled}
          mask={"mask" in props ? props.mask : []}
          maskPlaceholder={
            "maskPlaceholder" in props ? props.maskPlaceholder : null
          }
          name={name}
          prefix={"prefix" in props && props.prefix}
          suffix={"suffix" in props && props.suffix}
        />
      ) : type === "select" ? (
        <Select<string>
          disabled={disabled}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder={placeholder}
          value={field.value || undefined}
        >
          {"options" in props &&
            props.options.map(({ value, label }) => (
              <Select.Option key={nanoid()} value={value}>
                {label}
              </Select.Option>
            ))}
        </Select>
      ) : (
        <AutoComplete
          defaultActiveFirstOption={false}
          disabled={disabled}
          filterOption={handleAutoCompleteFilterOption}
          onBlur={handleBlur}
          onChange={handleChange}
          options={"options" in props ? props.options : undefined}
          placeholder={placeholder}
          value={field.value}
        />
      )}
    </Form.Item>
  );
}

FormItem.defaultProps = defaultProps;
