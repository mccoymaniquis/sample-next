import React from "react";

import type { OptionType } from "@/types/lookup";

import ResponsiveAutocomplete from "@/components/ResponsiveAutocomplete";
import { useGetRoleFamily } from "@/services/queries/lookup";

function RoleFamilyField() {
  const { data: roleFamilyData } = useGetRoleFamily();

  const options: OptionType[] = roleFamilyData?.map(item => ({
    id: item,
    label: item,
  })) || [];

  return (
    <ResponsiveAutocomplete name="roleFamily" label="Role Family*" options={options} />
  );
}

export default RoleFamilyField;
