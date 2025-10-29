import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";

import type { RootState } from "@/reducers/Store";

import ResponsiveDatePicker from "@/components/ResponsiveDatePicker";

function StartDateField() {
  const { watch, trigger } = useFormContext();
  const filters = useSelector((state: RootState) => state.demand.demandFilters);

  const startDateFilter = filters?.startDateFilter
    ? new Date(filters.startDateFilter).toISOString()
    : undefined;

  const startDate = watch("startDateFilter");

  useEffect(() => {
    if (startDate) {
      trigger("endDateFilter");
    }
  }, [startDate, trigger]);

  return (
    <ResponsiveDatePicker name="startDateFilter" label="Start Date" defaultValue={startDateFilter} />
  );
}

export default StartDateField;
