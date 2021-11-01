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
  maskPlaceholder?: string | null;
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
  const [
    { onBlur: handleFieldBlur, onChange: handleFieldChange, value: fieldValue },
  ] = useField<string>(name);

  const handleChange = useCallback(
    (value: string) => {
      if (autoCapitalize) value = value.toUpperCase();
      handleFieldChange(name)(value);
    },
    [name, autoCapitalize, handleFieldChange]
  );

  const {
    "data-value": maskDataValue,
    onChange: handleMaskChange,
    onFocus: hadleMaskFocus,
    onKeyDown: handleMaskKeyDown,
    onKeyUp: handleMaskKeyUp,
    placeholder,
    value,
  } = useMask({
    mask: mask,
    onChange: handleChange,
    placeholder: maskPlaceholder || "_",
    value: fieldValue,
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
      name={name}
      onBlur={handleFieldBlur}
      onChange={handleMaskChange}
      onFocus={hadleMaskFocus}
      onKeyDown={handleMaskKeyDown}
      onKeyUp={handleMaskKeyUp}
      placeholder={placeholder}
      prefix={prefix}
      suffix={suffix}
      value={value}
    />
  );
}
