export type MonthDayProps = {
  month: number;
  day: number;
};

export type ClearFiltersButtonProps = {
  fullWidth?: boolean;
  defaultValues?: any;
};

export type OptionTypeProps = {
  id: string;
  label: string;
};

export type ChartsFilterProps<T extends OptionTypeProps> = {
  demandLevel?: T | null;
  year: T | null;
  month: T | null;
};
