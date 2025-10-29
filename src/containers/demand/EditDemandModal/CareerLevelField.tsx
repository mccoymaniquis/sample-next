import React from "react";

import type { OptionType } from "@/types/lookup";

import ResponsiveAutocomplete from "@/components/ResponsiveAutocomplete";
import { useGetCareerLevel } from "@/services/queries/lookup";

function CareerLevelField() {
  const { data: careerLevelData } = useGetCareerLevel();

  const options: OptionType[] = careerLevelData?.map(item => ({
    id: item,
    label: String(item),
  })) || [];

  return (
    <ResponsiveAutocomplete name="careerLevel" label="Career Level*" options={options} />
  );
}

export default CareerLevelField;
