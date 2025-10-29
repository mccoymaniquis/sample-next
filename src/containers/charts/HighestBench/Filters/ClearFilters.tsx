"use client";

import { Box, Typography } from "@mui/material";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";

import { setStartAndEndDates } from "@/helpers/date";
import { setHighestBenchBody, setHighestBenchFilters, setLastTouchedBenchFilter } from "@/reducers/Charts";

import type { ClearFiltersButtonProps } from "../../types";

import { DEFAULT_BENCH_VALUES } from "../../constants";

const ClearFiltersButton: React.FC<ClearFiltersButtonProps> = ({
  fullWidth = false,
}) => {
  const {
    reset,
    formState: { isSubmitting },
    watch,
  } = useFormContext();

  const dispatch = useDispatch();

  const [hasMounted, setHasMounted] = useState(false);

  const currentValues = watch(); // Current form state
  const isChangedValueDefault = hasMounted && _.isEqual(DEFAULT_BENCH_VALUES, currentValues);

  const handleResetFilter = () => {
    const { year, month, demandLevel } = DEFAULT_BENCH_VALUES;
    const { startDate, endDate } = setStartAndEndDates({
      year: year?.label,
      month: month?.label,
    });

    dispatch(setHighestBenchFilters({ ...DEFAULT_BENCH_VALUES }));
    dispatch(setLastTouchedBenchFilter(""));
    dispatch(setHighestBenchBody({
      demandLevel: demandLevel?.label,
      startDate,
      endDate,
    }));

    reset(DEFAULT_BENCH_VALUES, {
      keepDefaultValues: false,
    });
  };

  // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
  useEffect(() => setHasMounted(true), []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: fullWidth ? "center" : "flex-end",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Typography
        onClick={() => handleResetFilter()}
        sx={{
          color: isSubmitting || isChangedValueDefault ? "text.disabled" : "primary.main",
          cursor: isSubmitting || isChangedValueDefault ? "not-allowed" : "pointer",
          pointerEvents: isSubmitting || isChangedValueDefault ? "none" : "auto",
          userSelect: "none",
        }}
        role="button"
        tabIndex={0}
        aria-disabled={isSubmitting}
      >
        Reset Filter
      </Typography>
    </Box>
  );
};

export default ClearFiltersButton;
