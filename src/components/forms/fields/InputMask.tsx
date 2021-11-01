import useMask from "@ryuuji3/react-mask-hook";
import { Input } from "antd";
import { useField } from "formik";
import React, { useCallback } from "react";
import type { InputProps } from "./Input";

export type InputMaskProps = Omit<
  InputProps,
  "maxLength" | "placeholder" | "type"
> & {
  mask: (RegExp | string)[];
  maskPlaceholder?: string;
};

export function InputMask({
  mask,
  maskPlaceholder,
  name,
  addonBefore,
  addonAfter,
  prefix,
  suffix,
  allowClear,
  autoFocus,
  autoCapitalize,
  disabled,
}: InputMaskProps): JSX.Element {
  const [field] = useField<string>(name);

  const handleChange = useCallback(
    (value: string) => {
      if (autoCapitalize) value = value.toUpperCase();
      field.onChange(field.name)(value);
    },
    [field, autoCapitalize]
  );

  const {
    "data-value": maskDataValue,
    onChange: handleMaskChange,
    onFocus: handleFocus,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
    placeholder,
    value,
  } = useMask({
    mask: mask,
    onChange: handleChange,
    placeholder: maskPlaceholder || "_",
    value: field.value,
  });

  return (
    <Input
      addonAfter={addonAfter}
      addonBefore={addonBefore}
      allowClear={allowClear}
      autoComplete="off"
      autoFocus={autoFocus}
      data-value={maskDataValue}
      disabled={disabled}
      onChange={handleMaskChange}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      placeholder={placeholder}
      prefix={prefix}
      suffix={suffix}
      value={value}
    />
  );
}
