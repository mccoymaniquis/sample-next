"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import type { DemandFormValues } from "@/types/demand";

import { setModalVisibility } from "@/reducers/Modal";
import { dateRangeSchema } from "@/validation/demandSchema";

import { SubmitProvider } from "../SubmitContext";
import Table from "./Table";

function Demand() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setModalVisibility({ key: "showDemandFilters", value: false }));
    dispatch(setModalVisibility({ key: "showUploadDemandModal", value: false }));
  }, [dispatch]);

  const methods = useForm<DemandFormValues>({
    resolver: zodResolver(dateRangeSchema),
    mode: "onChange",
    defaultValues: {
      startDateFilter: undefined,
      endDateFilter: undefined,
      roleFamilyFilter: null,
      careerLevelFilter: null,
      opptyTaggingFilter: null,
      opptyFunnelFilter: null,
      soTagFilter: null,
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

export default Demand;
