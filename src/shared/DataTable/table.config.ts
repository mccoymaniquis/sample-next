export const TABLE_CONFIG = {
  enableTopToolbar: false,
  enableBottomToolbar: false,
  enableColumnPinning: true,
  enableDensityToggle: true,
  enableColumnActions: false,
  enableHiding: true,
};

export const PAGINATION_TABLE_CONFIG = {
  enableBottomToolbar: true,
  enableTopToolbar: false,
  enableColumnActions: false,
  enableColumnPinning: true,
  enableDensityToggle: true,
  enableHiding: true,
  enableStickyHeader: true,
  enablePagination: true,
  manualPagination: true,
  initialState: { pagination: { pageIndex: 0, pageSize: 10 } },
  muiPaginationProps: {
    rowsPerPageOptions: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  },
};

export const muiPaginationProps = {};

export const sx = {
  "thead": {
    background: "white !important",
    position: "sticky !important",
    top: "0 !important",
    zIndex: "6 !important",
  },
  "borderRadius": 0,
  "tr": {
    "z-index": "auto",
  },
  "td": {
    opacity: 1,
    fontSize: 12,
  },
  "th": {
    backgroundColor: "#EAE8E8",
    boxShadow: 0,
    borderBottom: "1px solid #B4B4B4",
    opacity: 1,
    fontSize: 12,
    textTransform: "uppercase",
  },
  "th[data-pinned=\"true\"]::before": {
    backgroundColor: "#EAE8E8",
  },
  "& td, & th": {
    borderRight: "1px solid #EAE8E8", // Applies to all cells
    borderLeft: "1px solid #EAE8E8",
  },
  "tr:hover > td:after": {
    content: "\"\"",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgb(236 242 254)",
    zIndex: -1,
  },
  ".MuiTablePagination-root .MuiFormLabel-root": {
    fontWeight: "500 !important",
    fontSize: "12px",
    lineHeight: "150%",
    letterSpacing: "0%",
    verticalAlign: "middle",
  },
  ".MuiTablePagination-root .MuiSelect-select": {
    paddingBottom: "4p !important",
    fontSize: "12px",
  },
  ".MuiTablePagination-root span.MuiTypography-root": {
    fontWeight: "500 !important",
    fontSize: "12px",
  },
};
