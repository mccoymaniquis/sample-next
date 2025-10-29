import { Box } from "@mui/material";
import React from "react";

import ResponsiveAutocomplete from "@/components/ResponsiveAutocomplete";

import { MONTHS_OPTIONS } from "../../constants";

function YearField() {
  return (
    <Box sx={{ width: 150 }}>
      <ResponsiveAutocomplete
        name="month"
        label="Month"
        options={MONTHS_OPTIONS}
        disableClearable={true}
      />
    </Box>
  );
}

export default YearField;
