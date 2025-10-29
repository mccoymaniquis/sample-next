import { CircularProgress } from "@mui/material";
import React, { useState } from "react";

import type { UsersPaginationProps } from "@/types/users";

import PaginatedTable from "@/components/DataTable";
import { useGetAllUsers } from "@/services/queries/users";

import { columns } from "./Columns";

function Table() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, isLoading } = useGetAllUsers({
    page,
    size: rowsPerPage,
    sort: "id,desc",
  });

  const users: UsersPaginationProps[] = data?.content || [];

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }
  return (
    <>
      <PaginatedTable
        title="User"
        data={users}
        columns={columns}
        totalCount={data?.totalElements ?? 0}
        page={page ?? 0}
        setPage={setPage}
        rowsPerPage={rowsPerPage ?? 10}
        setRowsPerPage={setRowsPerPage}
        hasFilter={false}
      />
    </>
  );
}

export default Table;
