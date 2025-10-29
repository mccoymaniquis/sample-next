/* eslint-disable react-hooks-extra/no-direct-set-state-in-use-effect */
import { Button } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useDispatch } from "react-redux";

import { clearWeeklyDeploymentData } from "@/reducers/WeeklyDeployment";

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
      "clientFilter",
      "projectNameFilter",
    ],
  });

  const [
    roleFamilyFilter,
    careerLevelFilter,
    startDateFilter,
    endDateFilter,
    clientFilter,
    projectNameFilter,
  ] = filters;

  const [disabled, setDisabled] = useState(false);

  const today = useMemo(() => new Date(), []);
  const endOfYear = useMemo(
    () => new Date(today.getFullYear(), 11, 31),
    [today],
  );

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const clearFilter = () => {
    dispatch(clearWeeklyDeploymentData());
    reset({
      roleFamilyFilter: null,
      careerLevelFilter: null,
      date: today,
      startDateFilter: today,
      endDateFilter: endOfYear,
      clientFilter: null,
      projectNameFilter: null,
    });
  };

  useEffect(() => {
    if (!startDateFilter || !endDateFilter) {
      setDisabled(true);
      return;
    }

    const isDefaultStart = formatDate(new Date(startDateFilter)) === formatDate(today);
    const isDefaultEnd = formatDate(new Date(endDateFilter)) === formatDate(endOfYear);
    const isRoleFamilyEmpty = !roleFamilyFilter?.id;
    const isCareerLevelEmpty = !careerLevelFilter?.id;
    const isClientFilterEmpty = !clientFilter?.id;
    const isProjectNameFilterEmpty = !projectNameFilter?.id;

    const isDefaultFiltersOnly
      = isDefaultStart
        && isDefaultEnd
        && isRoleFamilyEmpty
        && isCareerLevelEmpty
        && isClientFilterEmpty
        && isProjectNameFilterEmpty;

    setDisabled(isDefaultFiltersOnly);
  }, [
    roleFamilyFilter,
    careerLevelFilter,
    startDateFilter,
    endDateFilter,
    today,
    endOfYear,
    clientFilter,
    projectNameFilter,
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
