import React, { useEffect, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useSelector } from "react-redux";

import type { RootState } from "@/reducers/Store";
import type { OptionType } from "@/types/lookup";

import ResponsiveAutocomplete from "@/components/ResponsiveAutocomplete";
import { useGetProjectNameByClient } from "@/services/queries/lookup";

function ProjectNameField() {
  const { control, setValue } = useFormContext();
  const clientFilter = useWatch({ control, name: "clientFilter" }) as { id?: string } | null;

  const filters = useSelector((state: RootState) => state.reports.reportFilters);
  const projectNameFilter = filters?.projectName ?? null;

  const { data } = useGetProjectNameByClient({ clientName: clientFilter?.id ?? "" });

  const options: OptionType[]
    = data?.map(item => ({ id: item, label: String(item) })) ?? [];

  const defaultValue
    = typeof projectNameFilter === "object"
      ? projectNameFilter
      : options.find(opt => opt.id === projectNameFilter) ?? null;

  // Track previous client id to detect real changes and skip initial mount
  const prevClientIdRef = useRef<string | null>(null);

  useEffect(() => {
    const currentId = clientFilter?.id ?? null;

    if (prevClientIdRef.current === null) {
      // first render: just initialize the ref, don't reset the field
      prevClientIdRef.current = currentId;
      return;
    }

    if (prevClientIdRef.current !== currentId) {
      // client actually changed -> clear projectNameFilter
      setValue("projectNameFilter", null, { shouldDirty: true, shouldValidate: true });
      prevClientIdRef.current = currentId;
    }
  }, [clientFilter?.id, setValue]);

  return (
    <ResponsiveAutocomplete
      name="projectNameFilter"
      label="Project Name"
      options={options}
      defaultValue={defaultValue}
      disabledInput={!clientFilter}
    />
  );
}

export default ProjectNameField;
