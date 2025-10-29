import React from "react";
import { useWatch } from "react-hook-form";

import FrequencyDatePicker from "@/components/FrequencyDatePicker";

function DateField() {
  const startDateFilter = useWatch({ name: "startDateFilter" });
  const endDateFilter = useWatch({ name: "endDateFilter" });
  return (
    <FrequencyDatePicker
      name="date"
      label="Date"
      startDate={new Date(startDateFilter)}
      endDate={new Date(endDateFilter)}
      defaultValue={new Date()}
      frequency="weekly"
    />
  );
}

export default DateField;
