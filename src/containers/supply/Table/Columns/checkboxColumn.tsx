import { Checkbox } from "@mui/material";
import React from "react";

import type { Column, SelectColumnProps, SupplyPaginationProps } from "@/types/supply";

function checkedColumns(props: SelectColumnProps): Column<SupplyPaginationProps> {
  const { isEditing, selectedRows, handleSelectRow, handleSelectAll, rows } = props;

  const isIndeterminate = (selectedRows?.length !== rows?.length) // when both checked and rows aren't equal
    && selectedRows?.length > 0 // have checked rows
    && rows?.length > 0; // have rows

  const isAllChecked = selectedRows?.length === rows?.length
    && selectedRows?.length > 0;

  return {
    key: "select",
    label: (
      <Checkbox
        disabled={isEditing}
        indeterminate={isIndeterminate}
        checked={isAllChecked}
        onChange={() => handleSelectAll()}
        color="primary"
        size="small"
      />
    ),
    render: (row: SupplyPaginationProps, index?: number | undefined) => (
      <Checkbox
        disabled={isEditing}
        checked={selectedRows.includes(row?.id ?? -1)}
        onChange={() => {
          handleSelectRow(row?.id ?? -1, index);
        }}
        color="primary"
        size="small"
      />
    ),
  };
}

export default checkedColumns;
