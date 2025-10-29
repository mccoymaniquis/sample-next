import { Box } from "@mui/material";
import React from "react";

import ResponsiveDatePicker from "@/components/ResponsiveDatePicker";

function DateField({ name, defaultValue, label }: { defaultValue: string; name: string; label: string }) {
  return (
    <Box width="200px">
      <ResponsiveDatePicker name={name} label={label} defaultValue={new Date(defaultValue)} />
    </Box>
  );
}

export default DateField;
