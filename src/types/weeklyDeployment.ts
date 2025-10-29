import type { OptionType } from "./lookup";

export type WeeklyDeploymentProps = {
  id: number;
  client: string;
  projectName: string;
  roleFamily: string;
  careerLevel: number;
  projectStartDate: string;
  projectEndDate: string;
  demand: number;
  deployed: number;
};

export type FilterProps = {
  roleFamily?: OptionType | null;
  careerLevel?: OptionType | null;
  startDateFilter?: string | Date | null;
  endDateFilter?: string | Date | null;
  roleFamilyFilter?: OptionType | null;
  careerLevelFilter?: OptionType | null;
  date?: string | Date | null;
  client?: OptionType | null;
  projectName?: OptionType | null;
  clientFilter?: OptionType | null;
  projectNameFilter?: OptionType | null;
};

export type ReportState = {
  data: WeeklyDeploymentProps[] | null;
  totalCount: number;
  weeklyDeploymentFilter?: FilterProps;
};

export type FilterOptions = {
  startDate?: string | null;
  endDate?: string | null;
  // date?: string | null;
  // page?: number;
  // size?: number;
  roleFamily?: string | null | undefined;
  careerLevel?: number | null | undefined;
};
