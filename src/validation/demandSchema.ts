import { z } from "zod";

export const dateRangeSchema = z
  .object({
    startDateFilter: z.any().nullable().optional(),
    endDateFilter: z.any().nullable().optional(),
    roleFamilyFilter: z.any().nullable().optional(),
    careerLevelFilter: z.any().nullable().optional(),
    opptyTaggingFilter: z.any().nullable().optional(),
    opptyFunnelFilter: z.any().nullable().optional(),
    soTagFilter: z.any().nullable().optional(),
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

const decimalRegex = /^\d+(\.\d{1,2})?$/;
const decimalMaxTwoRegex = /^\d+(\.\d+)?$/;

export const demandFormSchema = z
  .object({
    client: z.string().min(1, "Client is required"),
    projectName: z.string().min(1, "Project name is required"),
    roleFamily: createOptionSchema("Role Family"),
    careerLevel: createOptionSchema("Career Level"),
    allocation: z
      .string()
      .min(1, "Allocation is required")
      .regex(decimalMaxTwoRegex, "Invalid input. Please check the value.")
      .refine(
        (val) => {
          const parts = val.split(".");
          return parts.length < 2 || parts[1].length <= 2; // no more than 2 decimals
        },
        { message: "Please enter a valid number with exactly 2 decimal places." },
      ),

    startDate: z.any().refine(val => val !== null, {
      message: "Start date is required",
    }),
    endDate: z.any().refine(val => val !== null, {
      message: "End date is required",
    }),

    commitLevel: createOptionSchema("Commit Level"),

    opptyFunnel: z.string().min(1, "Opportunity funnel is required"),
    soTag: z.string().min(1, "SO Tag is required"),
    opptyNumber: z.string().min(1, "Opportunity number is required"),
    originalHC: z.string()
      .min(1, "Original HC is required")
      .regex(decimalRegex, "Invalid input. Please check the value."),
    probability: z.string()
      .min(1, "Probability is required")
      .regex(decimalRegex, "Invalid input. Please check the value."),
    resourceName: z.string().min(1, "Resource name is required"),

    projectStartDate: z.any().refine(val => val !== null, {
      message: "Project start date is required",
    }),
    projectEndDate: z.any().refine(val => val !== null, {
      message: "Project end date is required",
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

    // Project range: projectStartDate / projectEndDate
    const psHas = hasValue(data.projectStartDate);
    const peHas = hasValue(data.projectEndDate);

    if (psHas && !peHas) {
      ctx.addIssue({
        path: ["projectEndDate"],
        message: "Project end date is required when project start date is provided",
        code: z.ZodIssueCode.custom,
      });
    }
    if (peHas && !psHas) {
      ctx.addIssue({
        path: ["projectStartDate"],
        message: "Project start date is required when project end date is provided",
        code: z.ZodIssueCode.custom,
      });
    }

    const psTs = toDate(data.projectStartDate);
    const peTs = toDate(data.projectEndDate);
    if (psHas && peHas && psTs !== null && peTs !== null && peTs < psTs) {
      ctx.addIssue({
        path: ["projectEndDate"],
        message: "Project End Date should not be earlier before project start date",
        code: z.ZodIssueCode.custom,
      });
    }
  });
