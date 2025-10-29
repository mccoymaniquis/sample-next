import type { ReactNode } from "react";

export type DemandPaginationProps = {
  id?: number;
  client?: string;
  projectName?: string;
  roleFamily?: string;
  careerLevel?: string | undefined;
  allocation?: string;
  startDate?: string | Date | undefined;
  endDate?: string | Date | undefined;
  commitLevel?: string;
  opptyTagging?: string;
  opptyFunnel?: string;
  soTag?: string;
  opptyNumber?: string;
  originalHC?: string;
  probability?: string;
  resourceName?: string;
  projectStartDate?: string | Date | undefined;
  projectEndDate?: string | Date | undefined;
  action?: string;
};

export type FilterOptions = {
  startDate?: string | null;
  endDate?: string | null;
  page?: number;
  size?: number;
  status?: string;
  limit?: number;
  sortBy?: string;
  sort?: string;
  id?: number;
  total?: number;
  roleFamily?: string;
  careerLevel?: string;
  opptyTagging?: string;
  opptyFunnel?: string;
  soTag?: string;
  search?: string;
};

export type Column<T> = {
  key: keyof T | "select" | "action";
  label: ReactNode;
  render?: (row: T) => ReactNode;
}[];

export type DemandItem = {
  id: number;
  projectName: string;
  roleFamily?: string;
  careerLevel?: number | undefined;
  allocation: number;
  startDate: string | Date | undefined | null;
  endDate: string | Date | undefined | null;
  opptyTagging: string;
  opptyFunnel: string;
  soTag: string;
  opptyNumber: string;
  originalHC: number;
  probability: number;
  resourceName: string;
  client: string;
  commitLevel: string;
  projectStartDate: string | Date | undefined | null;
  projectEndDate: string | Date | undefined | null;
};

export type SortInfo = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

export type Pageable = {
  pageNumber: number;
  pageSize: number;
  sort: SortInfo;
  offset: number;
  unpaged: boolean;
  paged: boolean;
};

export type GetDemandResponse = {
  content: DemandItem[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: SortInfo;
  numberOfElements: number;
  empty: boolean;
};

export type OptionType = {
  id: number | string;
  label: string;
};

export type FilterProps = {
  startDateFilter?: string | Date | null;
  endDateFilter?: string | Date | null;
  roleFamilyFilter?: OptionType | null;
  careerLevelFilter?: OptionType | null;
  opptyTaggingFilter?: OptionType | null;
  opptyFunnelFilter?: OptionType | null;
  soTagFilter?: OptionType | null;
  search?: string | null;
};

export type DemandFormValues = FilterProps & {
  [key: string]: string | null; // key pattern: projectName-<id>, etc.
};

export type DemandState = {
  data: DemandPaginationProps[] | null;
  totalCount: number;
  demandFilters?: FilterProps;
  activeDemand?: DemandPaginationProps | null;
};

export type DemandForm = {
  client: string;
  projectName: string;
  roleFamily: OptionType | null;
  careerLevel: OptionType | null;
  allocation: string;
  startDate?: string | Date | undefined | null;
  endDate?: string | Date | undefined | null;
  commitLevel: OptionType | null;
  opptyFunnel: string;
  soTag: string;
  opptyNumber: string;
  originalHC: string;
  probability: string;
  resourceName: string;
  projectStartDate?: string | Date | undefined | null;
  projectEndDate?: string | Date | undefined | null;
};

export type DemandFormSchema = {
  id?: number;
  client: string;
  projectName?: string;
  roleFamily?: string;
  careerLevel: string;
  allocation: string;
  startDate?: string | Date | undefined | null;
  endDate?: string | Date | undefined | null;
  commitLevel?: string;
  opptyFunnel: string;
  soTag: string;
  opptyNumber: string;
  originalHC: string;
  probability: string;
  resourceName: string;
  projectStartDate?: string | Date | undefined | null;
  projectEndDate?: string | Date | undefined | null;
  opptyTagging?: string;
};
