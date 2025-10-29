import React from "react";

import type { OptionType } from "@/types/lookup";

import ResponsiveAutocomplete from "@/components/ResponsiveAutocomplete";
import { useGetClientNames } from "@/services/queries/lookup";

function ClientField() {
  const { data: careerLevelData } = useGetClientNames();

  const options: OptionType[] = careerLevelData?.map(item => ({
    id: item,
    label: String(item),
  })) || [];

  return (
    <ResponsiveAutocomplete name="clientFilter" label="Client" options={options} />
  );
}

export default ClientField;
