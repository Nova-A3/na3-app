import useMask from "@ryuuji3/react-mask-hook";
import { Input } from "antd";
import React from "react";

import type { InputOptionalProps } from "./Input";

type InputMaskRequiredProps = {
  mask: (RegExp | string)[];
  name: string;
  onBlur: (ev: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (value: string) => void;
  value: string;
};

export type InputMaskOptionalProps = Partial<
  InputOptionalProps & {
    maskPlaceholder?: string | null;
  }
>;

export type InputMaskProps = InputMaskRequiredProps &
  Omit<
    InputMaskOptionalProps,
    "autoCapitalize" | "max" | "min" | "placeholder"
  >;

export function InputMask({
  mask,
  name,
  onBlur,
  onChange,
  value: valueProp,
  /* Optionals */
  maskPlaceholder,
  /* Input-inherited optionals */
  addonAfter,
  addonBefore,
  allowClear,
  autoFocus,
  disabled,
  maxLength,
  prefix,
  suffix,
}: InputMaskProps): JSX.Element {
  const {
    "data-value": dataValue,
    onChange: handleChange,
    onFocus: handleFocus,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
    placeholder,
    value,
  } = useMask({
    mask,
    onChange,
    placeholder: maskPlaceholder || "_",
    value: valueProp,
  });

  return (
    <Input
      addonAfter={addonAfter}
      addonBefore={addonBefore}
      allowClear={allowClear}
      autoComplete="off"
      autoFocus={autoFocus}
      data-value={dataValue}
      disabled={disabled}
      maxLength={maxLength}
      name={name}
      onBlur={onBlur}
      onChange={handleChange}
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
