import { Box, Typography } from "@mui/material";
import React from "react";
import { FormProvider } from "react-hook-form";

import Logo from "@/assets/login/logo.svg";
import CustomAlert from "@/components/CustomAlert";
import ResponsiveTextField from "@/components/ResponsiveTextfield";

import { CancelButton, Criteria, Layout, RedirectWithCountdown, SubmitButton } from "./components";
import { formStyles } from "./constants";
import { useChangePassword } from "./hooks";

enum Variant {
  Current = "current",
  Default = "default",
}

type ChangePassword = {
  variant?: "current" | "default";
};

const ChangePassword: React.FC<ChangePassword> = ({ variant = "default" }) => {
  const { handleOnSubmit, handleCloseMessage, alertOpt, isSuccess, form } = useChangePassword(variant);
  const isCurrentChangePass = variant === Variant.Current;

  return (
    <Layout>
      <Logo style={{ width: "160px", height: "45px" }} />
      <Typography variant="h6">
        Change Password
      </Typography>
      <FormProvider {...form}>
        {isSuccess
          ? (
              <Box className="redirect-with-countdown" style={formStyles}>
                <CustomAlert option={alertOpt} />
                <RedirectWithCountdown />
              </Box>
            )
          : (
              <Box
                component="form"
                onSubmit={form.handleSubmit(handleOnSubmit)}
                className="change-password-form"
                style={formStyles}
              >
                {alertOpt.show === true && (
                  <CustomAlert
                    close={handleCloseMessage}
                    option={alertOpt}
                  />
                )}
                {isCurrentChangePass && <ResponsiveTextField name="currentPassword" label="Current Password" type="password" />}
                <ResponsiveTextField name="newPassword" label="New Password" type="password" />
                <Criteria />
                <ResponsiveTextField name="confirmPassword" label="Confirm Password" type="password" />
                <SubmitButton />
                {isCurrentChangePass && <CancelButton />}
              </Box>
            )}
      </FormProvider>
    </Layout>
  );
};

export default ChangePassword;
