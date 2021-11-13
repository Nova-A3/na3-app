import type { SelectProps as AntdSelectProps, TagProps } from "antd";
import { Tag } from "antd";
import { Select as AntdSelect } from "antd";
import React, { useCallback } from "react";

import { isArray } from "../../../../utils";
import classes from "./Select.module.css";

type SelectValue = string[] | string;

type SelectTagProps = Pick<TagProps, "color" | "style"> & {
  containerStyle?: React.CSSProperties;
};

type RenderTagHandler = Exclude<
  AntdSelectProps<SelectValue>["tagRender"],
  undefined
>;

export type SelectAsFieldProps = Partial<
  Pick<
    AntdSelectProps<SelectValue>,
    | "allowClear"
    | "autoFocus"
    | "defaultActiveFirstOption"
    | "disabled"
    | "showSearch"
  >
> & {
  multiple?: boolean;
  onTagProps?:
    | ((value: Parameters<RenderTagHandler>[0]["value"]) => SelectTagProps)
    | null;
  options: {
    label: React.ReactNode;
    labelWhenSelected?: React.ReactNode;
    value: string;
  }[];
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
  defaultActiveFirstOption,
  showSearch,
  value: valueOrValues,
}: SelectProps): JSX.Element {
  const handleRenderTag: RenderTagHandler = useCallback(
    ({ value: optionValue, label, closable, onClose }) => {
      return (
        <div
          className={`${classes.LabelWhenSelected} ${classes.CustomTagContainer}`}
          style={onTagProps?.(optionValue).containerStyle}
        >
          <Tag
            closable={closable}
            color={onTagProps?.(optionValue).color}
            onClose={onClose}
            style={{
              marginLeft:
                isArray(valueOrValues) && optionValue === valueOrValues[0]
                  ? 7
                  : undefined,
              marginRight: 3,
              ...onTagProps?.(optionValue).style,
            }}
          >
            {label}
          </Tag>
        </div>
      );
    },
    [onTagProps, valueOrValues]
  );

  return (
    <AntdSelect
      allowClear={allowClear}
      autoFocus={autoFocus}
      defaultActiveFirstOption={defaultActiveFirstOption}
      disabled={disabled}
      filterOption={onFilterOptions}
      id={id}
      mode={multiple ? "multiple" : onTagProps ? "tags" : undefined}
      onBlur={onBlur}
      onChange={onChange}
      optionLabelProp="labelWhenSelected"
      options={options.map((opt) => ({
        label: opt.label,
        labelWhenSelected:
          multiple || onTagProps || !opt.labelWhenSelected ? (
            opt.label
          ) : (
            <div className={classes.LabelWhenSelected}>
              {opt.labelWhenSelected}
            </div>
          ),
        value: opt.value,
      }))}
      placeholder={placeholder}
      showSearch={showSearch}
      tagRender={handleRenderTag}
      tokenSeparators={[",", ";", "  "]}
      value={valueOrValues}
    />
  );
}
