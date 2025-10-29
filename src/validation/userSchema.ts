import { z } from "zod";

import type { OptionType } from "@/types/lookup"; // or wherever you define it

export type CreateUserForm = {
  firstName: string;
  middleName?: string;
  lastName: string;
  suffix?: string;
  email: string;
  role: OptionType | null; // ✅ allow null explicitly
};

export const createUserSchema = z.object({
  firstName: z
    .string()
    .min(1, "First Name is required"),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1, "Last Name is required"),
  suffix: z.string().optional(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format"),
  role: z
    .object({
      id: z.union([z.string(), z.number()]),
      label: z.string().min(1, "Role label is required"),
    })
    .nullable()
    .refine(val => val !== null, {
      message: "Role is required",
    }),
});
