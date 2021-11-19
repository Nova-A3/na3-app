import type { AutoCompleteProps as AntdAutoCompleteProps } from "antd";
import { AutoComplete as AntdAutoComplete } from "antd";
import React from "react";

type AutoCompleteOptionBase = { label: React.ReactNode; value: string };

type AutoCompleteOption =
  | AutoCompleteOptionBase
  | { label: React.ReactNode; options: AutoCompleteOptionBase[] };

export type AutoCompleteAsFieldProps = Partial<
  Pick<
    AntdAutoCompleteProps,
    "allowClear" | "autoFocus" | "defaultActiveFirstOption" | "disabled"
  >
> & {
  options: AutoCompleteOption[];
};

type AutoCompleteProps = Required<AutoCompleteAsFieldProps> & {
  id: string;
  onBlur: () => void;
  onChange: (value: string) => void;
  onFilterOptions: (
    input: string,
    option?: { label?: unknown; value?: unknown }
  ) => boolean;
  placeholder: string;
  value: string | undefined;
};

export function AutoComplete({
  id,
  allowClear,
  autoFocus,
  disabled,
  defaultActiveFirstOption,
  onBlur,
  onChange,
  onFilterOptions,
  options,
  placeholder,
  value,
}: AutoCompleteProps): JSX.Element {
  return (
    <AntdAutoComplete
      allowClear={allowClear}
      autoFocus={autoFocus}
      defaultActiveFirstOption={defaultActiveFirstOption || false}
      disabled={disabled}
      filterOption={onFilterOptions}
      id={id}
      onBlur={onBlur}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      value={typeof value === "string" ? value : ""}
    />
  );
}
