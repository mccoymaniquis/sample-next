import React from "react";

import ResponsiveTextField from "@/components/ResponsiveTextfield";

const ConfirmPasswordField: React.FC = () => {
  return (
    <ResponsiveTextField name="confirmPassword" label="Confirm Password" type="password" />
  );
};

export default ConfirmPasswordField;
