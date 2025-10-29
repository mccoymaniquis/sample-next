import { Box } from "@mui/material";
import React from "react";

import ResponsiveAutocomplete from "@/components/ResponsiveAutocomplete";

function YearField() {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2020 + 1 },
    (_, i) => ({ id: `${2020 + i}`, label: `${2020 + i}` }),
  );

  return (
    <Box sx={{ width: 150 }}>
      <ResponsiveAutocomplete
        name="year"
        label="Year"
        options={years}
        disableClearable={true}
      />
    </Box>
  );
}

export default YearField;
