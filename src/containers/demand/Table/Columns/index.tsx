import moment from "moment";

import type { Column, DemandPaginationProps } from "@/types/demand";

export const columns: Column<DemandPaginationProps> = [
  { key: "client", label: "Client" },
  { key: "projectName", label: "Project Name" },
  { key: "startDate", label: "Start Date", render: (row: DemandPaginationProps) => (
    moment(row.startDate).format("MM/DD/YYYY")
  ) },
  { key: "endDate", label: "End Date", render: (row: DemandPaginationProps) => (
    moment(row.endDate).format("MM/DD/YYYY")
  ) },
  { key: "roleFamily", label: "Role Family" },
  { key: "careerLevel", label: "Career Level" },
  { key: "allocation", label: "Allocation" },
  { key: "opptyTagging", label: "Commit Level" },
  { key: "resourceName", label: "Resource Name" },
  { key: "projectStartDate", label: "Project Start Date", render: (row: DemandPaginationProps) => (
    moment(row.projectStartDate).format("MM/DD/YYYY")
  ) },
  { key: "projectEndDate", label: "Project End Date", render: (row: DemandPaginationProps) => (
    moment(row.projectEndDate).format("MM/DD/YYYY")
  ) },
];
