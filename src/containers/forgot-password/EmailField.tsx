import { useFormContext } from "react-hook-form";

import ResponsiveTextField from "@/components/ResponsiveTextfield";

function EmailField() {
  const { watch } = useFormContext();

  const counter = watch("counter");
  const cooldownRemaining = watch("cooldownRemaining");

  const isDisabled = counter > 0 || cooldownRemaining !== null;

  return (
    <ResponsiveTextField
      name="email"
      label="Email*"
      type="email"
      isDisabled={isDisabled}
    />
  );
}

export default EmailField;
