export type RowDataType = Record<string, any>;

export type ColumnType = { id: string };

export type RowType = {
  original: {
    platform_owner: string;
    billing_group: string;
    platform_name: string;
    project_name: string;
    service_tag: string;
    host_name: string;
    vm_name: string;
  };
  index: number;
};

export type BodyCellPropType = {
  row: RowType;
  column: ColumnType;
};

export type CellType = {
  row: { original: Record<string, number> };
  column: { id: string };
};
