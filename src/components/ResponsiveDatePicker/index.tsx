"use client";
import type { TextFieldProps } from "@mui/material";

import { ErrorMessage } from "@hookform/error-message";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import _ from "lodash";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type ResponsiveDatePickerProps = {
  name: string;
  label: string; // e.g. "Start Date*" if you want the star
  sx?: TextFieldProps["sx"];
  size?: "small" | "medium";
  disableFuture?: boolean;
  defaultValue?: string | Date | null;
};

const ResponsiveDatePicker: React.FC<ResponsiveDatePickerProps> = ({
  name,
  label,
  sx,
  disableFuture = false,
  defaultValue = undefined,
}) => {
  const { control, formState } = useFormContext();
  const { errors } = formState;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <DatePicker
          {...field}
          label={label && (
            <span>
              {label?.replace("*", "")}
              <span style={{ color: "red" }}>
                {label?.includes("*") ? "*" : ""}
              </span>
            </span>
          )}
          value={field.value instanceof Date ? dayjs(field.value) : null}
          onChange={date => field.onChange(date ? date.toDate() : undefined)}
          disableFuture={disableFuture}
          slotProps={{
            popper: { disablePortal: true },
            textField: {
              required: false,
              inputProps: { required: false, readOnly: true },
              variant: "outlined",
              size: "small",
              error: !!errors[name] || !!_.get(errors, name.split(".")),
              helperText: (
                <ErrorMessage errors={errors} name={name} render={({ message }) => message} />
              ),
              // Style the label via InputLabelProps.sx if you want to force a color
              InputLabelProps: {
                sx: {
                  "color": "#333", // default label color
                  "&.Mui-focused": { color: "#333" },
                  "&.Mui-error": { color: "#d32f2f" },
                  // color of the asterisk (if you use required instead of manual *)
                  "& .MuiFormLabel-asterisk": { color: "red" },
                },
              },
              sx: { width: "100%", ...sx },
            },
          }}
        />
      )}
    />
  );
};

export default ResponsiveDatePicker;
