// import currency from 'currency.js';
import { v4 as uuidv4 } from "uuid";

import { handleMouseLeaveByClass, hoverAllColumnByClass, hoverColumnByClass } from "@/shared/DataTable/utils";

import type { BodyCellPropType, RowDataType, RowType } from "../types";

const STORAGE_COLUMN_KEYS: string[] = [
  "storage",
  "billable_amount_storage_cm",
  "billable_amount_storage_pm",
  "billable_amount_storage_variance",
];

const VM_COLUMN_KEYS: string[] = [
  "vm",
  "billable_amount_vm_cm",
  "billable_amount_vm_pm",
  "billable_amount_vm_variance",
];
export function handleMouseLeave() {
  document.querySelectorAll("td").forEach((cell) => {
    (cell as HTMLElement).classList.remove("highlight-column");
  });
  document.querySelectorAll("th").forEach((cell) => {
    (cell as HTMLElement).classList.remove("highlight-header");
  });
}

function hoverHeaderAndColumns(columnId: string) {
  // table data
  hoverAllColumnByClass(
    `td[data-column-id="${columnId}-gc"], td[data-group="${columnId}"]`,
    "highlight-column",
  );

  // header
  hoverAllColumnByClass(
    `th[data-column-id="${columnId}-gc"], th[data-group="${columnId}"]`,
    "highlight-header",
  );
}

export function handleColumnHover(row: RowDataType, accessorKey: string = "") {
  const { billing_group, platform_name, platform_owner } = row.original ?? "";
  const { host_name, project_name, service_tag } = row.original ?? "";
  const data: Record<string, string> = {
    platform_owner: `${platform_owner}-po`,
    platform_name: `${platform_name}-pn`,
    project_name: `${project_name}-pjn`,
    billing_group: `${billing_group}`,
    service_tag: `${service_tag}-st`,
    host_name: `${host_name}-hn`,
  };

  const billingGroupSelector = `[data-billing-group="${billing_group}"]`;

  /**
   * hoverColumnByClass: Fn
   *
   * When (current month, previous month and variance) hover the rest of the column
   * (billing_group, platform_owner, platform_name, and host_name)
   * will be highlighted too as associated column
   */
  hoverColumnByClass(
    `td[data-billing-group="${billing_group}"][data-type="billing_group"]`,
    "highlight-column",
  );

  hoverColumnByClass(
    `td[data-platform-owner="${platform_owner}-po"][data-type="platform_owner"]${billingGroupSelector}`,
    "highlight-column",
  );

  hoverColumnByClass(
    `td[data-project-name="${project_name}-pjn"][data-type="project_name"]${billingGroupSelector}`,
    "highlight-column",
  );

  hoverColumnByClass(
    `td[data-service-tag="${service_tag}-st"][data-type="service_tag"]${billingGroupSelector}`,
    "highlight-column",
  );

  hoverColumnByClass(
    `td[data-platform-name="${platform_name}-pn"][data-type="platform_name"]${billingGroupSelector}`,
    "highlight-column",
  );

  hoverColumnByClass(
    `td[data-host-name="${host_name}-hn"][data-type="host_name"]${billingGroupSelector}`,
    "highlight-column",
  );

  // when a column hover from the platform owner, platform name and project name
  // this will be highlighted the associated row under storage and vm
  if (data[accessorKey]) {
    const formattedKey = accessorKey.replace("_", "-");
    const selector = `td[data-${formattedKey}="${data[accessorKey]}"]${billingGroupSelector}`;

    // vm and storage grouped columns (current month, previous month and variance)
    hoverAllColumnByClass(selector, "highlight-column");
  }
}

export function handleMouseEnterHover(columnId: string) {
  if (STORAGE_COLUMN_KEYS.includes(columnId)) {
    hoverColumnByClass(`th[data-column-id="storage-gc"]`, "highlight-header");
    hoverHeaderAndColumns(columnId);
  }
  if (VM_COLUMN_KEYS.includes(columnId)) {
    hoverColumnByClass(`th[data-column-id="vm-gc"]`, "highlight-header");
    hoverHeaderAndColumns(columnId);
  }
}

