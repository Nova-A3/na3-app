import "antd/es/date-picker/style/index";

import generatePicker from "antd/es/date-picker/generatePicker";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs";
import React, { useCallback, useMemo } from "react";

import classes from "./InputDate.module.css";

const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);

type InputDateRequiredProps = {
  name: string;
  onBlur: (ev: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (dateString: string) => void;
  value: string;
};

export type InputDateOptionalProps = Partial<{
  allowClear?: boolean;
  allowFutureDates?: boolean;
  disabled?: boolean;
  format?: string;
}>;

export type InputDateProps = InputDateOptionalProps & InputDateRequiredProps;

export function InputDate({
  name,
  onBlur,
  onChange,
  value,
  /* Optionals */
  allowClear,
  allowFutureDates,
  disabled,
  format,
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
      allowClear={allowClear || false}
      className={classes.DatePicker}
      disabled={disabled}
      disabledDate={handleSetDisabledDates}
      format={format || "DD/MM/YYYY"}
      name={name}
      onBlur={onBlur}
      onChange={handleChange}
      value={parsedValue}
    />
  );
}
