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
  groupedHeaders?: Record<string, (keyof T)[]>;
  hasBorderHeaders?: boolean;
};

function GroupFixedDatatable<T extends Record<string, unknown>>({
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
  groupedHeaders = {},
  hasBorderHeaders = false,
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
            {/* Grouped header row */}
            <TableRow>
              {(() => {
                const rendered = new Set<keyof T>();

                return columns.map((col, i) => {
                  if (rendered.has(col.key as keyof T))
                    return null;

                  // find if this col belongs to any group
                  const group = Object.entries(groupedHeaders).find(([_, keys]) =>
                    keys.includes(col.key as keyof T),
                  );

                  if (group) {
                    const [groupLabel, keys] = group;
                    if (col.key === keys[0]) {
                      keys.forEach(k => rendered.add(k));

                      return (
                        <TableCell
                          key={`group-${i}`}
                          colSpan={keys.length}
                          align="center"
                          sx={{
                            fontWeight: 700,
                            fontSize: "0.75rem",
                            padding: "6px 12px",
                            wordWrap: "break-word",
                            ...(hasBorderHeaders
                              ? {
                                  border: "0.10px solid rgba(224, 224, 224, 1)",
                                }
                              : {
                                  borderBottom: "none",
                                }),
                          }}
                        >
                          {groupLabel}
                        </TableCell>
                      );
                    }
                    return null;
                  }

                  return (
                    <TableCell
                      key={`head1-${i}`}
                      rowSpan={2}
                      align="center"
                      sx={{
                        fontWeight: 700,
                        fontSize: "0.75rem",
                        padding: "6px 12px",
                        wordWrap: "break-word",
                        ...(hasBorderHeaders && {
                          border: "0.10px solid rgba(224, 224, 224, 1)",
                        }),
                        ...(col.key === firstColKey
                          ? {
                              width: 260,
                              maxWidth: 260,
                              minWidth: 260,
                            }
                          : {}),
                      }}
                    >
                      {col.label}
                    </TableCell>
                  );
                });
              })()}
            </TableRow>

            {/* Sub-header row */}
            <TableRow>
              {columns.map((col, i) => {
                const inGroup = Object.values(groupedHeaders).some(keys =>
                  keys.includes(col.key as keyof T),
                );

                if (inGroup) {
                  return (
                    <TableCell
                      key={`subhead-${i}`}
                      align="center"
                      sx={{
                        fontWeight: 700,
                        fontSize: "0.75rem",
                        padding: "6px 12px",
                        wordWrap: "break-word",
                        ...(hasBorderHeaders && {
                          border: "0.10px solid rgba(224, 224, 224, 1)",
                        }),
                      }}
                    >
                      {col.label}
                    </TableCell>
                  );
                }

                return null;
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.length === 0
              ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center" sx={{ py: 5 }}>
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

export default GroupFixedDatatable;
