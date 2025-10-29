import type { Metadata } from "next";

import "../globals.css";
import ClientLayoutWrapper from "../ClientWrapperLayout";

export const metadata: Metadata = {
  title: "Supply-Demand",
  description: "MDI Novare Supply & Demand",
};

export default function UserManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayoutWrapper>{children}</ClientLayoutWrapper>;
}
