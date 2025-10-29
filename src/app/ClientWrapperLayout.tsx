"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ToastContainer } from "react-toastify";

import AboutModal from "@/components/AboutModal";
import ComingSoonModal from "@/components/ComingSoonModal";
import Navigation from "@/components/Navigation";
import Providers from "@/components/Providers";
import { useInitializeUser } from "@/hooks/useInitializeUser";
import ReactQueryProvider from "@/services/ReactQueryProvider";
import theme from "@/theme";

function LayoutContent({ children }: { children: React.ReactNode }) {
  // ✅ Call after <Provider> is mounted
  useInitializeUser();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ReactQueryProvider>
          <Navigation />
          <main style={{ padding: "20px" }}>{children}</main>
          <ComingSoonModal />
          <AboutModal />
        </ReactQueryProvider>
        <ToastContainer theme="colored" />
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <LayoutContent>{children}</LayoutContent>
    </Providers>
  );
}
