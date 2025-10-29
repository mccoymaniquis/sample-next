"use client";
/* eslint-disable react-hooks-extra/no-direct-set-state-in-use-effect */
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box, Button, Typography } from "@mui/material";
import { isAxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import type { AlertOption } from "@/components/CustomAlert";
import type { Decoded } from "@/types";

import Logo from "@/assets/login/logo.svg";
import CustomAlert from "@/components/CustomAlert";
import { encryptPassword } from "@/helpers/encrypt";
import { useResetPassword } from "@/services/mutations/changePassword";
import { resetPasswordSchema } from "@/validation/changePasswordSchema";

import ConfirmPasswordField from "./ConfirmPasswordField";
import { formStyles } from "./constants";
import Criteria from "./Criteria";
import NewPasswordField from "./NewPasswordField";
import RedirectWithCountdown from "./RedirectWithCountdown";
import SubmitButton from "./SubmitButton";

export function ExpiredResetPasswordLink() {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        p: 4,
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        maxWidth: "460px",
        width: "100%",
      }}
    >
      <ErrorOutlineIcon color="error" sx={{ fontSize: 40 }} />

      <Typography variant="h6" color="error" fontWeight={600}>
        Expired Reset Password Link
      </Typography>

      <Typography variant="body1" sx={{ textAlign: "center", color: "#333" }}>
        For your security, this password reset link has expired.
      </Typography>

      <Typography variant="body2" sx={{ textAlign: "center", color: "#333" }}>
        Reset links are valid for 30 minutes after they are sent.
        {" "}
        <br />
        Please request a new link to reset your password.
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%", mt: 2 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={() => (window.location.href = "/forgot-password")}
        >
          Request New Link
        </Button>

        <Button
          variant="outlined"
          fullWidth
          onClick={() => (window.location.href = "/login")}
        >
          Back to Login
        </Button>
      </Box>
    </Box>
  );
}

const ChangePassword: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tokenFromUrl = params.get("token");
      setToken(tokenFromUrl);

      if (!tokenFromUrl) {
        window.location.href = "/login";
        return;
      }

      try {
        const decoded = jwtDecode<Decoded>(tokenFromUrl);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTime) {
          setIsExpired(true);
        }
        else {
          setToken(tokenFromUrl);
        }
      }
      catch (err) {
        console.error("Invalid token:", err);
        window.location.href = "/login";
      }
    }
  }, []);

  const [isSuccess, setSuccess] = useState(false);
  const [alertOpt, setAlert] = useState<AlertOption>({
    variant: "info",
    message: "",
    show: false,
  });

  const resetPassword = useResetPassword();
  const method = useForm({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onBlur",
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: { newPassword: string; confirmPassword: string }) => {
    const newPassword = encryptPassword(data?.newPassword);
    if (!token)
      return;
    try {
      await resetPassword.mutateAsync({
        token,
        newPassword,
      });

      setSuccess(true);
      setAlert({
        variant: "success",
        message: "Password has been reset successfully. Please log in with your new password.",
      });
    }
    catch (error: any) {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message || "Something went wrong.";
        setAlert({
          variant: "error",
          message,
          show: true,
        });
        return;
      }

      setAlert({
        variant: "error",
        message: "An unknown error occurred.",
        show: true,
      });
    }
  };

  const handleCloseMessage = () => {
    setAlert({
      variant: "error",
      message: "",
      show: false,
    });
  };

  if (isExpired) {
    return <ExpiredResetPasswordLink />;
  }

  if (!token)
    return null;

  return (
    <Box
      sx={{
        flexDirection: "column",
        alignItems: "center",
        display: "flex",
        py: "30px",
        px: "30px",
        flex: 1,
        gap: 4,
        backgroundColor: "#fff",
        width: "100%",
        maxWidth: "fit-content",
        borderRadius: "8px",
      }}
    >
      <Logo style={{ width: "160px", height: "45px" }} />
      <Typography variant="h6">Reset Password</Typography>
      <FormProvider {...method}>
        {isSuccess
          ? (
              <Box style={formStyles}>
                <CustomAlert option={alertOpt} />
                <RedirectWithCountdown />
              </Box>
            )
          : (
              <Box
                component="form"
                onSubmit={method.handleSubmit(onSubmit)}
                className="change-password-form"
                style={formStyles}
              >
                {alertOpt.show && (
                  <CustomAlert close={handleCloseMessage} option={alertOpt} />
                )}
                <NewPasswordField />
                <Criteria />
                <ConfirmPasswordField />
                <SubmitButton />
              </Box>
            )}
      </FormProvider>
    </Box>
  );
};

export default ChangePassword;
