"use client";
import type { ReactNode } from "react";

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React from "react";

import type { ExtraKeys } from "@/types/columns";

import NoResultsFound from "@/components/NoResultsFound";
// import NoResultsFound from "@/assets/tables/no_results_found.svg";

type Column<T> = {
  key: keyof T | ExtraKeys;
  label: ReactNode;
  render?: (row: T, index?: number) => ReactNode;
};

type PaginatedTableProps<T> = {
  title: string;
  columns: Column<T>[];
  data: T[];
  totalCount: number;
  page: number;
  setPage: (page: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (page: number) => void;
  stickyColumnPositions?: {
    [key in keyof T]?: {
      position: "left" | "right";
      offset: number;
    };
  };
  hasFilter?: boolean;
  disabledPagination?: boolean;
};

function PaginatedTable<T extends Record<string, unknown>>({
  title,
  columns,
  data,
  totalCount,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  // eslint-disable-next-line react/no-unstable-default-props
  stickyColumnPositions = {},
  hasFilter = false,
  disabledPagination = false,
}: PaginatedTableProps<T>) {
  const rowsPerPageOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#E3EDFF" }}>
            <TableRow>
              {columns.map((col) => {
                const sticky = stickyColumnPositions[col.key];
                return (
                  <TableCell
                    key={String(col.key)}
                    sx={{
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                      ...(sticky && {
                        position: "sticky",
                        [sticky.position]: sticky.offset,
                        zIndex: 2,
                        backgroundColor: "#E3EDFF",
                        boxShadow:
                          sticky.position === "left"
                            ? "2px 0 6px -2px rgba(0,0,0,0.1)"
                            : "-2px 0 6px -2px rgba(0,0,0,0.1)",
                      }),
                    }}
                  >
                    {col.label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data.length === 0
                ? (
                    <TableRow>
                      <TableCell colSpan={columns.length} align="center" sx={{ py: 5 }}>
                        <Box sx={{
                          display: "flex",
                          justifyContent: "center",
                          p: 10,
                        }}
                        >
                          <NoResultsFound page={title} hasFilter={hasFilter} />
                        </Box>
                      </TableCell>
                    </TableRow>
                  )
                : (
                    data.map((row, i) => (
                      <TableRow
                        // eslint-disable-next-line react/no-array-index-key
                        key={i}
                        sx={{
                          "backgroundColor": i % 2 === 0 ? "white" : "#F5F9FF",
                          "&:hover": {
                            backgroundColor: "#DCEBFF",
                            td: {
                              backgroundColor: "#DCEBFF !important", // Make sure all cells (including sticky) change on hover
                            },
                          },
                        }}
                      >
                        {columns.map((column) => {
                          const sticky = stickyColumnPositions[column.key];
                          return (
                            <TableCell
                              key={String(column.key)}
                              sx={{
                                whiteSpace: "nowrap",
                                ...(sticky && {
                                  "position": "sticky",
                                  [sticky.position]: sticky.offset,
                                  "zIndex": 1,
                                  "backgroundColor": i % 2 === 0 ? "white" : "#F5F9FF",
                                  "&:hover": {
                                    backgroundColor: "#DCEBFF",
                                  },
                                  "boxShadow":
                                    sticky.position === "left"
                                      ? "2px 0 6px -2px rgba(0,0,0,0.06)"
                                      : "-2px 0 6px -2px rgba(0,0,0,0.06)",
                                }),
                              }}
                            >
                              {column.render ? column.render(row, i) : String(row[column.key])}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))
                  )
            }
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        disabled={disabledPagination}
        component="div"
        count={totalCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage ?? 10}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
      />
    </Paper>
  );
}

export default PaginatedTable;
