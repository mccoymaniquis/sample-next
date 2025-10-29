import React from "react";

import ResponsiveAutocomplete from "@/components/ResponsiveAutocomplete";
import { frequencies } from "@/constants/filters";

function FrequencyField() {
  return (
    <ResponsiveAutocomplete name="frequency" label="Frequency" options={frequencies} />
  );
}

export default FrequencyField;
