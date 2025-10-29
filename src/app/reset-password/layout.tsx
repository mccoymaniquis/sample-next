import type { Metadata } from "next";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import ReactQueryProvider from "@/services/ReactQueryProvider";
import theme from "@/theme";

import "../globals.css";

export const metadata: Metadata = {
  title: "Supply-Demand",
  description: "MDI Novare Supply & Demand",
  icons: {
    icon: "/favicon.ico",
  },
};

const backgroundStyles = {
  backgroundImage: "url(\"/containers/login/login-background-image.svg\")",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  color: "#185FDF",
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
};

export default function ResetPasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={backgroundStyles}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </Box>
    </ThemeProvider>
  );
}
