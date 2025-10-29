import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { memo, useEffect, useMemo, useState } from "react";

import NoResultsFound from "@/components/NoResultsFound";

import type { PaginationTypes, TableProps } from "./table.types";

import { sx, TABLE_CONFIG } from "./table.config";
import { Density } from "./table.types";
// import { muiTableBodyCellProps } from './utils';
// import { muiTableHeadCellProps } from './utils';

const DataTable: React.FC<TableProps> = memo((props) => {
  const {
    data = [],
    columns = [],
    config = TABLE_CONFIG,
    StyleConfig = sx,
    PinColumns = {},
    columnVisibility = {},
    state,
    columnOrder = [],
    tableId,
    verticalHover = false,
    columnResizing = false,
    tableContainerStyle,
    paginationEvent = "",
    totalCount,
    pagination,
    isLoading = false,
    onPagination,
  } = props;

  const [paginationData, setPagination] = useState<PaginationTypes>({
    pageSize: 10,
    pageIndex: 0,
  });

  // This is useful for reinitialization with mutiple tables in one page
  useEffect(() => {
    if (props && props.pagination) {
      const IsPageSizeEqual = paginationData.pageSize !== pagination?.pageSize;
      const IsPageIndexEqual
        = paginationData.pageIndex !== pagination?.pageIndex;

      if (IsPageSizeEqual || IsPageIndexEqual) {
        setPagination(pagination as PaginationTypes);
      }
    }
  }, [props, pagination]);

  const dependencies = [
    columns,
    data,
    isLoading,
    config,
    verticalHover,
    columnResizing,
    tableId,
    tableContainerStyle,
    StyleConfig,
    PinColumns,
    state,
    columnVisibility,
    paginationData,
    columnOrder,
    paginationEvent,
    totalCount,
    setPagination,
  ];

  const memoizedTableConf = useMemo(
    () => ({
      data: data && !isLoading ? data : [],
      columns: columns && !isLoading ? columns : [],
      ...config,
      muiPaginationProps: {
        rowsPerPageOptions: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      },
      enableColumnResizing: columnResizing,
      renderEmptyRowsFallback: () => <NoResultsFound page="Reports" hasFilter={true} />,
      muiTableContainerProps: {
        id: tableId, // need table id to allow horizontal dragging
        sx: {
          whiteSpace: "nowrap",
          maxHeight: "600px",
          overflowY: "auto",
          overflowX: "auto",
          width: "100%",
        },
      },
      muiTablePaperProps: {
        elevation: 0,
        sx: StyleConfig,
      },
      initialState: {
        columnPinning: PinColumns,
        density: Density.compact,
        ...state,
      },
      state: {
        columnPinning: PinColumns,
        columnVisibility,
        pagination,
        columnOrder,
      },
      manualPagination: !!paginationEvent,
      rowCount: totalCount ?? 0,
      onPaginationChange: (updater: (arg0: PaginationTypes) => any) => {
        // If it's a function, call it with the current state to get the next state
        const next
          = typeof updater === "function"
            ? updater(pagination)
            : updater;
        setPagination(next); // update local state
        onPagination(next);
      },
    }),
    dependencies,
  );

  const table = useMaterialReactTable(memoizedTableConf);
  return <MaterialReactTable table={table} />;
});

export default DataTable;
