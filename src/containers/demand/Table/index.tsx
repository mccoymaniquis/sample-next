import { CircularProgress } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/reducers/Store";
import type { Column, DemandItem, DemandPaginationProps } from "@/types/demand";

import PaginatedTable from "@/components/DataTable";
import { toISOorNull } from "@/helpers/date";
import { formatDate, parseDate } from "@/helpers/dateTime";
import { useSubmit } from "@/hooks/useSubmit";
import { setDemandData, setDemandFilters } from "@/reducers/Demand";
import { setModalVisibility } from "@/reducers/Modal";
import { useGetDemandList } from "@/services/queries/demand";

import EditDemandModal from "../EditDemandModal";
import Filters from "../Filters";
import ViewModal from "../ViewModal";
import { columns } from "./Columns";
import ActionButton from "./Columns/ActionMenu";

function mapToPagination(items: DemandItem[]): DemandPaginationProps[] {
  return items.map(i => ({
    id: i.id,
    client: i.client,
    projectName: i.projectName,
    roleFamily: i.roleFamily,
    careerLevel: i.careerLevel != null ? String(i.careerLevel) : undefined,
    allocation: i.allocation != null ? String(i.allocation) : undefined,
    startDate: i.startDate ? new Date(i.startDate) : undefined,
    endDate: i.endDate ? new Date(i.endDate) : undefined,
    commitLevel: i.commitLevel,
    opptyTagging: i.opptyTagging,
    opptyFunnel: i.opptyFunnel,
    soTag: i.soTag,
    opptyNumber: i.opptyNumber,
    originalHC: i.originalHC != null ? String(i.originalHC) : undefined,
    probability: i.probability != null ? String(i.probability) : undefined,
    resourceName: i.resourceName,
    projectStartDate: i.projectStartDate ? new Date(i.projectStartDate) : undefined,
    projectEndDate: i.projectEndDate ? new Date(i.projectEndDate) : undefined,
    action: undefined,
  }));
}

function Table() {
  const dispatch = useDispatch();
  const { registerSubmit } = useSubmit();

  const { watch, reset, handleSubmit } = useFormContext();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState<string>("");

  const search = watch("search", "");
  const startDateFilter = watch("startDateFilter", undefined);
  const endDateFilter = watch("endDateFilter", undefined);
  const roleFamilyFilter = watch("roleFamilyFilter", null);
  const careerLevelFilter = watch("careerLevelFilter", null);
  const opptyTaggingFilter = watch("opptyTaggingFilter", null);
  const opptyFunnelFilter = watch("opptyFunnelFilter", null);
  const soTagFilter = watch("soTagFilter", null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchValue(search ?? "");
      setPage(0);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [search, dispatch]);

  const filters = useSelector((state: RootState) => state.demand.demandFilters);
  const userRole = useSelector((state: RootState) => state.user.user?.permissions.roleName);

  const onSubmit = useCallback(() => {
    const payload = {
      search,
      startDateFilter:
        startDateFilter instanceof Date ? startDateFilter.toISOString() : undefined,
      endDateFilter:
        endDateFilter instanceof Date ? endDateFilter.toISOString() : undefined,
      roleFamilyFilter,
      careerLevelFilter,
      opptyTaggingFilter,
      opptyFunnelFilter,
      soTagFilter,
    };
    dispatch(setDemandFilters(payload));
    dispatch(setModalVisibility({ key: "showDemandFilters", value: false }));
    setPage(0);
  }, [
    search,
    startDateFilter,
    endDateFilter,
    roleFamilyFilter,
    careerLevelFilter,
    opptyTaggingFilter,
    opptyFunnelFilter,
    soTagFilter,
    dispatch,
  ]);

  useEffect(() => {
    registerSubmit(() => handleSubmit(onSubmit)());
  }, [handleSubmit, onSubmit, registerSubmit]);

  const queryParams = useMemo(
    () => ({
      page,
      size: rowsPerPage,
      roleFamily: filters?.roleFamilyFilter?.label ?? undefined,
      careerLevel: filters?.careerLevelFilter?.label ?? undefined,
      opptyTagging: filters?.opptyTaggingFilter?.label ?? undefined,
      opptyFunnel: filters?.opptyFunnelFilter?.label ?? undefined,
      soTag: filters?.soTagFilter?.label ?? undefined,
      startDate:
        formatDate({ value: parseDate(filters?.startDateFilter) }) ?? undefined,
      endDate:
        formatDate({ value: parseDate(filters?.endDateFilter) }) ?? undefined,
      search: searchValue || undefined,
    }),
    [page, rowsPerPage, filters, searchValue],
  );

  const { data, isLoading } = useGetDemandList(queryParams);

  useEffect(() => {
    if (data?.content) {
      const mapped = mapToPagination(data.content as DemandItem[]);
      const updatedMapped = mapped.map(r => ({
        ...r,
        startDate: toISOorNull(r.startDate) ?? undefined,
        endDate: toISOorNull(r.endDate) ?? undefined,
        projectStartDate: toISOorNull(r.projectStartDate) ?? undefined,
        projectEndDate: toISOorNull(r.projectEndDate) ?? undefined,
      }));
      dispatch(
        setDemandData({
          data: updatedMapped,
          totalCount: data.totalElements,
        }),
      );
    }
  }, [data, dispatch]);

  useEffect(() => {
    const startDate = filters?.startDateFilter
      ? new Date(filters.startDateFilter)
      : undefined;
    const endDate = filters?.endDateFilter
      ? new Date(filters.endDateFilter)
      : undefined;

    reset({
      search: filters?.search ?? "",
      roleFamilyFilter: filters?.roleFamilyFilter ?? null,
      careerLevelFilter: filters?.careerLevelFilter ?? null,
      opptyTaggingFilter: filters?.opptyTaggingFilter ?? null,
      opptyFunnelFilter: filters?.opptyFunnelFilter ?? null,
      soTagFilter: filters?.soTagFilter ?? null,
      startDateFilter: startDate,
      endDateFilter: endDate,
    });
  }, [filters, reset]);

  const demands: DemandPaginationProps[] = useMemo(
    () => (data?.content ? mapToPagination(data.content as DemandItem[]) : []),
    [data?.content],
  );

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  const updatedColumns: Column<DemandPaginationProps>
    = [...columns, {
      key: "action",
      label: "Action",
      render: (row: DemandPaginationProps) => (
        <>
          <div style={{ display: "flex", gap: "8px" }}>
            <ActionButton row={row} isEditable={userRole !== "EXECOM"} />
          </div>
        </>
      ),
    }];
  return (
    <>
      <Filters />
      <PaginatedTable
        title="Demand"
        data={demands}
        columns={updatedColumns}
        totalCount={data?.totalElements ?? 0}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        stickyColumnPositions={{
          action: { position: "right", offset: 0 },
        }}
        hasFilter={
          !!search
          || !!startDateFilter
          || !!endDateFilter
          || !!roleFamilyFilter
          || !!careerLevelFilter
          || !!opptyTaggingFilter
          || !!opptyFunnelFilter
          || !!soTagFilter
        }
      />
      <ViewModal />
      <EditDemandModal />
    </>
  );
}

export default Table;
