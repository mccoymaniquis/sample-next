// src/hooks/useSubmit.ts
import { use } from "react";

import { SubmitContext } from "@/containers/SubmitContext"; // Adjust path as needed

export function useSubmit() {
  const context = use(SubmitContext);
  if (!context) {
    throw new Error("useSubmit must be used within a SubmitProvider");
  }
  return context;
}
