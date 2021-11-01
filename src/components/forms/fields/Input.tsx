import { Input as AntdInput } from "antd";
import { useField } from "formik";
import React, { useCallback } from "react";

export type InputNumberProps = {
  min?: number | null;
  max?: number | null;
};

export type InputProps = {
  name: string;
  placeholder?: string;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  allowClear?: boolean;
  autoFocus?: boolean;
  maxLength?: number | null;
  autoCapitalize?: boolean;
  disabled?: boolean;
} & (
  | { type?: "input" | "password" }
  | (InputNumberProps & { type: "decimal" | "integer" })
);

export function Input({
  name,
  type,
  placeholder,
  addonBefore,
  addonAfter,
  prefix,
  suffix,
  allowClear,
  maxLength,
  autoFocus,
  autoCapitalize,
  disabled,
  ...props
}: InputProps): JSX.Element {
  const [field] = useField<string>(name);

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
        ("min" in props &&
          props.min &&
          Number.parseFloat(ev.target.value.replace(",", ".")) <= props.min) ||
        ("max" in props &&
          props.max &&
          Number.parseFloat(ev.target.value.replace(",", ".")) > props.max)
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

      field.onChange(ev);
    },
    [field, type, autoCapitalize, props, maxLength]
  );

  return type === "password" ? (
    <AntdInput.Password
      addonAfter={addonAfter}
      addonBefore={addonBefore}
      allowClear={allowClear}
      autoComplete="off"
      autoFocus={autoFocus}
      disabled={disabled}
      onChange={handleChange}
      placeholder={placeholder}
      prefix={prefix}
      suffix={suffix}
      value={field.value}
    />
  ) : (
    <AntdInput
      addonAfter={addonAfter}
      addonBefore={addonBefore}
      allowClear={allowClear}
      autoComplete="off"
      autoFocus={autoFocus}
      disabled={disabled}
      onChange={handleChange}
      placeholder={placeholder}
      prefix={prefix}
      suffix={suffix}
      value={field.value}
    />
  );
}
