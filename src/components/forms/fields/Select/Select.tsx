import type { SelectProps as AntdSelectProps, TagProps } from "antd";
import { Tag } from "antd";
import { Select as AntdSelect } from "antd";
import React, { useCallback } from "react";

type SelectValue = string[] | string;

type SelectTagProps = Pick<TagProps, "color" | "style">;

type RenderTagHandler = Exclude<
  AntdSelectProps<SelectValue>["tagRender"],
  undefined
>;

export type SelectAsFieldProps = Partial<
  Pick<AntdSelectProps<SelectValue>, "allowClear" | "autoFocus" | "disabled">
> & {
  multiple?: boolean;
  onTagProps?:
    | ((value: Parameters<RenderTagHandler>[0]["value"]) => SelectTagProps)
    | null;
  options: { label: React.ReactNode; value: string }[];
};

type SelectProps = Required<SelectAsFieldProps> & {
  id: string;
  onBlur: () => void;
  onChange: (value: SelectValue) => void;
  onFilterOptions: (
    input: string,
    option?: { label?: unknown; value?: unknown }
  ) => boolean;
  placeholder: string;
  value: SelectValue | undefined;
};

export function Select({
  id,
  autoFocus,
  allowClear,
  disabled,
  multiple,
  onTagProps,
  onBlur,
  onChange,
  placeholder,
  options,
  onFilterOptions,
  value,
}: SelectProps): JSX.Element {
  const handleRenderTag: RenderTagHandler = useCallback(
    ({ value, label, closable, onClose }) => {
      return (
        <Tag
          closable={closable}
          color={onTagProps?.(value).color}
          onClose={onClose}
          style={onTagProps?.(value).style || { marginRight: 3 }}
        >
          {label}
        </Tag>
      );
    },
    [onTagProps]
  );

  return (
    <AntdSelect
      allowClear={allowClear}
      autoFocus={autoFocus}
      disabled={disabled}
      filterOption={onFilterOptions}
      id={id}
      mode={multiple ? "multiple" : onTagProps ? "tags" : undefined}
      onBlur={onBlur}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      tagRender={handleRenderTag}
      tokenSeparators={[",", ";", "  "]}
      value={value}
    />
  );
}
