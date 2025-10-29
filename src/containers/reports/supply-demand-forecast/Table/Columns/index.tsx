import type { ReportsPaginationProps } from "@/types/reports";

// Generic column type
export type Column<T> = {
  key: keyof T | "action"; // Allow action as extra non-data column
  label: string;
  render?: (row: T) => React.ReactNode;
};

// Actual columns for SupplyPaginationProps
export const columns: Column<ReportsPaginationProps>[] = [
  {
    key: "roleFamily",
    label: "Role Family",
    render: row => row.roleFamily,
  },
  {
    key: "careerLevel",
    label: "Career Level",
    render: row => row.careerLevel,
  },
  {
    key: "demandWon",
    label: "Won (W)",
    render: row => row.demandWon,
  },
  {
    key: "demandRenewal",
    label: "Renewal (R)",
    render: row => row.demandRenewal,
  },
  {
    key: "demandCommit",
    label: "Commit (C)",
    render: row => row.demandCommit,
  },
  {
    key: "demandLikely",
    label: "Likely (L)",
    render: row => row.demandLikely,
  },
  {
    key: "demandUpside",
    label: "Upside (N)",
    render: row => row.demandUpside,
  },
  {
    key: "demandInvestmentTraining",
    label: "Investment Training (I)",
    render: row => row.demandInvestmentTraining,
  },
  {
    key: "demandPOC",
    label: "POC (P)",
    render: row => row.demandPOC,
  },
  {
    key: "demandPillarInvestment",
    label: "Pillar Investment (B)",
    render: row => row.demandPillarInvestment,
  },
  {
    key: "supply",
    label: "Supply",
    render: row => row.supply,
  },
  {
    key: "benchAfterWon",
    label: "W",
    render: row => row.benchAfterWon,
  },
  {
    key: "benchAfterWonRenewal",
    label: "W + R",
    render: row => row.benchAfterWonRenewal,
  },
  {
    key: "benchAfterRenewalCommit",
    label: "W + R + C",
    render: row => row.benchAfterRenewalCommit,
  },
  {
    key: "benchAfterLikely",
    label: "W + R + C + L",
    render: row => row.benchAfterLikely,
  },
  {
    key: "benchAfterPOC",
    label: "W + R + C + L + P",
    render: row => row.benchAfterPOC,
  },
  {
    key: "benchAfterUpsideAndAllOthers",
    label: "+ All Other Demands",
    render: row => row.benchAfterUpsideAndAllOthers,
  },
];
