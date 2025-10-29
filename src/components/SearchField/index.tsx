"use client";
import type {
  TextFieldProps,
} from "@mui/material";

import { ErrorMessage } from "@hookform/error-message";
import ClearIcon from "@mui/icons-material/Clear";
import {
  IconButton,
  InputAdornment,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type SearchTextFieldProps = {
  name: string;
  label?: string;
  sx?: TextFieldProps["sx"];
  size?: "small" | "medium";
  onSearch?: (value: string) => void;
  disabled?: boolean;
};

const SearchField: React.FC<SearchTextFieldProps> = ({
  name,
  label = "Search",
  sx,
  size = "small",
  onSearch,
  disabled = false,
}) => {
  const { control, setValue, formState } = useFormContext();
  const { errors } = formState;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClear = () => {
    setValue(name, "");
    onSearch?.("");
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      disabled={disabled}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          variant="outlined"
          size={size || (isMobile ? "small" : "medium")}
          error={!!errors[name]}
          helperText={
            <ErrorMessage errors={errors} name={name} render={({ message }) => message} />
          }
          InputProps={{
            endAdornment: field.value
              ? (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClear} edge="end" size="small">
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                )
              : null,
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onSearch?.(field.value);
            }
          }}
          sx={{ width: "100%", ...sx }}
        />
      )}
    />
  );
};

export default SearchField;
