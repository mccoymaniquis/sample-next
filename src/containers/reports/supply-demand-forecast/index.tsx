"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Typography } from "@mui/material";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import type { RootState } from "@/reducers/Store";
import type { FilterProps } from "@/types/reports";

import { dateRangeSchema } from "@/validation/reportSchema";

import { SubmitProvider } from "../../SubmitContext";
import Table from "./Table";

function SupplyDemandForecast() {
  const filters = useSelector((state: RootState) => state.reports.reportFilters);

  const today = new Date();
  const endOfYear = new Date(today.getFullYear(), 11, 31); // December is month 11 (0-indexed)
  const methods = useForm<FilterProps>({
    mode: "onChange",
    resolver: zodResolver(dateRangeSchema),
    defaultValues: {
      startDateFilter: filters?.startDateFilter ? new Date(filters?.startDateFilter) : today,
      endDateFilter: filters?.endDateFilter ? new Date(filters?.endDateFilter) : endOfYear,
      roleFamilyFilter: filters?.roleFamily?.id
        ? {
            id: filters?.roleFamily?.id,
            label: filters?.roleFamily?.label,
          }
        : null,
      careerLevelFilter: filters?.careerLevel?.id
        ? {
            id: filters?.careerLevel?.id,
            label: filters?.careerLevel?.label,
          }
        : null,
      date: today,
      frequency: filters?.frequency
        ? {
            id: filters?.frequency?.id,
            label: filters?.frequency?.label,
          }
        : {
            id: "daily",
            label: "Daily",
          },
    },
  });

  return (
    <SubmitProvider>
      <FormProvider {...methods}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", mb: 2 }}>
          Supply-Demand Forecast
        </Typography>
        <Box component="form">
          <Table />
        </Box>
      </FormProvider>
    </SubmitProvider>
  );
}

export default SupplyDemandForecast;
