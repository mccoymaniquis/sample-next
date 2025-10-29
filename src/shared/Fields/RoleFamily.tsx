import { toUpper } from "lodash";
import React from "react";

import type { OptionType } from "@/types/lookup";

import ResponsiveAutocomplete from "@/components/ResponsiveAutocomplete";
import { useGetRoleFamily } from "@/services/queries/lookup";

function RoleFamilyField({ name, defaultValue }: { defaultValue: any; name: string; label: string }) {
  const { data: roleFamilyData } = useGetRoleFamily();
  const options: OptionType[] = roleFamilyData?.map(item => ({
    id: toUpper(item),
    label: toUpper(item),
  })) || [];

  const defaultValues = options.filter(opt => toUpper(opt.id as string) === defaultValue)[0] ?? null;

  return (
    <>
      <ResponsiveAutocomplete name={name} options={options} defaultValue={defaultValues} />
    </>
  );
}

export default RoleFamilyField;
