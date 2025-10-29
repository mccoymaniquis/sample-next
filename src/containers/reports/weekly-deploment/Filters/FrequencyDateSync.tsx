import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

function FrequencyDateSync() {
  const { setValue } = useFormContext();
  const frequency = useWatch({ name: "frequency" });

  useEffect(() => {
    setValue("date", ""); // Reset date when frequency changes
  }, [frequency, setValue]);

  return null; // This component renders nothing
}

export default FrequencyDateSync;
