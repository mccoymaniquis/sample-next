import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import ResponsiveDatePicker from "@/components/ResponsiveDatePicker";

function EndDateField() {
  const { watch, trigger } = useFormContext();

  const endDate = watch("endDateFilter");

  useEffect(() => {
    if (endDate) {
      trigger("startDateFilter");
    }
  }, [endDate, trigger]);

  return (
    <ResponsiveDatePicker name="endDateFilter" label="End Date" />
  );
}

export default EndDateField;
