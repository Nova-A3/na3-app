import "antd/es/date-picker/style/index";

import type { DatePickerProps } from "antd";
import generatePicker from "antd/es/date-picker/generatePicker";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs";
import React, { useCallback, useMemo } from "react";

import classes from "./InputDate.module.css";

const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);

type InputDateProps = Required<
  Pick<DatePickerProps, "allowClear" | "disabled" | "id">
> & {
  allowFutureDates: boolean;
  autoFocus: boolean;
  format: string;
  onBlur: () => void;
  onChange: (dateString: string) => void;
  placeholder: string;
  value: string;
};

export function InputDate({
  allowClear,
  disabled,
  id,
  format,
  onBlur,
  onChange,
  allowFutureDates,
  value,
  placeholder,
  autoFocus,
}: InputDateProps): JSX.Element {
  const handleChange = useCallback(
    (date: Dayjs | null) => {
      onChange(date?.format() || "");
    },
    [onChange]
  );

  const handleSetDisabledDates = useCallback(
    (date: Dayjs): boolean => {
      return allowFutureDates ? false : date.isAfter(dayjs());
    },
    [allowFutureDates]
  );

  const parsedValue = useMemo(() => (value ? dayjs(value) : null), [value]);

  return (
    <DatePicker
      allowClear={allowClear}
      autoFocus={autoFocus}
      className={classes.DatePicker}
      disabled={disabled}
      disabledDate={handleSetDisabledDates}
      format={format}
      id={id}
      onBlur={onBlur}
      onChange={handleChange}
      placeholder={placeholder}
      value={parsedValue}
    />
  );
}
