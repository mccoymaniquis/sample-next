import React from "react";
import { useSelector } from "react-redux";

import type { RootState } from "@/reducers/Store";
import type { OptionType } from "@/types/lookup";

import ResponsiveAutocomplete from "@/components/ResponsiveAutocomplete";
import { useGetCommitLevel } from "@/services/queries/lookup";

function OpptyTaggingField() {
  const filters = useSelector((state: RootState) => state.demand.demandFilters);
  const opptyTaggingFilter = filters?.opptyTaggingFilter ?? null;
  const { data: commitLevelData } = useGetCommitLevel();

  const options: OptionType[] = commitLevelData?.map(item => ({
    id: item,
    label: String(item),
  })) || [];

  const defaultValue
      = typeof opptyTaggingFilter === "object"
        ? opptyTaggingFilter
        : options.find(opt => opt.id === opptyTaggingFilter) ?? null;
  return (
    <ResponsiveAutocomplete name="opptyTaggingFilter" label="Commit Level" options={options} defaultValue={defaultValue} />
  );
}

export default OpptyTaggingField;
