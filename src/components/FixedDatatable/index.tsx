/* eslint-disable react/no-unstable-default-props */
/* eslint-disable react/no-array-index-key */
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

import NoResultsFound from "@/components/NoResultsFound";

type Column<T> = {
  key: keyof T | "select" | "action";
  label: ReactNode;
  render?: (row: T) => ReactNode;
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
  stickyColumnPositions = {},
  hasFilter = false,
}: PaginatedTableProps<T>) {
  const rowsPerPageOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const firstColKey = columns[0]?.key;

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
    <Paper elevation={1} sx={{ width: "100%" }}>
      <TableContainer>
        <Table stickyHeader sx={{ width: "100%", tableLayout: "fixed" }}>
          <TableHead sx={{ backgroundColor: "#E3EDFF" }}>
            <TableRow>
              {columns.map((col) => {
                const sticky = stickyColumnPositions[col.key];
                return (
                  <TableCell
                    key={String(col.key)}
                    sx={{
                      fontWeight: 700,
                      fontSize: "0.75rem",
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                      lineHeight: 1.4,
                      padding: "6px 12px",
                      textAlign: "center",
                      ...(col.key === firstColKey
                        ? {
                            width: 260,
                            maxWidth: 260,
                            minWidth: 260,
                          }
                        : {}),
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
            {data.length === 0
              ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      align="center"
                      sx={{ py: 5 }}
                    >
                      <Box
                        sx={{
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
                      key={i}
                      sx={{
                        "backgroundColor": i % 2 === 0 ? "white" : "#F5F9FF",
                        "&:hover": {
                          backgroundColor: "#DCEBFF",
                        },
                      }}
                    >
                      {columns.map((column) => {
                        const sticky = stickyColumnPositions[column.key];
                        return (
                          <TableCell
                            key={String(column.key)}
                            sx={{
                              fontSize: "0.75rem",
                              padding: "6px 12px",
                              whiteSpace: "normal",
                              wordWrap: "break-word",
                              ...(column.key === firstColKey
                                ? {
                                    width: 260,
                                    maxWidth: 260,
                                    minWidth: 260,

                                  }
                                : {
                                    textAlign: "center",
                                  }),
                              ...(sticky && {
                                position: "sticky",
                                [sticky.position]: sticky.offset,
                                backgroundColor: "white",
                                zIndex: 1,
                                boxShadow:
                              sticky.position === "left"
                                ? "2px 0 6px -2px rgba(0,0,0,0.06)"
                                : "-2px 0 6px -2px rgba(0,0,0,0.06)",
                              }),
                            }}
                          >
                            {column.render ? column.render(row) : String(row[column.key])}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
                )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
      />
    </Paper>
  );
}

export default PaginatedTable;
