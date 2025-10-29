import { Button, CircularProgress } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";

function Submit() {
  const { watch, formState } = useFormContext();
  const { errors, isSubmitting } = formState;

  const firstName = watch("firstName", "");
  const lastName = watch("lastName", "");
  const email = watch("email", "");
  const role = watch("role", "");

  const hasErrors = !!Object.keys(errors).length;
  const isDisabled = !firstName || !lastName || !email || !role || hasErrors || isSubmitting;

  return (
    <Button
      disabled={isDisabled}
      type="submit"
      variant="contained"
      sx={{
        "background": "linear-gradient(90deg, #16D1D3 0%, #407CF1 54%, #1C47A5 95%)",
        "color": "#fff",
        "textTransform": "none",
        "fontWeight": 600,
        "height": "auto",
        "fontSize": 16,
        "paddingX": 4,
        "&:hover": {
          background: "linear-gradient(90deg, #13c6c8 0%, #3b72e8 54%, #173c91 95%)",
        },
      }}
    >
      {isSubmitting
        ? (
            <>
              Saving..
              <CircularProgress size={20} sx={{ color: "white", ml: 1 }} />
            </>
          )
        : (
            "Save"
          )}
    </Button>
  );
}

export default Submit;
