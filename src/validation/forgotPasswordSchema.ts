import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email."),
  counter: z.number().min(0, "Counter must be at least 0."),
});
