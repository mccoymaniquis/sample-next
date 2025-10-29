import { Button, CircularProgress } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";

function SubmitButton() {
  const { formState } = useFormContext();
  const { isSubmitting } = formState;
  return (
    <Button
      disabled={isSubmitting}
      type="submit"
      sx={{
        "background": "linear-gradient(90deg, #16D1D3 0%, #407CF1 50%, #1C47A5 100%)",
        "color": "#fff",
        "px": 4,
        "borderRadius": "8px",
        "height": "44px",
        "width": "100%",
        "&:hover": {
          background: "linear-gradient(90deg, #16D1D3 0%, #407CF1 50%, #1C47A5 100%)",
          opacity: 0.8,
        },
      }}
    >
      {
        isSubmitting
          ? (
              <>
                Downloading
                <CircularProgress size={20} sx={{ color: "white", ml: 1 }} />
              </>
            )
          : "Confirm Download"
      }
    </Button>
  );
}

export default SubmitButton;
