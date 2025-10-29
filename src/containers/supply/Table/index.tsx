import { zodResolver } from "@hookform/resolvers/zod";
import { CircularProgress } from "@mui/material";
import { isAxiosError } from "axios";
import _ from "lodash";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { z } from "zod";

import type { RootState } from "@/reducers/Store";
import type { SupplyItem, SupplyPaginationProps } from "@/types/supply";

import PaginatedTable from "@/components/DataTable";
import { formatDate, parseDate } from "@/helpers/dateTime";
import { hasPermission } from "@/helpers/permissionUtils";
import { useSubmit } from "@/hooks/useSubmit";
import { setModalVisibility } from "@/reducers/Modal";
import { setSupplyData, setSupplyFilters } from "@/reducers/Supply";
import { updateSupplyList } from "@/services/mutations/supply";
import { useGetSupplyList } from "@/services/queries/supply";

import Filters from "../Filters";
import ViewModal from "../ViewModal";
import { columns } from "./Columns";

const NAME_REGEX = /^[A-Z]+(?:, [A-Z]+(?: [A-Z]+)*)?$/;

type SelectedRow = {
  index: number;
  id: number | undefined;
};

function Table() {
  const dispatch = useDispatch();
  const { registerSubmit } = useSubmit();
  const methods = useFormContext();
  const { watch } = useFormContext();
  const { reset } = methods;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const search = watch("search", null);
  const startDateFilter = watch("startDateFilter", undefined);
  const endDateFilter = watch("endDateFilter", undefined);
  const roleFamilyFilter = watch("roleFamilyFilter", null);
  const careerLevelFilter = watch("careerLevelFilter", null);

  const [searchValue, setSearchValue] = useState<string>("");
  const filters = useSelector((state: RootState) => state.supply.supplyFilters);
  const [isLoading, setIsLoading] = useState(true);

  const [checkedRows, setCheckRows] = useState<number[]>([]);
  const [checkedRowsWithIndex, setCheckRowsWithIndex] = useState<SelectedRow[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const user = useSelector((state: RootState) => state?.user?.user);
  const hasEditAccess = hasPermission(user, "supply-edit");

  const onSubmit = useCallback(() => {
    const payload = {
      search,
      startDateFilter: startDateFilter instanceof Date ? startDateFilter.toISOString() : undefined,
      endDateFilter: endDateFilter instanceof Date ? endDateFilter.toISOString() : undefined,
      roleFamilyFilter,
      careerLevelFilter,
    };
    dispatch(setSupplyFilters(payload));
    dispatch(setModalVisibility({ key: "showSupplyFilters", value: false }));
    setPage(0);
  }, [search, startDateFilter, endDateFilter, roleFamilyFilter, careerLevelFilter, dispatch]);

  const { data, refetch } = useGetSupplyList({
    page,
    size: rowsPerPage,
    roleFamily: _.get(filters, "roleFamilyFilter.label", "") as string,
    careerLevel: _.get(filters, "careerLevelFilter.label", "") as string,
    startDate: formatDate({ value: parseDate(filters?.startDateFilter) }) ?? undefined,
    endDate: formatDate({ value: parseDate(filters?.endDateFilter) }) ?? undefined,
    search: searchValue ?? undefined,
  });

  const demands: SupplyPaginationProps[] = data?.content?.map(d => ({
    ...d,
    startDate: moment(d?.startDate).format("MM/DD/YYYY"),
    endDate: moment(d?.endDate).format("MM/DD/YYYY"),
  })) || [];

  const formSchema = z.object({
    rows: z.array(z.object({})),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rows: [],
    },
    mode: "onChange",
  });

  const { reset: reseForm, getValues, setError, clearErrors, formState: { isDirty, errors } } = form;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchValue(search ?? "");
      setPage(0);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [search, dispatch]);

  useEffect(() => {
    if (data?.content) {
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setIsLoading(false);
      dispatch(setSupplyData({
        data: data?.content,
        totalCount: data?.totalElements,
      }));
    }
  }, [data, dispatch]);

  useEffect(() => {
    const startDate = filters?.startDateFilter ? new Date(filters?.startDateFilter) : undefined;
    const endDate = filters?.endDateFilter ? new Date(filters?.endDateFilter) : undefined;

    reset({
      search: filters?.search ?? undefined,
      roleFamilyFilter: filters?.roleFamilyFilter ?? undefined,
      careerLevelFilter: filters?.careerLevelFilter ?? undefined,
      startDateFilter: startDate ?? undefined,
      endDateFilter: endDate ?? undefined,
    });
  }, [dispatch, reset, filters]);

  useEffect(() => {
    registerSubmit(() => methods.handleSubmit(onSubmit)());
  }, [methods, registerSubmit, onSubmit]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  const handleSelectRow = (id: number, index?: number) => {
    const transformedRows = demands.find(d => d?.id === id) ?? {};

    if (checkedRows?.includes(id)) {
      // Remove id from checkedRows
      setCheckRows(selected => selected.filter(d => d !== id));

      // Remove object from checkRowsWithIndex by id
      setCheckRowsWithIndex((data: any) => data.filter((item: any) => item?.index !== index));
      return;
    }

    // Add object to checkRowsWithIndex at the specified index
    setCheckRowsWithIndex((data: any) => {
      data[index as number] = { ...transformedRows, index };
      return data;
    });

    // Add id to checkedRows
    setCheckRows(selected => [...selected, id]);
  };

  const handleSelectAll = () => {
    // Create SelectedRow array
    const selectedRow: SelectedRow[] = demands.map((column, index) => ({
      index,
      id: column.id,
    }));

    const allIds = demands.map(d => d.id) as number[];

    // If not all rows are checked, select all
    if (!checkedRows || checkedRows.length < demands.length) {
      setCheckRowsWithIndex(selectedRow);
      setCheckRows(allIds);
      return;
    }

    // Otherwise, deselect all
    setCheckRowsWithIndex([]);
    setCheckRows([]);
  };

  const handleUpdateList = async (body: any) => {
    refetch();
    try {
      const response = await updateSupplyList(body);
      const { status } = response;
      if (status === 200) {
        toast.success("Saved successfully.", {
          position: "top-right",
        });
        setCheckRowsWithIndex([]);
        setIsEditing(false);
        setCheckRows([]);
        refetch();
      }
    }
    catch (error) {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message ?? "Update failed.";
        toast.error(message, { position: "top-right" });
      }
      else {
        toast.error("An unknown error occurred.", { position: "top-right" });
      }
    }
  };

  const handleEditColumns = () => {
    const transformData: SupplyItem[] = [];
    reseForm({ rows: [] });

    checkedRowsWithIndex.forEach((column: SelectedRow) => {
      const data: SupplyPaginationProps = demands.filter(d => d?.id === column?.id)[0] ?? {};

      transformData[column?.index] = {
        [`careerLevel-${data.id}`]: { label: String(data.careerLevel), id: String(data.careerLevel) },
        [`roleFamily-${data.id}`]: { label: String(data.roleFamily), id: String(data.roleFamily) },
        [`headCount-${data?.id}`]: data?.headCount,
        [`startDate-${data?.id}`]: new Date(data?.startDate as string),
        [`endDate-${data?.id}`]: new Date(data?.endDate as string),
        [`name-${data?.id}`]: data?.name,
        index: column?.index,
        [`id`]: data?.id,
      };
    });

    reseForm({
      rows: transformData,
    });

    setIsEditing(true);
  };

  const setDynamicError = (field: string, message = "") => {
    setError(field as any, { type: "customType", message });
  };

  const clearDynamicErrors = (fields: string[]) => {
    clearErrors(fields as any);
  };

  const handleSaveEdit = () => {
    const formattedBody: SupplyItem[] = [];
    const rows = getValues("rows");

    let hasFieldErrors = false;
    let hasDateErrors = false;
    let hasNameError = false;

    rows.map((column: SupplyPaginationProps, i) => {
      const id = _.get(column, `id`);
      const startDate = moment(_.get(column, `startDate-${id}`, ""));
      const endDate = moment(_.get(column, `endDate-${id}`, ""));

      const careerLevel = _.get(column, [`careerLevel-${id}`, "label"], "");
      const roleFamily = _.get(column, [`roleFamily-${id}`, "label"], "");
      const headCount = _.get(column, `headCount-${id}`, 0);
      const name = _.get(column, `name-${id}`, "");

      clearDynamicErrors([
        `rows.${i}.startDate-${id}`,
        `rows.${i}.endDate-${id}`,
        `rows.${i}.careerLevel-${id}`,
        `rows.${i}.roleFamily-${id}`,
        `rows.${i}.headCount-${id}`,
        `rows.${i}.name-${id}`,
      ]);

      // Date validation
      if (endDate.isBefore(startDate)) {
        setDynamicError(`rows.${i}.startDate-${id}`);
        setDynamicError(`rows.${i}.endDate-${id}`);
        hasDateErrors = true;
      }

      // Name validation
      if (name && !NAME_REGEX.test(name)) {
        setDynamicError(`rows.${i}.name-${id}`);
        hasNameError = true;
      }

      // Required fields validation
      const requiredFields: [string, string][] = [
        [`careerLevel-${id}`, careerLevel],
        [`roleFamily-${id}`, roleFamily],
        [`headCount-${id}`, headCount],
        [`name-${id}`, name],
      ];

      requiredFields.forEach(([fieldKey, value]) => {
        if (!value) {
          setDynamicError(`rows.${i}.${fieldKey}`);
          hasFieldErrors = true;
        }
      });

      if (!(hasDateErrors || hasFieldErrors || hasNameError)) {
        formattedBody.push({
          careerLevel,
          roleFamily,
          headCount,
          startDate: startDate.format("YYYY-MM-DD"),
          endDate: endDate.format("YYYY-MM-DD"),
          name,
          id,
        });
      }

      return formattedBody;
    });

    if (hasDateErrors || hasNameError) {
      toast.error("Invalid input. Please check the value.", { position: "top-right" });
    }

    if (hasFieldErrors) {
      toast.error("Some required fields are missing.", { position: "top-right" });
    }

    if (!errors?.rows) {
      handleUpdateList(formattedBody);
      console.log("formattedBody", formattedBody);
    }
  };

  const handleCancelEdit = () => {
    setCheckRowsWithIndex([]);
    setIsEditing(false);
    setCheckRows([]);
    reseForm({
      rows: [],
    });
  };

  return (
    <>
      <Filters
        isEdit={checkedRows?.length > 0}
        onEditColumns={handleEditColumns}
        onCancelEdit={handleCancelEdit}
        onSaveEdit={handleSaveEdit}
        enableSaveButton={isDirty}
        isEditing={isEditing}
      />
      <FormProvider {...form}>
        <PaginatedTable
          title="Demand"
          data={demands}
          disabledPagination={isEditing}
          columns={columns(checkedRows, isEditing, hasEditAccess, {
            selectedRows: checkedRows,
            handleSelectRow,
            handleSelectAll,
            rows: demands,
          })}
          totalCount={data?.totalElements ?? 0}
          page={page ?? 0}
          setPage={setPage}
          rowsPerPage={rowsPerPage ?? 10}
          setRowsPerPage={setRowsPerPage}
          stickyColumnPositions={{
            action: { position: "right", offset: 0 },
          }}
          hasFilter={!!searchValue || !!startDateFilter || !!endDateFilter || !!roleFamilyFilter || !!careerLevelFilter}
        />
      </FormProvider>
      <ViewModal />
    </>
  );
}

export default Table;
