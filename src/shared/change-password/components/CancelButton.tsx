import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

import { submitButtonStyles } from "../constants";

const REDIRECT_ROUTE = "/charts";

const CancelButton: React.FC = () => {
  const router = useRouter();

  const handleCancel = () => {
    router.push(REDIRECT_ROUTE);
  };

  return (
    <Button
      sx={submitButtonStyles}
      onClick={handleCancel}
      variant="contained"
    >
      Cancel
    </Button>
  );
};

export default CancelButton;
