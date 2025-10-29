import { Button, CircularProgress } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";

function SubmitButton() {
  const { watch, formState } = useFormContext();
  const file = watch("file", null);
  const progress = watch("uploadProgress");
  const { isSubmitting } = formState;
  const disabled = !file || progress < 100 || isSubmitting;
  return (
    <Button
      disabled={disabled}
      type="submit"
      sx={{
        background: "linear-gradient(90deg, #16D1D3 0%, #407CF1 50%, #1C47A5 100%)",
        color: "#fff",
        px: 4,
        borderRadius: "8px",
        height: "44px",
        width: "100%",
      }}
    >
      {
        isSubmitting
          ? (
              <>
                Submitting
                <CircularProgress size={20} sx={{ color: "white", ml: 1 }} />
              </>
            )
          : "Submit"
      }
    </Button>
  );
}

export default SubmitButton;
