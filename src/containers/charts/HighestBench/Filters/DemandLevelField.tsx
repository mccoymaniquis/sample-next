import { Box } from "@mui/material";
import React from "react";

import ResponsiveAutocomplete from "@/components/ResponsiveAutocomplete";
import { useGetBenchTypes } from "@/services/queries/charts";

function DemandLevelField() {
  const { data, isLoading } = useGetBenchTypes();

  return (
    <Box sx={{ width: 200 }}>
      <ResponsiveAutocomplete
        name="demandLevel"
        label="Demand Level"
        options={data || []}
        disableClearable={true}
        loading={isLoading}
      />
    </Box>
  );
}

export default DemandLevelField;
