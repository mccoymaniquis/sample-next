import { Button } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/reducers/Store";

import { setModalVisibility } from "@/reducers/Modal";
import { clearSupplyData } from "@/reducers/Supply";

function ResetFilter() {
  const dispatch = useDispatch();
  const { reset } = useFormContext();
  const filters = useSelector((state: RootState) => state.supply.supplyFilters);

  const searchText = filters?.search ?? undefined;
  const startDateText = filters?.startDateFilter ?? undefined;
  const endDateText = filters?.endDateFilter ?? null;
  const roleFamilyText = filters?.roleFamilyFilter ?? null;
  const careerLevelText = filters?.careerLevelFilter ?? null;

  const clearFilter = () => {
    dispatch(setModalVisibility({ key: "showSupplyFilters", value: false }));
    dispatch(clearSupplyData());

    reset({
      startDateFilter: null,
      endDateFilter: null,
      roleFamilyFilter: null,
      careerLevelFilter: null,
      search: "",
    });
  };

  if (
    !searchText
    && !startDateText
    && !endDateText
    && !roleFamilyText
    && !careerLevelText
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
