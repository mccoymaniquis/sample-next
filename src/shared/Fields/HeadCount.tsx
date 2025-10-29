import { Box } from "@mui/material";
import React from "react";

import ResponsiveTextField from "@/components/ResponsiveTextfield";

function HeadCount({ name, defaultValue }: { name: string; defaultValue: string }) {
  return (
    <Box width="200px">
      <ResponsiveTextField name={name} type="number" defaultValue={defaultValue} />
    </Box>
  );
}

export default HeadCount;
