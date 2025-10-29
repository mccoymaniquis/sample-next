/* eslint-disable react-hooks-extra/no-direct-set-state-in-use-effect */
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { isEmptyDropdownFields } from "@/helpers/filters";
import { useSubmit } from "@/hooks/useSubmit";

function Submit() {
  const { triggerSubmit } = useSubmit();
  const [disabled, setDisabled] = useState(false);

  const {
    control,
    formState: { isValid },
  } = useFormContext();

  const roleFamilyFilter = useWatch({ control, name: "roleFamilyFilter" });
  const careerLevelFilter = useWatch({ control, name: "careerLevelFilter" });
  const startDateFilter = useWatch({ control, name: "startDateFilter" });
  const endDateFilter = useWatch({ control, name: "endDateFilter" });
  const clientFilter = useWatch({ control, name: "clientFilter" });
  const projectNameFilter = useWatch({ control, name: "projectNameFilter" });

  const handleSubmitClick = () => {
    triggerSubmit();
  };

  useEffect(() => {
    if (!startDateFilter || !endDateFilter) {
      setDisabled(true);
      return;
    }

    const todayStr = new Date().toISOString().split("T")[0];
    const endOfYearStr = new Date(new Date().getFullYear(), 11, 31)
      .toISOString()
      .split("T")[0];

    const startStr = new Date(startDateFilter).toISOString().split("T")[0];
    const endStr = new Date(endDateFilter).toISOString().split("T")[0];

    const isDefaultStartDate = startStr === todayStr;
    const isDefaultEndDate = endStr === endOfYearStr;

    const isRoleFamilyEmpty = isEmptyDropdownFields(roleFamilyFilter);
    const isCareerLevelEmpty = isEmptyDropdownFields(careerLevelFilter);
    const isClientFilterEmpty = isEmptyDropdownFields(clientFilter);
    const isProjectNameFilterEmpty = isEmptyDropdownFields(projectNameFilter);

    const isDefaultFiltersOnly
      = isDefaultStartDate
        && isDefaultEndDate
        && isRoleFamilyEmpty
        && isCareerLevelEmpty
        && isClientFilterEmpty
        && isProjectNameFilterEmpty;

    const shouldDisable = !isValid || isDefaultFiltersOnly;

    setDisabled(shouldDisable);
  }, [
    isValid,
    roleFamilyFilter,
    careerLevelFilter,
    startDateFilter,
    endDateFilter,
    clientFilter,
    projectNameFilter,
  ]);

  return (
    <Button
      disabled={disabled}
      onClick={handleSubmitClick}
      sx={{
        borderRadius: "8px",
        padding: "3px",
        height: "44px",
        width: "100%",
        background: disabled
          ? "gray"
          : "linear-gradient(135deg, #16D1D3 0%, #407CF1 50%, #1C47A5 100%)",
        color: "#fff",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      Apply Filter
    </Button>
  );
}

export default Submit;
