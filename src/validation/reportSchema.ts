import { z } from "zod";

const normalizeDate = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

export const dateRangeSchema = z
  .object({
    startDateFilter: z.union([z.string(), z.date()]).nullable().optional(),
    endDateFilter: z.union([z.string(), z.date()]).nullable().optional(),
    roleFamilyFilter: z.any().nullable().optional(),
    careerLevelFilter: z.any().nullable().optional(),
    clientFilter: z.any().nullable().optional(),
    projectNameFilter: z.any().nullable().optional(),
    date: z.union([z.string(), z.date()]).nullable().optional(),
    frequency: z.any().nullable().optional(),
  })
  .superRefine((data, ctx) => {
    const { startDateFilter, endDateFilter } = data;

    if (startDateFilter && !endDateFilter) {
      ctx.addIssue({
        path: ["endDateFilter"],
        message: "End date is required when start date is provided",
        code: z.ZodIssueCode.custom,
      });
    }

    if (endDateFilter && !startDateFilter) {
      ctx.addIssue({
        path: ["startDateFilter"],
        message: "Start date is required when end date is provided",
        code: z.ZodIssueCode.custom,
      });
    }

    if (startDateFilter && endDateFilter) {
      const start = normalizeDate(new Date(startDateFilter));
      const end = normalizeDate(new Date(endDateFilter));

      if (end.getTime() < start.getTime()) {
        ctx.addIssue({
          path: ["endDateFilter"],
          message: "End date must be after or equal to start date",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });
