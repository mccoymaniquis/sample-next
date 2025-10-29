/* eslint-disable react-hooks-extra/no-direct-set-state-in-use-effect */
import { CircularProgress } from "@mui/material";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/reducers/Store";
import type { ReportsPaginationProps } from "@/types/reports";

import PaginatedTable from "@/components/GroupFixedDatatable";
import { useSubmit } from "@/hooks/useSubmit";
import { setModalVisibility } from "@/reducers/Modal";
import { setReportFilters } from "@/reducers/Report";
import { useGetReportList } from "@/services/queries/reports";

import Filters from "../Filters";
import { columns } from "./Columns";

function Table() {
  const dispatch = useDispatch();
  const { registerSubmit } = useSubmit();
  const { watch, handleSubmit } = useFormContext();

  const filters = useSelector((state: RootState) => state.reports.reportFilters);

  // 👁️ Watch all relevant form values reactively
  const {
    date,
    roleFamilyFilter,
    careerLevelFilter,
    frequency,
    startDateFilter,
    endDateFilter,
  } = watch();

  const dateFilter = moment(date).isValid()
    ? moment(date).format("YYYY-MM-DD")
    : moment(new Date()).format("YYYY-MM-DD");

  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const params = {
    page,
    size: rowsPerPage,
    date: dateFilter,
    roleFamily: filters?.roleFamily?.id ? String(filters?.roleFamily?.id) : null,
    careerLevel: filters?.careerLevel?.id ? Number(filters?.careerLevel?.id) : null,
  };

  const { data } = useGetReportList(params);
  const reports: ReportsPaginationProps[] = data?.content || [];

  const onSubmit = useCallback(() => {
    const payload = {
      roleFamily: roleFamilyFilter,
      careerLevel: careerLevelFilter,
      frequency,
      startDateFilter:
        startDateFilter instanceof Date
          ? startDateFilter.toISOString()
          : undefined,
      endDateFilter:
        endDateFilter instanceof Date
          ? endDateFilter.toISOString()
          : undefined,
    };

    dispatch(setReportFilters(payload));
    dispatch(setModalVisibility({ key: "showReportFilters", value: false }));
    setPage(0);
  }, [dispatch, roleFamilyFilter, careerLevelFilter, frequency, startDateFilter, endDateFilter]);

  useEffect(() => {
    registerSubmit(() => handleSubmit(onSubmit)());
  }, [registerSubmit, handleSubmit, onSubmit]);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

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
        hasFilter={!!roleFamilyFilter || !!careerLevelFilter}
        hasBorderHeaders
        groupedHeaders={{
          Demand: ["demandWon", "demandRenewal", "demandCommit", "demandLikely", "demandUpside", "demandInvestmentTraining", "demandPOC", "demandPillarInvestment"],
          Bench: ["benchAfterWon", "benchAfterWonRenewal", "benchAfterRenewalCommit", "benchAfterLikely", "benchAfterPOC", "benchAfterUpsideAndAllOthers"],
        }}
      />
    </>
  );
}

export default Table;
