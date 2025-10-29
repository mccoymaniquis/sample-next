import { Button, CircularProgress } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";

import { submitButtonStyles } from "./constants";

function SubmitButton() {
  const { watch, formState } = useFormContext();
  const { isSubmitting } = formState;

  const email = watch("email");
  const counter = watch("counter");
  const cooldownRemaining = watch("cooldownRemaining");

  const isDisabled = !email || !formState.isValid || isSubmitting || counter > 0 || cooldownRemaining !== null;

  return (
    <>
      <Button
        sx={submitButtonStyles}
        disabled={isDisabled}
        variant="contained"
        type="submit"
      >
        {/* {counter === 0 ? "Submit" : `Resend available in ${counter}s`} */}
        Submit
        {isSubmitting && (
          <CircularProgress size={20} sx={{ color: "white", ml: 1 }} />
        )}
      </Button>

    </>
  );
}

export default SubmitButton;
