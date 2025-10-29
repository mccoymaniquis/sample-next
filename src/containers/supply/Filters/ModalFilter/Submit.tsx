import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";

import type { RootState } from "@/reducers/Store";

import { useSubmit } from "@/hooks/useSubmit";

function Submit() {
  const { triggerSubmit } = useSubmit();
  const [disabled, setDisabled] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { formState, watch } = useFormContext();
  const { isValid } = formState;

  const totalCount = useSelector((state: RootState) => state.supply.totalCount);
  const startDate = watch("startDateFilter");
  const endDate = watch("endDateFilter");
  const roleFamilyFilter = watch("roleFamilyFilter");
  const careerLevelFilter = watch("careerLevelFilter");

  const handleSubmitClick = () => {
    triggerSubmit();
    setSubmitted(true);
  };

  useEffect(() => {
    const dateValidationFailed
    = (startDate && !endDate) || (!startDate && endDate);

    const allFiltersEmpty
    = !startDate
      && !endDate
      && !roleFamilyFilter
      && !careerLevelFilter;
      // && !opptyTaggingFilter;

    if (isValid && !dateValidationFailed && !allFiltersEmpty) {
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setDisabled(false);
    }
    else {
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setDisabled(true);
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setSubmitted(false); // explicitly set submitted to false if conditions fail
    }
  }, [
    isValid,
    startDate,
    endDate,
    roleFamilyFilter,
    careerLevelFilter,
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
      Show
      {" "}
      {submitted ? totalCount : ""}
      {" "}
      Results
    </Button>
  );
}

export default Submit;
