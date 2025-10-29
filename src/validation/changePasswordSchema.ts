import { z } from "zod";

enum Variant {
  Current = "current",
  Default = "default",
}

export const changePasswordSchema = z
  .object({
    newPassword: z.string(),
    confirmPassword: z.string(),
    currentPassword: z.string(),
    variant: z.string(),
  })
  .superRefine(({ confirmPassword, newPassword, variant, currentPassword }, ctx) => {
    if (variant === Variant.Current && !currentPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Current Password is required.",
        path: ["currentPassword"],
      });
    }

    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "New password and confirmation must match.",
        path: ["confirmPassword"],
      });
    }
  });

export const resetPasswordSchema = z
  .object({
    newPassword: z.string(),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "New password and confirmation must match.",
        path: ["confirmPassword"],
      });
    }
  });

export const currentChangePasswordSchema = z
  .object({
    newPassword: z.string(),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "New password and confirmation must match.",
        path: ["confirmPassword"],
      });
    }
  });
