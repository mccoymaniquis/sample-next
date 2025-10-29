import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import ResponsiveDatePicker from "@/components/ResponsiveDatePicker";

function StartDateField() {
  const { watch, trigger } = useFormContext();

  const startDate = watch("startDateFilter");

  useEffect(() => {
    if (startDate) {
      trigger("endDateFilter");
    }
  }, [startDate, trigger]);

  return (
    <ResponsiveDatePicker name="startDateFilter" label="Start Date" />
  );
}

export default StartDateField;
