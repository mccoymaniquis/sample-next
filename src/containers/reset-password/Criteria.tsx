import { Box, Typography } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";

import DynamicMessage from "./DynamicMessage";

const Criteria: React.FC = () => {
  const { watch } = useFormContext();
  const newPassword = watch("newPassword", "");

  return (
    <Box
      className="criteria"
      borderRadius="10px"
      alignSelf="start"
      width="100%"
      color="#000"
    >
      <Typography variant="caption" sx={{ fontSize: "0.9rem" }}>
        A valid password must meet all of the following criteria:
      </Typography>
      <br />
      <DynamicMessage
        message="Minimum of 8 characters"
        isValid={newPassword?.length >= 8}
      />
      <DynamicMessage
        message="Contains at least one number"
        isValid={/\d/.test(newPassword)}
      />
      <DynamicMessage
        message="Contains at least one special character (e.g., !, @, #, etc.)"
        isValid={/[^A-Z0-9]/i.test(newPassword)}
      />
      <DynamicMessage
        message="Contains at least one uppercase letter"
        isValid={/[A-Z]/.test(newPassword)}
      />
    </Box>
  );
};

export default Criteria;
