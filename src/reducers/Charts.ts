import type { PayloadAction } from "@reduxjs/toolkit";

import { createSelector, createSlice } from "@reduxjs/toolkit";
import moment from "moment";

import type { ChartBodyState, ChartFilterState, Charts, HighhestDemandWonData } from "@/types/charts";

const defaultValues = {
  month: { id: moment().format("M"), label: moment().format("MMMM") },
  year: { id: moment().format("Y"), label: moment().format("YYYY") },
  demandLevel: { id: "W", label: "Won" },
};

const defaultBenchValues = {
  month: { id: moment().format("M"), label: moment().format("MMMM") },
  year: { id: moment().format("Y"), label: moment().format("YYYY") },
  demandLevel: { id: "BenchAfterWon", label: "Bench After Won" },
};

const initialState: Charts = {
  highestDemand: {
    lastFilterTouched: "",
    data: [],
    filters: defaultValues,
    body: {
      demandLevel: "",
      startDate: "",
      endDate: "",
    },
  },
  highestBench: {
    lastFilterTouched: "",
    data: [],
    filters: defaultBenchValues,
    body: {
      demandLevel: "",
      startDate: "",
      endDate: "",
    },
  },
};

const chartsSlice = createSlice({
  name: "charts",
  initialState,
  reducers: {
    setHighestDemandData: (
      state,
      action: PayloadAction<HighhestDemandWonData[]>,
    ) => {
      state.highestDemand.data = action.payload;
    },
    setHighestDemandFilters: (state, action: PayloadAction<ChartFilterState>) => {
      state.highestDemand.filters = action.payload;
    },
    setHighestDemandBody: (state, action: PayloadAction<ChartBodyState>) => {
      state.highestDemand.body = action.payload;
    },
    setLastTouchedFilter: (state, action) => {
      state.highestDemand.lastFilterTouched = action.payload;
    },
    setHighestBenchData: (
      state,
      action: PayloadAction<HighhestDemandWonData[]>,
    ) => {
      state.highestBench.data = action.payload;
    },
    setHighestBenchFilters: (state, action: PayloadAction<ChartFilterState>) => {
      state.highestBench.filters = action.payload;
    },
    setHighestBenchBody: (state, action: PayloadAction<ChartBodyState>) => {
      state.highestBench.body = action.payload;
    },
    setLastTouchedBenchFilter: (state, action) => {
      state.highestBench.lastFilterTouched = action.payload;
    },
  },
});

export const getHighestDemandWon = createSelector(
  state => state.charts.highestDemand,
  highestDemand => highestDemand,
);

export const getHighestDemandWonData = createSelector(
  state => state.charts.highestDemand,
  highestDemand => highestDemand.data,
);

export const getHighestDemandFilters = createSelector(
  state => state.charts.highestDemand,
  highestDemand => highestDemand.filters,
);

export const getHighestBenchAfterWon = createSelector(
  state => state.charts.highestBench,
  highestBench => highestBench,
);

export const getHighestBenchAfterWonData = createSelector(
  state => state.charts.highestBench,
  highestBench => highestBench.data,
);

export const getHighestBenchFilters = createSelector(
  state => state.charts.highestBench,
  highestBench => highestBench.filters,
);

export const {
  setHighestDemandData,
  setHighestDemandFilters,
  setHighestBenchData,
  setHighestBenchFilters,
} = chartsSlice.actions;
export const {
  setLastTouchedFilter,
  setHighestDemandBody,
  setLastTouchedBenchFilter,
  setHighestBenchBody,
} = chartsSlice.actions;

export default chartsSlice.reducer;
