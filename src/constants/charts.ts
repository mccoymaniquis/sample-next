import type { TabOption } from "@/types/charts";

import HighestBenchTab from "@/containers/charts/HighestBench";
import HighestDemandTab from "@/containers/charts/HighestDemand";

export const tabOptions: TabOption[] = [
  { name: "highest-demand", label: "Top 10 Roles with Highest Demand", component: HighestDemandTab },
  { name: "highest-bench", label: "Top 10 Roles with Highest Bench", component: HighestBenchTab },
];
