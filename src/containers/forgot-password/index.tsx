/* eslint-disable node/no-process-env */
"use client";
import type { AlertColor } from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Typography } from "@mui/material";
import { isAxiosError } from "axios";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import Logo from "@/assets/login/logo.svg";
import CustomAlert from "@/components/CustomAlert";
import { useForgotPassword } from "@/services/mutations/forgotPassword";
import { forgotPasswordSchema } from "@/validation/forgotPasswordSchema";

import { formStyles } from "./constants";
import EmailField from "./EmailField";
import SubmitButton from "./SubmitButton";

type ForgotPasswordFormValues = {
  email: string;
  counter: number;
  cooldownRemaining?: number | null;
};

export type AlertOptionType = {
  variant: AlertColor;
  message: string;
  show: boolean;
};

const FIRST_ATTEMPT_MESSAGE = "A reset password link has been sent to your email.";
const SECOND_ATTEMPT_MESSAGE = "A new reset password link has been sent to your email.";

const ForgotPassword: React.FC = () => {
  const [alertOpt, setAlert] = useState<AlertOptionType>({
    variant: "info",
    message: "",
    show: false,
  });

  const [cooldownDisplay, setCooldownDisplay] = useState<number | null>(null);
  const forgotPassword = useForgotPassword();

  const method = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      counter: 0,
      cooldownRemaining: null,
    },
  });

  const counter = method.watch("counter");

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      const result = await forgotPassword.mutateAsync({ email: data.email });
      const { resendAttempts } = result;

      method.setValue("counter", resendAttempts);
      setAlert({
        variant: "success",
        message: resendAttempts > 1 ? SECOND_ATTEMPT_MESSAGE : FIRST_ATTEMPT_MESSAGE,
        show: true,
      });
    }
    catch (error: unknown) {
      if (isAxiosError(error)) {
        const message = error?.response?.data?.message || "Something went wrong.";
        const thirdAttemptTime = error?.response?.data?.thirdAttemptTime;

        if (thirdAttemptTime) {
          const parsedUTC
            = process.env.NEXT_PUBLIC_NODE_UTC_ENV === "local"
              ? moment(thirdAttemptTime)
              : moment.utc(thirdAttemptTime);
          const expireAt = parsedUTC.add(15, "minutes");
          const now
            = process.env.NEXT_PUBLIC_NODE_UTC_ENV === "local" ? moment() : moment.utc();
          const remaining = Math.max(0, expireAt.diff(now, "seconds"));

          setCooldownDisplay(remaining);
          method.setValue("cooldownRemaining", remaining);
        }

        setAlert({
          variant: "error",
          message,
          show: true,
        });
      }
      else {
        setAlert({
          variant: "error",
          message: "Unexpected error occurred.",
          show: true,
        });
      }
    }
  };

  const handleCloseMessage = () => setAlert(prev => ({ ...prev, show: false }));

  useEffect(() => {
    if (cooldownDisplay === null)
      return;

    const interval = setInterval(() => {
      setCooldownDisplay((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          method.setValue("cooldownRemaining", null);
          method.setValue("counter", 0);
          setAlert(prev => ({ ...prev, show: false }));
          return null;
        }

        const newValue = prev - 1;
        method.setValue("cooldownRemaining", newValue);
        return newValue;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldownDisplay, method]);

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
      <Typography variant="h6">Forgot Password</Typography>
      <FormProvider {...method}>
        <Box
          component="form"
          onSubmit={method.handleSubmit(onSubmit)}
          className="forgot-password-form"
          style={formStyles}
        >
          {alertOpt.show && <CustomAlert option={alertOpt} close={handleCloseMessage} />}
          <EmailField />
          <SubmitButton />

          <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
            <Link
              href="/login"
              style={{ textDecoration: "none", color: "#407CF1" }}
            >
              <Typography
                sx={{
                  "fontSize": { xs: "12px", sm: "14px" },
                  "fontWeight": 500,
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Back to Login
              </Typography>
            </Link>
          </Box>

          {(counter > 0 || cooldownDisplay !== null) && (
            <Typography variant="body2" sx={{ textAlign: "center", color: "#333" }}>
              Didn’t receive the email?
              {" "}
              <span
                onClick={async () => {
                  const data = method.getValues();
                  await onSubmit(data);
                }}
                style={{
                  color: cooldownDisplay ? "#A0A0A0" : "#407CF1",
                  textDecoration: cooldownDisplay ? "none" : "underline",
                  cursor: cooldownDisplay ? "default" : "pointer",
                  pointerEvents: cooldownDisplay ? "none" : "auto",
                  transition: "0.2s",
                }}
              >
                Resend link.
              </span>
            </Typography>
          )}

          {cooldownDisplay !== null && (
            <Typography variant="body2" sx={{ color: "red", textAlign: "center" }}>
              Resend available in
              {" "}
              {Math.floor(cooldownDisplay / 60)}
              :
              {`${cooldownDisplay % 60}`.padStart(2, "0")}
            </Typography>
          )}
        </Box>
      </FormProvider>
    </Box>
  );
};

export default ForgotPassword;
