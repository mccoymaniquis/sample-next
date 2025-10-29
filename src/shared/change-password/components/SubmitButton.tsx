import { Button, CircularProgress } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";

import { submitButtonStyles } from "../constants";

const SubmitButton: React.FC = () => {
  const { watch, formState } = useFormContext();
  const confirmPassword = watch("confirmPassword", "");
  const newPassword = watch("newPassword", "");
  const { isSubmitting, isValid } = formState;

  const isPasswordTheSame = confirmPassword === newPassword;
  const isPassAlphaNum = /[^A-Z0-9]/i.test(newPassword);
  const isPassLengthMin = newPassword?.length >= 8;
  const isPassContainNum = /\d/.test(newPassword);
  const isPassAlpha = /[A-Z]/.test(newPassword);

  const isDisabled = isPasswordTheSame
    && isPassLengthMin
    && isPassContainNum
    && isPassAlphaNum
    && isPassAlpha
    && isValid;

  return (
    <Button
      sx={submitButtonStyles}
      disabled={!isDisabled}
      variant="contained"
      type="submit"
    >
      Submit
      {isSubmitting && (
        <CircularProgress size={20} sx={{ color: "white" }} />
      )}
    </Button>
  );
};

export default SubmitButton;
