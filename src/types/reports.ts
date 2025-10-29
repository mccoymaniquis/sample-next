import type { OptionType } from "./lookup";

export type ReportsPaginationProps = {
  id: number;
  date: string;
  roleFamily: string;
  careerLevel: number;
  demandWon: number;
  demandRenewal: number;
  demandCommit: number;
  demandLikely: number;
  demandUpside: number;
  demandInvestmentTraining: number;
  demandPOC: number;
  demandPillarInvestment: number;
  supply: number;
  benchAfterWon: number;
  benchAfterWonRenewal?: number;
  benchAfterRenewalCommit: number;
  benchAfterPOC: number;
  benchAfterLikely: number;
  benchAfterUpsideAndAllOthers: number;
  action?: string;
};

export type FilterOptions = {
  startDate?: string | null;
  endDate?: string | null;
  date?: string | null;
  page?: number;
  size?: number;
  roleFamily?: string | null | undefined;
  careerLevel?: number | null | undefined;
  frequency?: string | null | undefined;
};

export type FilterProps = {
  roleFamilyFilter?: OptionType | null;
  careerLevelFilter?: OptionType | null;
  roleFamily?: OptionType | null;
  careerLevel?: OptionType | null;
  startDateFilter?: string | Date | null;
  endDateFilter?: string | Date | null;
  date?: string | Date | null;
  frequency?: OptionType | null;
  projectNameFilter?: OptionType | null;
  clientFilter?: OptionType | null;
  projectName?: OptionType | null;
  client?: OptionType | null;
};

export type ReportState = {
  data: ReportsPaginationProps[] | null;
  totalCount: number;
  reportFilters?: FilterProps;
};
