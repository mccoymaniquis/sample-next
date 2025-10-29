export type PaginationTypes = {
  pageSize: number;
  pageIndex: number;
};

export type TableProps = {
  data?: any[];
  columns?: any[];
  config?: any;
  StyleConfig?: any;
  PinColumns?: any;
  columnVisibility?: any;
  state?: any;
  columnOrder?: any;
  tableId?: string;
  pagination: PaginationTypes;
  verticalHover?: boolean;
  setPagination?: (pagination: PaginationTypes) => void;
  paginationEvent?: string;
  totalCount?: number;
  tableContainerStyle?: any;
  isLoading?: boolean;
  columnResizing?: boolean;
  onPagination: any;
};

export enum Density {
  compact = "compact",
}
