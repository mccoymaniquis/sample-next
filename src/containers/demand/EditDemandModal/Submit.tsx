import { Button } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";

function Submit() {
  const {
    formState: { isDirty, isSubmitting, isValid },
  } = useFormContext();

  return (
    <Button
      type="submit"
      variant="contained"
      disabled={!isDirty || !isValid || isSubmitting}
      sx={{
        "background":
          "linear-gradient(90deg, #16D1D3 0%, #407CF1 54%, #1C47A5 95%)",
        "color": "#fff",
        "textTransform": "none",
        "fontWeight": 600,
        "height": "auto",
        "fontSize": 16,
        "paddingX": 4,
        "&:hover": {
          background:
            "linear-gradient(90deg, #13c6c8 0%, #3b72e8 54%, #173c91 95%)",
        },
      }}
    >
      Save
    </Button>
  );
}

export default Submit;
