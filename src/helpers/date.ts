import moment from "moment";

/**
 * This returns start and end dates as object in format YYYY-MM-DD
 *
 * ex. 2025-01-01, 2025-01-31
 *
 * @param object
 * @param "object.year"
 * @param "object.month"
 *
 * @returns object { startDate:string, endDate: string }
 */
export function setStartAndEndDates({ year, month }: { year: string; month: string }) {
  const date = moment(`${year} ${month}`);
  const startDate = date.startOf("month").format("YYYY-MM-DD") as string;
  const endDate = date.endOf("month").format("YYYY-MM-DD") as string;

  return { startDate, endDate };
}

export function toISOorNull(v?: string | number | Date | null | undefined) {
  if (v == null || v === undefined)
    return undefined;
  const d = v instanceof Date ? v : new Date(v);
  // eslint-disable-next-line unicorn/prefer-number-properties
  return isNaN(d.getTime()) ? undefined : d.toISOString();
};
