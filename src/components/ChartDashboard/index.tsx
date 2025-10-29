import type { ComponentType } from "react";

import dynamic from "next/dynamic";

type ChartType = "dualBarChart" | "combinedLineBarChart" | "bar";

type ChartProps = {
  title?: string;
  data?: any;
  [key: string]: any;
};

/* params to update this: chartType */
const chartComponents: Record<ChartType, () => Promise<ComponentType<ChartProps>>> = {
  /* TWO Bar Charts side by side */
  dualBarChart: () =>
    import("../NoSSRChart").then(mod => mod.default as ComponentType<ChartProps>),
  /* Combination of line and bar chart */
  combinedLineBarChart: () =>
    import("../CombinedChart").then(mod => mod.default as ComponentType<ChartProps>),
  /* Bar chart only */
  bar: () =>
    import("../BarChart").then(mod => mod.default as ComponentType<ChartProps>),
};

type ChartDashboardProps = {
  chartType?: ChartType;
} & ChartProps;

function ChartDashboard({ chartType = "dualBarChart", ...rest }: ChartDashboardProps) {
  const DynamicChart = dynamic(chartComponents[chartType], { ssr: false });

  return <DynamicChart {...rest} />;
}

export default ChartDashboard;
