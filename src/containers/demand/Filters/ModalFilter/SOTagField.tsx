import React from "react";

import ResponsiveAutocomplete from "@/components/ResponsiveAutocomplete";
import { soTagOptions } from "@/constants/filters";

function SOTagField() {
  return (
    <ResponsiveAutocomplete name="soTagFilter" label="SO Tag" options={soTagOptions} />
  );
}

export default SOTagField;
