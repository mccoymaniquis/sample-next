import React, { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import ResponsiveTextField from "@/components/ResponsiveTextfield";
import { getCommitLevelStatus } from "@/helpers/commitLevelStatus";

function OpptyFunnelField() {
  const { control, setValue } = useFormContext();
  const commitLevel = useWatch({ control, name: "commitLevel" });

  useEffect(() => {
    setValue("opptyFunnel", getCommitLevelStatus(commitLevel));
  }, [commitLevel, setValue]);

  return (
    <ResponsiveTextField
      name="opptyFunnel"
      label="Opportunity Funnel*"
      type="text"
      isDisabled={true}
    />
  );
}

export default OpptyFunnelField;
