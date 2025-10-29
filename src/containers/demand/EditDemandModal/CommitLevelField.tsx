import React from "react";

import type { OptionType } from "@/types/lookup";

import ResponsiveAutocomplete from "@/components/ResponsiveAutocomplete";
import { useGetCommitLevel } from "@/services/queries/lookup";

function CommitLevelField() {
  const { data: commitLevelData } = useGetCommitLevel();

  const options: OptionType[] = commitLevelData?.map(item => ({
    id: item,
    label: String(item),
  })) || [];

  return (
    <ResponsiveAutocomplete name="commitLevel" label="Commit Level*" options={options} />
  );
}

export default CommitLevelField;
