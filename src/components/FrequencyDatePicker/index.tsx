"use client";
import type { TextFieldProps } from "@mui/material";
import type { Dayjs } from "dayjs";

import { ErrorMessage } from "@hookform/error-message";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type FrequencyType = "daily" | "weekly" | "monthly" | "yearly";

type ResponsiveDatePickerProps = {
  name: string;
  label: string;
  sx?: TextFieldProps["sx"];
  size?: "small" | "medium";
  disableFuture?: boolean;
  defaultValue?: string | Date | null;
  startDate: Date;
  endDate: Date;
  frequency?: FrequencyType;
};

const ResponsiveDatePicker: React.FC<ResponsiveDatePickerProps> = ({
  name,
  label,
  sx,
  disableFuture = false,
  defaultValue = undefined,
  startDate,
  endDate,
  frequency = "daily",
}) => {
  const { control, formState } = useFormContext();
  const { errors } = formState;

  const start = dayjs(startDate).startOf("day");
  const end = dayjs(endDate).endOf("day");

  const shouldDisableDate = (date: Dayjs) => {
    const current = date.startOf("day");
    if (current.isBefore(start) || current.isAfter(end))
      return true;

    switch (frequency) {
      case "weekly": {
        const firstOfMonth = dayjs(new Date(current.year(), current.month(), 1));
        const firstMonday = firstOfMonth.day() === 1
          ? firstOfMonth
          : firstOfMonth.add((8 - firstOfMonth.day()) % 7, "day");

        const diff = current.diff(firstMonday, "day");
        return diff < 0 || diff % 7 !== 0;
      }

      case "monthly": {
        return current.date() !== 1;
      }

      case "yearly": {
        return !(current.date() === 1 && current.month() === 0);
      }

      case "daily":
      default:
        return false;
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <DatePicker
          {...field}
          value={field.value instanceof Date ? dayjs(field.value) : null}
          onChange={date => field.onChange(date ? date.toDate() : undefined)}
          disableFuture={disableFuture}
          shouldDisableDate={shouldDisableDate}
          slotProps={{
            popper: {
              disablePortal: true,
            },
            textField: {
              label,
              required: false,
              inputProps: {
                required: false,
                readOnly: true,
              },
              variant: "outlined",
              size: "small",
              error: !!errors[name],
              helperText: (
                <ErrorMessage
                  errors={errors}
                  name={name}
                  render={({ message }) => message}
                />
              ),
              sx: { width: "100%", ...sx, mt: 1 },
            },
          }}
        />
      )}
    />
  );
};

export default ResponsiveDatePicker;
