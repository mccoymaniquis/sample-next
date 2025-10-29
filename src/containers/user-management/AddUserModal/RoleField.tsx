import React from "react";

import type { OptionType } from "@/types/lookup";

import ResponsiveAutocomplete from "@/components/ResponsiveAutocomplete";

const ROLES = ["RMG", "EXECOM"];

function RoleField() {
  const options: OptionType[] = ROLES?.map(item => ({
    id: item,
    label: item,
  })) || [];

  return (
    <ResponsiveAutocomplete name="role" label="Role*" options={options} sx={{ mt: 0 }} />
  );
}

export default RoleField;
