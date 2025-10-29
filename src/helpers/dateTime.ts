import moment from "moment";

export const DATE_FORMAT = "YYYY-MM-DD";

export type FormatDateProps = {
  value: string | Date | moment.Moment | null | undefined;
  format?: string;
};

export function formatDate(props: FormatDateProps) {
  const { value, format = DATE_FORMAT } = props;
  return value ? moment(value).format(format) : undefined;
}

export function parseDate(value: unknown): Date | undefined {
  if (value instanceof Date)
    return value;
  if (typeof value === "string" || typeof value === "number") {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? undefined : parsed;
  }
  return undefined;
}
