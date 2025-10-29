import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Typography } from "@mui/material";
import React from "react";

type DynamicMessage = {
  isValid: boolean;
  message: string;
};

function DynamicMessage({ isValid, message }: DynamicMessage) {
  return (
    <Box display="flex" alignItems="center" gap="4px" color="error">
      {isValid
        ? <CheckCircleIcon color="success" sx={{ fontSize: "1rem" }} />
        : <CancelIcon color="error" sx={{ fontSize: "1rem" }} />}
      <Typography
        color={isValid ? "green" : "error"}
        sx={{ fontSize: "0.8rem" }}
        variant="caption"
      >
        {message}
      </Typography>
    </Box>
  );
}

export default DynamicMessage;
