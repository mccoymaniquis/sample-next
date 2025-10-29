import { Box, CircularProgress } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import ChartDashboard from "@/components/ChartDashboard";
import { formatMonthIndex } from "@/helpers/utility";
import { getHighestBenchAfterWon } from "@/reducers/Charts";
import { useGetHighestBenchAfterWon } from "@/services/queries/charts";

import { PLACEHOLDER_MESSAGE } from "../constants";
import Filters from "./Filters";

function HighestDemand() {
  const filters = useSelector(getHighestBenchAfterWon);

  const { data, isLoading } = useGetHighestBenchAfterWon({
    benchType: filters?.filters?.demandLevel?.id,
    startDate: `${filters?.filters?.year?.id}-${formatMonthIndex(filters?.filters?.month?.id)}-01`,
  });

  const chartData = data || [];
  const { lastFilterTouched } = useSelector(getHighestBenchAfterWon);

  return (
    <Box>
      <Filters />
      {isLoading
        ? (
            <div className="w-full h-screen flex justify-center items-center">
              <CircularProgress />
            </div>
          )
        : (
            <Box>
              {!chartData || chartData.length === 0
                ? (
                    <div
                      style={{
                        height: 300,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#888",
                        border: "1px dashed #ccc",
                      }}
                    >
                      {PLACEHOLDER_MESSAGE[lastFilterTouched] ?? "No data available."}
                    </div>
                  )
                : (
                    <ChartDashboard
                      xAxisLabel="Roles and Career levels"
                      yAxisLabel="Number of Resources"
                      data={chartData}
                      chartType="bar"
                    />
                  )}
            </Box>
          )}
    </Box>
  );
}

export default HighestDemand;
