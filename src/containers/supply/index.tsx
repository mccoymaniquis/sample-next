"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

import type { SupplyFormValues } from "@/types/supply";

import { dateRangeSchema } from "@/validation/supplySchema";

import { SubmitProvider } from "../SubmitContext";
import Table from "./Table";

function Supply() {
  const methods = useForm<SupplyFormValues>({
    resolver: zodResolver(dateRangeSchema),
    mode: "onChange",
    defaultValues: {
      startDateFilter: undefined,
      endDateFilter: undefined,
      roleFamilyFilter: null,
      careerLevelFilter: null,
      search: "",
    },
  });

  return (
    <SubmitProvider>
      <FormProvider {...methods}>
        <Box component="form">

          <Table />
        </Box>
      </FormProvider>
    </SubmitProvider>
  );
}

export default Supply;
