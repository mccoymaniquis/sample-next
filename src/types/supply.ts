import type { ReactNode } from "react";

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

export type SupplyPaginationProps = {
  id?: number;
  index?: number;
  startDate?: string | null;
  select?: string | null;
  endDate?: string | null;
  name?: string;
  roleFamily?: string;
  careerLevel?: number;
  headCount?: number;
  action?: string;
};

export type Column<T> = {
  key: keyof T;
  label: string | ReactNode;
  render?: (row: T, index?: number | undefined) => ReactNode;
};

export type Columns<T> = {
  key: keyof T;
  label: string | ReactNode;
  render?: (row: T) => ReactNode;
}[];

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
  search?: string;
};

export type GetSupplyResponse = {
  content: SupplyItem[];
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

export type SupplyFormValues = FilterProps & {
  [key: string]: string | null; // key pattern: projectName-<id>, etc.
};

export type SupplyItem = {
  id?: number;
  name?: string;
  roleFamily?: string;
  careerLevel?: number;
  headCount?: number;
  startDate?: string;
  endDate?: string;
  index?: number;
};

export type FilterProps = {
  startDateFilter?: string | Date | null;
  nameFilter?: string | null;
  endDateFilter?: string | Date | null;
  roleFamilyFilter?: OptionType | null;
  careerLevelFilter?: OptionType | null;
  headCountFilter?: OptionType | null;
  search?: string | null;
};

export type SupplyState = {
  data: SupplyPaginationProps[] | null;
  totalCount: number;
  supplyFilters?: FilterProps;
};

export type SelectColumnProps = {
  selectedRows: number[];
  handleSelectRow: (id: number, index?: number | undefined) => void;
  handleSelectAll: () => void;
  rows: SupplyPaginationProps[];
  isEditing: boolean;
};
