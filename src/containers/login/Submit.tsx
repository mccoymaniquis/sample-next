import { Button, CircularProgress } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";

function Submit() {
  const { watch, formState } = useFormContext();
  const email = watch("userName", "");
  const password = watch("password", "");
  const { isSubmitting } = formState;
  const isDisabled = !email || !password || isSubmitting;

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
        "height": {
          xs: "auto",
          sm: 56,
        },
        "fontSize": {
          xs: 16,
          sm: 18,
        },
        "paddingX": 4,
        "&:hover": {
          background: "linear-gradient(90deg, #13c6c8 0%, #3b72e8 54%, #173c91 95%)",
        },
      }}
    >
      {
        isSubmitting
          ? (
              <>
                Login
                <CircularProgress size={20} sx={{ color: "white" }} />
              </>
            )
          : "Login"
      }
    </Button>
  );
}

export default Submit;