function handleDataAttributes(row: RowType) {
  const { billing_group, platform_name, platform_owner } = row.original ?? "";
  const { project_name, host_name } = row.original ?? "";
  const { vm_name, service_tag } = row.original ?? "";

  return {
    "data-platform-owner": `${platform_owner}-po`,
    "data-platform-name": `${platform_name}-pn`,
    "data-project-name": `${project_name}-pjn`,
    "data-service-tag": `${service_tag}-st`,
    "data-host-name": `${host_name}-hn`,
    "data-billing-group": billing_group,
    "data-vm-name": vm_name,
  };
}

function handleSetBodyCellProps(row: RowType, accessorKey: string) {
  const dataAttibutes = handleDataAttributes(row);
  const commonProps = {
    ...dataAttibutes,
    "data-type": accessorKey,
    "data-row-show": true,
  };

  return {
    style: {
      textAlign: "center",
      verticalAlign: "top",
    },
    ...commonProps,
    onMouseEnter: () => handleColumnHover(row, accessorKey),
    onMouseLeave: () => handleMouseLeaveByClass(),
  };
}

export function createColumn(header: string, accessorKey: string = "", size: number = 250) {
  return ({
    header,
    accessorKey,
    enableSorting: false,
    size,
    minSize: size,
    muiTableHeadCellProps: () => ({
      align: "center",
    }),
    muiTableBodyCellProps: ({ row }: BodyCellPropType) =>
      handleSetBodyCellProps(row, accessorKey),
  });
}

export function createSimpleColumn(key: string, header: string) {
  return {
    enableSorting: false,
    accessorKey: key,
    header,
    muiTableHeadCellProps: () => ({
      align: "center",
    }),
    muiTableBodyCellProps: ({ row, column }: BodyCellPropType) => {
      const dataAttibutes = handleDataAttributes(row);

      return {
        align: "center",
        ...dataAttibutes,
        onMouseEnter: () => handleColumnHover(row, column.id),
        onMouseLeave: () => handleMouseLeaveByClass(),
        style: {
          textalign: "center",
        },
      };
    },
  };
};

/**
 *  This create a column as group for storage and VM group
 *
 * @param header string
 * @param accessorKey string
 * @param columns
 * @returns object
 */
export function createGroupColumn(header: string, accessorKey: string, columns: any): any {
  return {
    header,
    accessorKey,
    enableSorting: false,
    muiTableHeadCellProps: () => ({
      "data-column-id": `${accessorKey}-gc`,
      "onMouseEnter": () => handleMouseEnterHover(accessorKey),
      "onMouseLeave": () => handleMouseLeave(),
    }),
    columns,
  };
}

/**
 * This handle to create a columns for group with createGroupColumn
 *
 * @param key string
 * @param header string
 * @param group string
 * @returns object
 */
export function createSubColumn(key: string, header: string, group: string) {
  return {
    "id": `${group}_${key}_${uuidv4()}`, // ✅ index ensures uniqueness
    "accessorKey": key,
    "enableSorting": false,
    header,
    "size": 120, // prevent column compression
    "minSize": 120, // prevent shrinking
    "data-column-id": `${key}-gc`,
    "data-group": group,
    "muiTableHeadCellProps": ({ column }: { column: { id: string } }) => ({
      "align": "center",
      "data-column-id": `${key}-gc`,
      "data-group": group,
      "onMouseEnter": () => handleMouseEnterHover(column.id),
      "onMouseLeave": () => handleMouseLeave(),
    }),
    "muiTableBodyCellProps": ({ row, column }: { row: any; column: any }) => ({
      "align": "center",
      "data-column-id": `${column.id}-gc`,
      "onMouseEnter": () => handleColumnHover(row, column.id),
      "onMouseLeave": () => handleMouseLeave(),
    }),
    "Cell": ({ row }: { row: { original: any } }) => row.original[key],
  };
}
