import React from "react";

import ResponsiveAutocomplete from "@/components/ResponsiveAutocomplete";
import { opptyFunnelOptions } from "@/constants/filters";

function OpptyFunnelField() {
  return (
    <ResponsiveAutocomplete name="opptyFunnelFilter" label="Oppty Funnel" options={opptyFunnelOptions} />
  );
}

export default OpptyFunnelField;
