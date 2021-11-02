import type { InputProps as AntdInputProps } from "antd";
import { Input as AntdInput, Typography } from "antd";
import React, { useCallback, useMemo } from "react";

export type InputFieldType = "decimal" | "input" | "integer" | "password";

type InputRequiredProps<T extends InputFieldType> = {
  name: string;
  onBlur: (ev: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  type: T;
  value: string;
};

export type InputOptionalProps<T extends InputFieldType = InputFieldType> =
  Partial<
    Pick<
      Omit<AntdInputProps, keyof InputRequiredProps<T>>,
      | "addonAfter"
      | "addonBefore"
      | "allowClear"
      | "autoFocus"
      | "disabled"
      | "maxLength"
      | "placeholder"
      | "prefix"
      | "suffix"
    > & {
      autoCapitalize?: boolean;
      max?: T extends "decimal" | "integer" ? number : never;
      min?: T extends "decimal" | "integer" ? number : never;
    }
  >;

export type InputProps<T extends InputFieldType = InputFieldType> =
  InputOptionalProps<T> & InputRequiredProps<T>;

export function Input<T extends InputFieldType>({
  name,
  onBlur,
  onChange,
  type,
  value,
  /* Inherited optionals */
  addonAfter,
  addonBefore,
  allowClear,
  autoFocus,
  disabled,
  maxLength,
  placeholder,
  prefix,
  suffix,
  /* Custom-defined optionals */
  autoCapitalize,
  /* InputNumber optionals */
  max,
  min,
}: InputProps<T>): JSX.Element {
  const handleChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      if (maxLength && ev.target.value.length > maxLength) return;

      if (
        (type === "integer" && !/^\d*$/.test(ev.target.value)) ||
        (type === "decimal" && !/^\d*(?:,\d*)?$/.test(ev.target.value))
      ) {
        return;
      }

      if (
        (min && Number.parseFloat(ev.target.value.replace(",", ".")) <= min) ||
        (max && Number.parseFloat(ev.target.value.replace(",", ".")) > max)
      ) {
        if (/,.?$/.test(ev.target.value)) {
          ev.target.value = ev.target.value.slice(
            0,
            ev.target.value.indexOf(",")
          );
        } else {
          return;
        }
      }

      if (autoCapitalize) {
        ev.target.value = ev.target.value.toUpperCase();
      }

      onChange(ev);
    },
    [onChange, type, autoCapitalize, min, max, maxLength]
  );

  const formatPreOrSuffix = useCallback(
    (preOrSuffix?: React.ReactNode): React.ReactNode => {
      if (typeof preOrSuffix === "string") {
        return (
          <Typography.Text italic={true} type="secondary">
            {preOrSuffix}
          </Typography.Text>
        );
      }
      return preOrSuffix;
    },
    []
  );

  const formattedPrefix = useMemo(
    () => formatPreOrSuffix(prefix),
    [formatPreOrSuffix, prefix]
  );

  const formattedSuffix = useMemo(
    () => formatPreOrSuffix(suffix),
    [formatPreOrSuffix, suffix]
  );

  const InputComponent = useMemo(
    () => (type === "password" ? AntdInput.Password : AntdInput),
    [type]
  );

  return (
    <InputComponent
      addonAfter={addonAfter}
      addonBefore={addonBefore}
      allowClear={allowClear}
      autoComplete="off"
      autoFocus={autoFocus}
      disabled={disabled}
      maxLength={maxLength}
      name={name}
      onBlur={onBlur}
      onChange={handleChange}
      placeholder={placeholder}
      prefix={formattedPrefix}
      suffix={formattedSuffix}
      value={value}
    />
  );
}
