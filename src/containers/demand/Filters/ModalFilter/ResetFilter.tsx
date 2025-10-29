import { Button } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/reducers/Store";

import { clearDemandData } from "@/reducers/Demand";

function ResetFilter() {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.demand.demandFilters);

  const { reset } = useFormContext();

  const searchText = filters?.search ?? undefined;
  const startDateText = filters?.startDateFilter ?? undefined;
  const endDateText = filters?.endDateFilter ?? null;
  const roleFamilyText = filters?.roleFamilyFilter ?? null;
  const careerLevelText = filters?.careerLevelFilter ?? null;
  const opptyTaggingText = filters?.opptyTaggingFilter ?? null;
  const opptyFunnelText = filters?.opptyFunnelFilter ?? null;
  const soTagText = filters?.soTagFilter ?? null;

  const clearFilter = () => {
    dispatch(clearDemandData());
    reset({
      startDateFilter: null,
      endDateFilter: null,
      roleFamilyFilter: null,
      careerLevelFilter: null,
      opptyTaggingFilter: null,
      opptyFunnelFilter: null,
      soTagFilter: null,
      search: "",
    });
  };

  if (
    !searchText
    && !startDateText
    && !endDateText
    && !roleFamilyText
    && !careerLevelText
    && !opptyTaggingText
    && !opptyFunnelText
    && !soTagText
  ) {
    return null;
  }

  return (
    <Button
      onClick={clearFilter}
      sx={{
        background: "#fff",
        borderRadius: "8px",
        padding: "3px",
        backgroundClip: "content-box, border-box",
        height: "44px",
        width: "100%",
      }}
    >
      Reset Filter
    </Button>
  );
}

export default ResetFilter;
