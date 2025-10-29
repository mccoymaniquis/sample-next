import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";

import type { RootState } from "@/reducers/Store";

import ResponsiveDatePicker from "@/components/ResponsiveDatePicker";

function EndDateField() {
  const { watch, trigger } = useFormContext();
  const filters = useSelector((state: RootState) => state.supply.supplyFilters);

  const endDateFilter = filters?.endDateFilter
    ? new Date(filters.endDateFilter).toISOString()
    : undefined;

  const endDate = watch("endDateFilter");

  useEffect(() => {
    if (endDate) {
      trigger("startDateFilter");
    }
  }, [endDate, trigger]);

  return (
    <ResponsiveDatePicker name="endDateFilter" label="End Date" defaultValue={endDateFilter} />
  );
}

export default EndDateField;
