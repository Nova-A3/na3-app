import "antd/es/date-picker/style/index";

import type { DatePickerProps } from "antd";
import generatePicker from "antd/es/date-picker/generatePicker";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs";
import React, { useCallback } from "react";

import classes from "./InputDate.module.css";

const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);

type InputDateProps = Required<
  Pick<DatePickerProps, "allowClear" | "disabled"> & {
    allowFutureDates: boolean;
    autoFocus: boolean;
    format: string;
    onBlur: () => void;
    onChange: (value: Dayjs | null) => void;
    placeholder: string;
    value: Dayjs;
  }
>;

export function InputDate({
  allowClear,
  disabled,
  format,
  onBlur,
  onChange,
  allowFutureDates,
  value,
  placeholder,
  autoFocus,
}: InputDateProps): JSX.Element {
  const handleSetDisabledDates = useCallback(
    (date: Dayjs): boolean => {
      return allowFutureDates ? false : date.isAfter(dayjs());
    },
    [allowFutureDates]
  );

  return (
    <DatePicker
      allowClear={allowClear}
      autoFocus={autoFocus}
      className={classes.DatePicker}
      disabled={disabled}
      disabledDate={handleSetDisabledDates}
      format={format}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    />
  );
}
