import { Box } from "@mui/material";
import React from "react";

import ResponsiveAutocomplete from "@/components/ResponsiveAutocomplete";
import { useGetDemandLevels } from "@/services/queries/charts";

function DemandLevelField() {
  const { data, isLoading } = useGetDemandLevels();

  return (
    <Box sx={{ width: 200 }}>
      <ResponsiveAutocomplete
        name="demandLevel"
        label="Demand Level"
        options={data || []}
        loading={isLoading}
        disableClearable={true}
      />
    </Box>
  );
}

export default DemandLevelField;
