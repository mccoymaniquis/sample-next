"use client";
import type { TextFieldProps } from "@mui/material";

import { ErrorMessage } from "@hookform/error-message";
import { Autocomplete, FormControl, TextField, Tooltip } from "@mui/material";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type OptionType = {
  id: number | string;
  label: string;
};

type ResponsiveAutocompleteProps = {
  name: string;
  label?: string;
  options: OptionType[];
  sx?: TextFieldProps["sx"];
  defaultValue?: OptionType | null;
  disableClearable?: boolean;
  loading?: boolean;
  disabledInput?: boolean;
};

const ResponsiveAutocomplete: React.FC<ResponsiveAutocompleteProps> = ({
  name,
  label,
  options,
  sx,
  defaultValue,
  disableClearable,
  loading = false,
  disabledInput = false,
}) => {
  const { control, formState } = useFormContext();
  const { errors } = formState;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  // To monitor changes in the label
  const selectedOption = useWatch({ control, name });

  // To detect truncation when selected label changes
  useEffect(() => {
    if (inputRef.current) {
      const el = inputRef.current;
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setIsTruncated(el.scrollWidth > el.clientWidth);
    }
  }, [selectedOption]);

  return (
    <FormControl fullWidth>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue ?? null}
        render={({ field }) => (
          <Autocomplete
            disabled={disabledInput}
            options={options}
            getOptionLabel={option => option?.label}
            isOptionEqualToValue={(option, value) => option?.id === value?.id}
            value={field.value}
            onChange={(_, data) => field.onChange(data)}
            disableClearable={disableClearable}
            loading={loading}
            renderInput={(params) => {
              const displayValue = field.value?.label || "";

              return (
                <Tooltip
                  title={isTruncated ? displayValue : ""}
                  disableHoverListener={!isTruncated}
                  arrow
                  placement="top"
                >
                  <TextField
                    {...params}
                    label={label && (
                      <span>
                        {label.replace("*", "")}
                        <span style={{ color: "red" }}>{label.includes("*") ? "*" : ""}</span>
                      </span>
                    )}
                    variant="outlined"
                    // error={!!errors[name]}
                    error={!!errors[name] || !!_.get(errors, name.split("."))}
                    size="small"
                    helperText={
                      <ErrorMessage errors={errors} name={name} render={({ message }) => message} />
                    }
                    sx={{
                      ...sx,
                      "& input": {
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      },
                    }}
                    inputRef={inputRef}
                  />
                </Tooltip>
              );
            }}
          />
        )}
      />
    </FormControl>
  );
};

export default ResponsiveAutocomplete;
