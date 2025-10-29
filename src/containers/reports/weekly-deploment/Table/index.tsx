import type { MomentInput } from "moment";

import { Box, CircularProgress } from "@mui/material";
import moment from "moment";
import React, { useCallback, useEffect, useState, useTransition } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/reducers/Store";
import type { PaginationState } from "@/types";

import { useSubmit } from "@/hooks/useSubmit";
import { setModalVisibility } from "@/reducers/Modal";
import { setWeeklyDeploymentFilters } from "@/reducers/WeeklyDeployment";
import { useGetWeeklyDeployment } from "@/services/queries/weeklyDeployment";
import DataTable from "@/shared/DataTable";
import { PAGINATION_TABLE_CONFIG } from "@/shared/DataTable/table.config";

import { COLUMN_ORDER } from "./constants";
import { createColumn, createGroupColumn, createSubColumn } from "./utils";

const PAGINATION_BUS_EVENT = "host-table-pagination";

type HostBillableAmount = {
  pagination?: PaginationState;
};

export const TABLE_CONFIG = {
  enableSorting: false,
  enableTopToolbar: false,
  enableBottomToolbar: false,
  enableColumnPinning: true,
  enableDensityToggle: true,
  enableColumnActions: false,
};

const HostBillableAmount: React.FC<HostBillableAmount> = React.memo(() => {
  const dispatch = useDispatch();
  const { registerSubmit } = useSubmit();
  const { handleSubmit, watch } = useFormContext();
  const [isPending, startTransition] = useTransition();
  const [columns, setColumns] = useState<any>([
    createColumn("Client", "client", 140),
    createColumn("Project Name", "projectName", 300),
    createColumn("Role Family", "roleFamily", 350),
    createColumn("Career Level", "careerLevel", 120),
    createColumn("Project Start Date", "projectStartDate", 160),
    createColumn("Project End Date", "projectEndDate", 130),
  ]);

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);

  const filters = useSelector((state: RootState) => state.weeklyDeployment.weeklyDeploymentFilter);
  const {
    roleFamilyFilter,
    careerLevelFilter,
    startDateFilter,
    endDateFilter,
    clientFilter,
    projectNameFilter,
  } = watch();

  const dateFilter = (inputDate: MomentInput) => moment(inputDate).isValid()
    ? moment(inputDate).format("YYYY-MM-DD")
    : moment(new Date()).format("YYYY-MM-DD");

  const params = {
    page: 0,
    size: 10,
    startDate: dateFilter(startDateFilter),
    endDate: dateFilter(endDateFilter),
    roleFamily: filters?.roleFamily?.id ? String(filters?.roleFamily?.id) : null,
    careerLevel: filters?.careerLevel?.id ? Number(filters?.careerLevel?.id) : null,
    client: filters?.client?.id ? String(filters?.client?.id) : null,
    projectName: filters?.projectName?.id ? String(filters?.projectName?.id) : null,
  };

  const { data: fetchedData } = useGetWeeklyDeployment(params);

  const onSubmit = useCallback(() => {
    const payload = {
      roleFamily: roleFamilyFilter,
      careerLevel: careerLevelFilter,
      client: clientFilter,
      projectName: projectNameFilter,
      startDateFilter:
        startDateFilter instanceof Date
          ? startDateFilter.toISOString()
          : undefined,
      endDateFilter:
        endDateFilter instanceof Date
          ? endDateFilter.toISOString()
          : undefined,
    };
    dispatch(setWeeklyDeploymentFilters(payload));
    dispatch(setModalVisibility({ key: "showWeeklyDeploymentFilters", value: false }));
  }, [roleFamilyFilter, careerLevelFilter, startDateFilter, endDateFilter, clientFilter, projectNameFilter]);

  useEffect(() => {
    registerSubmit(() => handleSubmit(onSubmit)());
  }, [registerSubmit, handleSubmit, onSubmit]);

  useEffect(() => {
    if (fetchedData) {
      startTransition(() => {
        const start = pageIndex * pageSize;
        setData(fetchedData?.slice(start, start + pageSize));
      });
    }
  }, [fetchedData, pageIndex, pageSize]);

  useEffect(() => {
    console.log("column");
    startTransition(() => {
      let preColumn: any[] = columns;

      if (fetchedData?.length > 0) {
        const uniqueDates = Array.from(new Set(fetchedData?.map((d: { date: any }) => d.date))) as any;

        for (let i = 0; i < uniqueDates.length; i++) {
          preColumn = [
            ...preColumn,
            createGroupColumn(uniqueDates[i], "date", [
              createSubColumn("demand", "Demand", "date"),
              createSubColumn("deployed", "Deployed", "date"),
            ]),
          ];
        }
      }

      setColumns(preColumn);
    });
  }, [fetchedData]);

  if (isPending) {
    return (
      <Box height="80vh" display="flex" alignItems="center" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <DataTable
      paginationEvent={PAGINATION_BUS_EVENT}
      config={PAGINATION_TABLE_CONFIG}
      totalCount={fetchedData?.length}
      tableId="host-billable-amount"
      columnOrder={COLUMN_ORDER}
      PinColumns={{ left: ["client", "projectName", "roleFamily", "careerLevel", "projectStartDate", "projectEndDate", "host_name", "service_tag", "demand_status"] }}
      pagination={{
        pageSize,
        pageIndex,
      }}
      onPagination={({ pageSize, pageIndex }: { pageSize: number; pageIndex: number }) => {
        startTransition(() => {
          setPageIndex(pageIndex);
          setPageSize(pageSize);
          console.log("pageSize, pageIndex ", pageSize, pageIndex);
        });
      }}
      columns={columns}
      data={data}
    />
  );
});

export default HostBillableAmount;
