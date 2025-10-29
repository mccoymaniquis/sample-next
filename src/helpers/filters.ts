import type { OptionType } from "@/types/lookup";

export function isValidFilters(filters: Record<string, string | number | boolean | object | null | undefined>): boolean {
  return Object.values(filters).some((val) => {
    if (val === "" || val === null || val === undefined)
      return false;
    if (typeof val === "object") {
      return Object.keys(val).length > 0;
    }
    return true;
  });
}

export const isEmptyDropdownFields = (data: OptionType) => !data || !data.id || data.id === "";
