"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Typography } from "@mui/material";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import type { RootState } from "@/reducers/Store";
import type { FilterProps } from "@/types/weeklyDeployment";

import Filters from "@/containers/reports/weekly-deploment/Filters";
import { dateRangeSchema } from "@/validation/reportSchema";

import { SubmitProvider } from "../../SubmitContext";
import Table from "./Table";

function WeeklyDeployment() {
  const filters = useSelector((state: RootState) => state.weeklyDeployment.weeklyDeploymentFilter);
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
      clientFilter: filters?.client?.id
        ? {
            id: filters?.client?.id,
            label: filters?.client?.label,
          }
        : null,
      projectNameFilter: filters?.projectName?.id
        ? {
            id: filters?.projectName?.id,
            label: filters?.projectName?.label,
          }
        : null,
    },
  });

  return (
    <SubmitProvider>
      <FormProvider {...methods}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", mb: 2 }}>
          Weekly Deployment
        </Typography>
        <Box component="form">
          <Filters />
          <Table />
        </Box>
      </FormProvider>
    </SubmitProvider>
  );
}

export default WeeklyDeployment;
