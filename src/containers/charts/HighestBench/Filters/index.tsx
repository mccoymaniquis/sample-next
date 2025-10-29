import { Box } from "@mui/material";
import _ from "lodash";
import moment from "moment";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import {
  getHighestBenchFilters,
  setHighestBenchBody,
  setHighestBenchFilters,
  setLastTouchedBenchFilter,
} from "@/reducers/Charts";

import type { ChartsFilterProps, OptionTypeProps } from "../../types";

import { DEFAULT_BENCH_VALUES } from "../../constants";
import ClearFiltersButton from "./ClearFilters";
import DemandLevelField from "./DemandLevelField";
import MonthField from "./MonthField";
import SubmitButton from "./SubmitButton";
import YearField from "./YearField";

function Filters() {
  const filters = useSelector(getHighestBenchFilters);
  const dispatch = useDispatch();
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      demandLevel: _.defaultTo(filters?.demandLevel, DEFAULT_BENCH_VALUES.demandLevel),
      month: _.defaultTo(filters?.month, DEFAULT_BENCH_VALUES.month),
      year: _.defaultTo(filters?.year, DEFAULT_BENCH_VALUES.year),
    },
  });

  const handleSetTouchedFilter = <T extends ChartsFilterProps<OptionTypeProps>>(data: T) => {
    const { year, month, demandLevel } = data;
    const isDemandLevelFiltered = (JSON.stringify(filters?.demandLevel) !== JSON.stringify(demandLevel));
    const isMonthFiltered = (JSON.stringify(filters?.month) !== JSON.stringify(month));
    const isYearFiltered = (JSON.stringify(filters?.year) !== JSON.stringify(year));

    if (isMonthFiltered || isYearFiltered) {
      dispatch(setLastTouchedBenchFilter("datePeriod"));
    }

    if (isDemandLevelFiltered) {
      dispatch(setLastTouchedBenchFilter("demandLevel"));
    }
  };

  const onSubmit = async <T extends ChartsFilterProps<OptionTypeProps>>(data: T) => {
    const { year, month, demandLevel: demandLevelOpt } = data;

    const date = moment(`${year?.label} ${month?.label}`);
    const startDate = date.startOf("month").format("YYYY-MM-DD") as string;
    const endDate = date.endOf("month").format("YYYY-MM-DD") as string;
    const demandLevel = demandLevelOpt?.label as string;

    dispatch(setHighestBenchFilters({ demandLevel: demandLevelOpt, year, month }));
    dispatch(setHighestBenchBody({ startDate, endDate, demandLevel }));
    handleSetTouchedFilter(data);
  };

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={methods.handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row" },
          alignItems: "center",
          gap: 2,
          width: "100%",
          mt: 1,
        }}
      >
        <Box sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          width: "100%",
        }}
        >
          <DemandLevelField />
          <YearField />
          <MonthField />
        </Box>
        <Box sx={{
          display: "flex",
          justifyContent: { xs: "flex-start", sm: "flex-start", md: "flex-end" },
          alignItems: "center",
          width: "100%",
          gap: 2,
        }}
        >
          <ClearFiltersButton fullWidth />
          <SubmitButton />
        </Box>
      </Box>
    </FormProvider>
  );
}

export default Filters;
