import { CircularProgress } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";

import type { ReportsPaginationProps } from "@/types/reports";

import PaginatedTable from "@/components/FixedDatatable";
import { useGetReportList } from "@/services/queries/reports";

import Filters from "../Filters";
import { columns } from "./Columns";

function Table() {
  const startDateFilter = useWatch({ name: "startDateFilter" });
  const endDateFilter = useWatch({ name: "endDateFilter" });
  const frequency = useWatch({ name: "frequency" })?.id;
  const startDate = moment(startDateFilter).format("YYYY-MM-DD");
  const endDate = moment(endDateFilter).format("YYYY-MM-DD");

  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const params = {
    page,
    size: rowsPerPage,
    startDate,
    endDate,
    frequency,
  };
  const { data } = useGetReportList(params);

  const reports: ReportsPaginationProps[] = data?.content || [];
  useEffect(() => {
    if (data) {
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setIsLoading(false);
    }
  }, [isLoading, data]);
  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }
  return (
    <>
      <Filters />
      <PaginatedTable
        title="Reports"
        data={reports}
        columns={columns}
        totalCount={data?.totalElements || 0}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
    </>
  );
}

export default Table;
