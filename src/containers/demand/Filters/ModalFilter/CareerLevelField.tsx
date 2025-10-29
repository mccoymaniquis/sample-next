import React from "react";
import { useSelector } from "react-redux";

import type { RootState } from "@/reducers/Store";
import type { OptionType } from "@/types/lookup";

import ResponsiveAutocomplete from "@/components/ResponsiveAutocomplete";
import { useGetCareerLevel } from "@/services/queries/lookup";

function CareerLevelField() {
  const filters = useSelector((state: RootState) => state.demand.demandFilters);
  const careerLevelFilter = filters?.careerLevelFilter ?? null;
  const { data: careerLevelData } = useGetCareerLevel();

  const options: OptionType[] = careerLevelData?.map(item => ({
    id: item,
    label: String(item),
  })) || [];

  const defaultValue
    = typeof careerLevelFilter === "object"
      ? careerLevelFilter
      : options.find(opt => opt.id === careerLevelFilter) ?? null;

  return (
    <ResponsiveAutocomplete name="careerLevelFilter" label="Career Level" options={options} defaultValue={defaultValue} />
  );
}

export default CareerLevelField;
