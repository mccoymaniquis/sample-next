import type { TextFieldProps } from "@mui/material";

import { ErrorMessage } from "@hookform/error-message";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  IconButton,
  InputAdornment,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import _ from "lodash";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

type ResponsiveTextFieldProps = {
  name: string;
  label?: string;
  type?: string;
  sx?: TextFieldProps["sx"];
  size?: "small" | "medium";
  defaultValue?: string;
  isDisabled?: boolean;
};

const ResponsiveTextField: React.FC<ResponsiveTextFieldProps> = ({
  name = "",
  label,
  type = "text",
  sx,
  size = "small",
  defaultValue = "",
  isDisabled = false,
}) => {
  const { control, formState } = useFormContext();
  const { errors } = formState;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const isPasswordType = type === "password";
  const inputType = isPasswordType && showPassword ? "text" : type;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <TextField
          {...field}
          disabled={isDisabled}
          label={label && (
            <span>
              {label.replace("*", "")}
              <span style={{ color: "red" }}>{label.includes("*") ? "*" : ""}</span>
            </span>
          )}
          type={inputType}
          variant="outlined"
          size={size || (isMobile ? "small" : "medium")}
          // error={!!errors[name]}
          error={!!errors[name] || !!_.get(errors, name.split("."))}
          helperText={(
            <ErrorMessage
              errors={errors}
              name={name}
              render={({ message }) => message}
            />
          )}
          sx={{ width: "100%", ...sx }}
          autoComplete="off"
          InputProps={{
            endAdornment: isPasswordType
              ? (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(prev => !prev)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              : undefined,
          }}
        />
      )}
    />
  );
};

export default ResponsiveTextField;
