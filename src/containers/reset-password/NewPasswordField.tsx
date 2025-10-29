import React from "react";

import ResponsiveTextField from "@/components/ResponsiveTextfield";

const NewPasswordField: React.FC = () => {
  return (
    <ResponsiveTextField name="newPassword" label="New Password" type="password" />
  );
};

export default NewPasswordField;
