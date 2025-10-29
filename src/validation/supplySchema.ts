import { z } from "zod";

export const dateRangeSchema = z
  .object({
    startDateFilter: z.any().nullable().optional(),
    endDateFilter: z.any().nullable().optional(),
    roleFamilyFilter: z.any().nullable().optional(),
    careerLevelFilter: z.any().nullable().optional(),
    searchFilter: z.string().nullable().optional(),
  })
  .catchall(z.string().nullable())
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

    if (startDateFilter && endDateFilter && endDateFilter < startDateFilter) {
      ctx.addIssue({
        path: ["endDateFilter"],
        message: "End date must be after or equal to start date",
        code: z.ZodIssueCode.custom,
      });
    }
  });

function createOptionSchema(fieldLabel: string) {
  return z
    .object({
      id: z.union([z.string(), z.number()]),
      label: z.string().min(1, `${fieldLabel} is required`),
    })
    .nullable()
    .refine(val => val !== null, {
      message: `${fieldLabel} is required`,
    });
}

export const demandFormSchema = z
  .object({
    roleFamily: createOptionSchema("Role Family"),
    careerLevel: createOptionSchema("Career Level"),
    startDate: z.any().refine(val => val !== null, {
      message: "Start date is required",
    }),
    endDate: z.any().refine(val => val !== null, {
      message: "End date is required",
    }),
  })
  .superRefine((data, ctx) => {
    const hasValue = (v: unknown) => v !== null && v !== undefined && v !== "";

    const toDate = (v: unknown): number | null => {
      if (!hasValue(v))
        return null;
      if (v instanceof Date)
        return v.getTime();
      const d = new Date(v as any);
      // eslint-disable-next-line unicorn/prefer-number-properties
      return isNaN(d.getTime()) ? null : d.getTime();
    };

    // Main range: startDate / endDate
    const sHas = hasValue(data.startDate);
    const eHas = hasValue(data.endDate);

    if (sHas && !eHas) {
      ctx.addIssue({
        path: ["endDate"],
        message: "End date is required when start date is provided",
        code: z.ZodIssueCode.custom,
      });
    }
    if (eHas && !sHas) {
      ctx.addIssue({
        path: ["startDate"],
        message: "Start date is required when end date is provided",
        code: z.ZodIssueCode.custom,
      });
    }

    const sTs = toDate(data.startDate);
    const eTs = toDate(data.endDate);
    if (sHas && eHas && sTs !== null && eTs !== null && eTs < sTs) {
      ctx.addIssue({
        path: ["endDate"],
        message: "End Date should not be earlier before start date",
        code: z.ZodIssueCode.custom,
      });
    }
  });
