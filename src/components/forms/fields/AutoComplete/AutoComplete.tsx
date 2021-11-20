import type { AutoCompleteProps as AntdAutoCompleteProps } from "antd";
import { AutoComplete as AntdAutoComplete } from "antd";
import { nanoid } from "nanoid";
import React from "react";

export type AutoCompleteOptionBase = {
  disabled?: boolean;
  label: React.ReactNode;
  value: string;
};

type AutoCompleteOptionGroup = {
  label: React.ReactNode;
  options: AutoCompleteOptionBase[];
};

type AutoCompleteOption = AutoCompleteOptionBase | AutoCompleteOptionGroup;

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
  onFilterOptions: AntdAutoCompleteProps["filterOption"];
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
      options={options.map((opt) => generateOption(opt))}
      placeholder={placeholder}
      value={typeof value === "string" ? value : ""}
    />
  );
}

export function generateOption(
  option: AutoCompleteOptionBase
): AutoCompleteOptionBase & { key: string };
export function generateOption(
  option: AutoCompleteOptionGroup
): AutoCompleteOptionGroup;
export function generateOption(option: AutoCompleteOption): AutoCompleteOption;
export function generateOption(
  option: AutoCompleteOption | AutoCompleteOptionBase | AutoCompleteOptionGroup
):
  | AutoCompleteOption
  | AutoCompleteOptionGroup
  | (AutoCompleteOptionBase & { key: string }) {
  if ("options" in option) {
    return {
      ...option,
      /* Customized placeholder option when "options" is empty?
      options:
        option.options.length === 0
          ? [{ disabled: true, label: <em>Não há dados</em>, value: nanoid() }]
          : option.options.map((opt) => generateOption(opt)),
      */
      options: option.options.map((opt) => generateOption(opt)),
    };
  } else {
    return { ...option, key: nanoid() };
  }
}
