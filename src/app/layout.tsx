import type { Metadata } from "next";

import CssBaseline from "@mui/material/CssBaseline";

import "./globals.css";

import { ThemeProvider } from "@mui/material/styles";
import { Montserrat } from "next/font/google";

import ReactQueryProvider from "@/services/ReactQueryProvider";
import theme from "@/theme"; // adjust this path if needed

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Supply-Demand",
  description: "MDI Novare Supply & Demand",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${montserrat.variable} antialiased`}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
