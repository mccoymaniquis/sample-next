/* eslint-disable react-hooks-extra/no-direct-set-state-in-use-effect */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Typography } from "@mui/material";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import type { LoginParamsT } from "@/types/users";

import Logo from "@/assets/login/logo.svg";
import { encryptPassword } from "@/helpers/encrypt";
import { useLogin } from "@/services/mutations/login";
import { loginSchema } from "@/validation/loginSchema";

import EmailField from "./EmailField";
import GoogleButton from "./GoogleButton";
import OrDivider from "./OrDivider";
import PasswordField from "./PasswordField";
import SubmitButton from "./Submit";

function Login() {
  const router = useRouter();
  const login = useLogin();

  const [error, setError] = useState<string>("");

  const methods = useForm<LoginParamsT>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginParamsT) => {
    const { userName, password } = data;
    const encrypted = encryptPassword(password);
    try {
      await login.mutateAsync({
        userName,
        password: encrypted,
      });

      // console.log("✅ Login success:", result);
      // window.location.href = "/charts";
    }
    catch (error: any) {
      console.error(error);
      const message = error?.response?.data?.message || "An unexpected error occurred.";
      setError(message);
    }
  };

  useEffect(() => {
    const authError = Cookies.get("authError");
    if (authError) {
      if (authError) {
        setError("Login failed. This account is not registered in the system.");

        Cookies.remove("authError");

        router.push("/login");
      }
    }
  }, [router]);
  return (
    <Box
      sx={{
        backgroundImage: "url(\"/containers/login/login-background-image.svg\")",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        color: "#185FDF",
        width: "100vw",
        maxWidth: "100%",
        minHeight: "100vh",
        height: {
          sm: "auto",
        },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: {
          xs: 2,
          sm: 0,
        },
      }}
    >
      <Box
        sx={{
          borderRadius: "12px",
          background: "#fff",
          overflow: "hidden",
          height: "auto",
          width: "85vw",
          marginTop: 5,
          marginBottom: 5,
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
        }}
      >
        {/* RIGHT PANEL */}
        <Box
          sx={{
            flex: 1,
            paddingTop: 7,
            paddingLeft: 5,
            paddingRight: 5,
            paddingBottom: 2,
            gap: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Logo style={{ width: "160px", height: "45px" }} />
          <Typography sx={{
            fontSize: {
              xs: "20px",
              sm: "28px",
            },
            fontWeight: "600",
            lineHeight: "100%",
          }}
          >
            Supply-Demand Forecast
          </Typography>
          <FormProvider {...methods}>
            <Box
              component="form"
              onSubmit={methods.handleSubmit(onSubmit)}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "100%",
              }}
            >
              <EmailField />
              <PasswordField />
              {
                error && (
                  <Typography sx={{
                    color: "rgb(221, 38, 41)",
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  >
                    {error}
                  </Typography>
                )
              }
              <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                <Link
                  href="/forgot-password"
                  style={{ textDecoration: "none", color: "#407CF1" }}
                >
                  <Typography
                    sx={{
                      "fontSize": { xs: "12px", sm: "16px" },
                      "fontWeight": 600,
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Forgot Password?
                  </Typography>
                </Link>
              </Box>
              <SubmitButton />
            </Box>
          </FormProvider>
          <OrDivider />
          <GoogleButton />
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "end",
          }}
          >
            <Typography sx={{ fontSize: 14, fontWeight: 500, color: "#999999" }}>
              supply-demand-
              {/* eslint-disable-next-line node/no-process-env */}
              {process.env.NEXT_PUBLIC_APP_VERSION}
            </Typography>
          </Box>
        </Box>
        {/* LEFT PANEL */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#E7EFFF",
            padding: 2,
            display: {
              xs: "none",
              sm: "flex",
            },
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <Image src="/containers/login/pana.svg" alt="pana logo" height={310} width={460} />

        </Box>
      </Box>
    </Box>
  );
}

export default Login;
