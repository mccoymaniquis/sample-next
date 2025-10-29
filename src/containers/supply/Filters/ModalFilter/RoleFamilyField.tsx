import React from "react";
import { useSelector } from "react-redux";

import type { RootState } from "@/reducers/Store";
import type { OptionType } from "@/types/lookup";

import ResponsiveAutocomplete from "@/components/ResponsiveAutocomplete";
import { useGetRoleFamily } from "@/services/queries/lookup";

function RoleFamilyField() {
  const filters = useSelector((state: RootState) => state.supply.supplyFilters);
  const roleFamilyFilter = filters?.roleFamilyFilter ?? null;

  const { data: roleFamilyData } = useGetRoleFamily();

  const options: OptionType[] = roleFamilyData?.map(item => ({
    id: item,
    label: item,
  })) || [];

  const defaultValue
    = typeof roleFamilyFilter === "object"
      ? roleFamilyFilter
      : options.find(opt => opt.id === roleFamilyFilter) ?? null;

  return (
    <ResponsiveAutocomplete name="roleFamilyFilter" label="Role Family" options={options} defaultValue={defaultValue} />
  );
}

export default RoleFamilyField;
