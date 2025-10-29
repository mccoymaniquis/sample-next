import type { Column, Columns, SupplyPaginationProps } from "@/types/supply";

import checkboxColumn from "./checkboxColumn";
import Field from "./FieldColumn";

type columns = {
  selectedRows: number[];
  handleSelectRow: (id: number, index?: number | undefined) => void; // <-- index is now optional
  handleSelectAll: () => void;
  rows: SupplyPaginationProps[];
  isEditing?: boolean;
};

function fieldColumn(data: any, isEditing: any, props: Column<SupplyPaginationProps>, fieldName: string = ""): Column<SupplyPaginationProps> {
  return {
    key: props?.key,
    label: props?.label,
    render: (row: SupplyPaginationProps, index) => {
      const customName = `rows.${index}.${props.key}-${row?.id}`;
      return (isEditing && data?.includes(row?.id))
        ? (
            <Field
              defaultValue={row[props?.key] as any}
              fieldName={fieldName}
              name={customName}
              id={row?.id}
            />
          )
        : (
            row[props?.key]
          );
    },
  };
}

export function columns(data: any, isEditing: boolean, hasEditPermission: boolean, params: columns): Column<SupplyPaginationProps>[] {
  const columnsList: Columns<SupplyPaginationProps> = [
    checkboxColumn({ ...params, isEditing }),
    fieldColumn(data, isEditing, { key: "startDate", label: "Start Date" }, "date-picker"),
    fieldColumn(data, isEditing, { key: "endDate", label: "End Date" }, "date-picker"),
    fieldColumn(data, isEditing, { key: "name", label: "Name" }),
    fieldColumn(data, isEditing, { key: "roleFamily", label: "Role Family" }, "role-family"),
    fieldColumn(data, isEditing, { key: "careerLevel", label: "Career Level" }, "career-level"),
    fieldColumn(data, isEditing, { key: "headCount", label: "Head Count" }, "head-count"),
  ];

  if (!hasEditPermission)
    columnsList.shift();

  return columnsList;
}
