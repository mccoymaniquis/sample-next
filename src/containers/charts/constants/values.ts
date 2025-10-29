import moment from "moment";

export const PLACEHOLDER_MESSAGE: Record<string, string> = {
  demandLevel: "No data available for the selected demand level.",
  datePeriod: "No data available for the selected date period.",
};

export const DEFAULT_VALUES = {
  month: { id: moment().format("M"), label: moment().format("MMMM") },
  year: { id: moment().format("Y"), label: moment().format("YYYY") },
  demandLevel: { id: "W", label: "Won" },
};

export const DEFAULT_BENCH_VALUES = {
  month: { id: moment().format("M"), label: moment().format("MMMM") },
  year: { id: moment().format("Y"), label: moment().format("YYYY") },
  demandLevel: { id: "BenchAfterWon", label: "Bench After Won" },
};

export const HD_DEMAND_LEVELS_OPT = [
  "Demand Won",
  "Demand Renewal",
  "Demand Commit",
  "Demand Likely",
  "Demand Upside",
  "Demand Investment Training",
  "Demand POC",
  "Demand Pillar Investment",
];

export const HD_DEMAND_LEVELS_BENCH_OPT = [
  { id: "BenchAfterWon", label: "Bench After Won" },
  { id: "BenchAfterRenewalCommit", label: "Bench After Won + Renewal + Commit" },
  { id: "BenchAfterPOC", label: "Bench After Won + Renewal + Commit + POC" },
  { id: "BenchAfterLikely", label: "Bench After Won + Renewal + Commit + Likely" },
  { id: "BenchAfterUpsideAndAllOthers", label: "Bench After Upside And All Others" },
];

export const MONTHS_OPTIONS = [
  { label: "January", id: 1 },
  { label: "February", id: 2 },
  { label: "March", id: 3 },
  { label: "April", id: 4 },
  { label: "May", id: 5 },
  { label: "June", id: 6 },
  { label: "July", id: 7 },
  { label: "August", id: 8 },
  { label: "September", id: 9 },
  { label: "October", id: 10 },
  { label: "November", id: 11 },
  { label: "December", id: 12 },
];
