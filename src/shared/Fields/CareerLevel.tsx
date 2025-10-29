import React from "react";

import type { OptionType } from "@/types/lookup";

import ResponsiveAutocomplete from "@/components/ResponsiveAutocomplete";
import { useGetCareerLevel } from "@/services/queries/lookup";

function CareerLevelField({ name, defaultValue }: { defaultValue: any; name: string }) {
  const { data: careerLevelData } = useGetCareerLevel();

  const options: OptionType[] = careerLevelData?.map(item => ({
    id: item,
    label: String(item),
  })) || [];

  const selected = options.filter(opt => String(opt.id) === String(defaultValue))[0] ?? null;

  return (
    <ResponsiveAutocomplete name={name} options={options} defaultValue={selected} />
  );
}

export default CareerLevelField;
