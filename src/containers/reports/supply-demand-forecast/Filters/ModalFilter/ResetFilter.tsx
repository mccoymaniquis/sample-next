/* eslint-disable react-hooks-extra/no-direct-set-state-in-use-effect */
import { Button } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useDispatch } from "react-redux";

import { clearReportData } from "@/reducers/Report";

function ResetFilter() {
  const dispatch = useDispatch();
  const { reset, control } = useFormContext();

  const filters = useWatch({
    control,
    name: [
      "roleFamilyFilter",
      "careerLevelFilter",
      "startDateFilter",
      "endDateFilter",
      "frequency",
    ],
  });

  const [
    roleFamilyFilter,
    careerLevelFilter,
    startDateFilter,
    endDateFilter,
    frequency,
  ] = filters;

  const [disabled, setDisabled] = useState(false);

  const today = useMemo(() => new Date(), []);
  const endOfYear = useMemo(
    () => new Date(today.getFullYear(), 11, 31),
    [today],
  );

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const clearFilter = () => {
    dispatch(clearReportData());
    reset({
      roleFamilyFilter: null,
      careerLevelFilter: null,
      frequency: { id: "daily", label: "Daily" },
      date: today,
      startDateFilter: today,
      endDateFilter: endOfYear,
    });
  };

  useEffect(() => {
    if (!startDateFilter || !endDateFilter || !frequency) {
      setDisabled(true);
      return;
    }

    const isDefaultStart = formatDate(new Date(startDateFilter)) === formatDate(today);
    const isDefaultEnd = formatDate(new Date(endDateFilter)) === formatDate(endOfYear);
    const isDefaultFrequency = frequency?.label?.toLowerCase() === "daily";
    const isRoleFamilyEmpty = !roleFamilyFilter?.id;
    const isCareerLevelEmpty = !careerLevelFilter?.id;

    const isDefaultFiltersOnly
      = isDefaultStart
        && isDefaultEnd
        && isDefaultFrequency
        && isRoleFamilyEmpty
        && isCareerLevelEmpty;

    setDisabled(isDefaultFiltersOnly);
  }, [
    roleFamilyFilter,
    careerLevelFilter,
    startDateFilter,
    endDateFilter,
    frequency,
    today,
    endOfYear,
  ]);

  return (
    <Button
      disabled={disabled}
      onClick={clearFilter}
      sx={{
        background: "#fff",
        borderRadius: "8px",
        padding: "3px",
        height: "44px",
        width: "100%",
      }}
    >
      Reset Filter
    </Button>
  );
}

export default ResetFilter;
