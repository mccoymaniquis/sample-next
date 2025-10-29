import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

import type { FilterProps, ReportState } from "@/types/reports";

const initialState: ReportState = {
  data: null,
  totalCount: 0,
  reportFilters: {
    roleFamily: null,
    careerLevel: null,
    frequency: null,
    startDateFilter: null,
    endDateFilter: null,
  },
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setReportData: (
      state,
      action: PayloadAction<ReportState>,
    ) => {
      state.data = action.payload.data;
      state.totalCount = action.payload.totalCount;
    },
    setReportFilters: (state, action: PayloadAction<FilterProps>) => {
      state.reportFilters = action.payload;
    },
    clearReportData: (state) => {
      state.data = null;
      state.totalCount = 0;
      state.reportFilters = {
        roleFamily: null,
        careerLevel: null,
        frequency: null,
        startDateFilter: null,
        endDateFilter: null,
      };
    },
  },
});

export const { setReportData, setReportFilters, clearReportData } = reportSlice.actions;
export default reportSlice.reducer;
