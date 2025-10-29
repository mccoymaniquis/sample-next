export type TabOption = {
  name: string;
  label: string;
  component: React.ComponentType;
};

export type ChartData = {
  roleFamily: string;
  careerLevel: number;
  demandWon: number;
  benchAfterWon: number;
};

export type BarChartData = {
  roleName: string;
  careerLevel: number;
  benchCount: number;
};

export type ChartProps = {
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  data: ChartData[];
  emptyLabel?: string;
};

export type BarChartProps = {
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  data: BarChartData[];
  emptyLabel?: string;
};

export type ChartFilterState = {
  lastFilterTouched?: string;
  demandLevel?: Record<string, string> | null;
  month?: Record<string, string> | null;
  year?: Record<string, string> | null;
};

export type HighhestDemandWonData = {
  roleFamily: string;
  careerLevel: number;
  demand: number;
  benchAfterWon: number;
};

export type ChartBodyState = {
  demandLevel?: string | null;
  startDate?: string | null;
  endDate?: string | null;
};

export type Charts = {
  highestDemand: {
    lastFilterTouched: string;
    data: HighhestDemandWonData[];
    filters: ChartFilterState;
    body: ChartBodyState;
  };
  highestBench: {
    lastFilterTouched: string;
    data: HighhestDemandWonData[];
    filters: ChartFilterState;
    body: ChartBodyState;
  };
};

export type CustomYAxisLabelProps = {
  viewBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  position: "left" | "right";
  label: string;
};
