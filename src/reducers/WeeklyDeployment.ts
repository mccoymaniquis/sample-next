import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

import type { FilterProps, ReportState } from "@/types/weeklyDeployment";

const initialState: ReportState = {
  data: null,
  totalCount: 0,
  weeklyDeploymentFilter: {
    roleFamily: null,
    careerLevel: null,
    startDateFilter: null,
    endDateFilter: null,
    client: null,
    projectName: null,
  },
};

const reportSlice = createSlice({
  name: "weeklyDeploymentFilter",
  initialState,
  reducers: {
    setWeeklyDeploymentData: (
      state,
      action: PayloadAction<ReportState>,
    ) => {
      state.data = action.payload.data;
      state.totalCount = action.payload.totalCount;
    },
    setWeeklyDeploymentFilters: (state, action: PayloadAction<FilterProps>) => {
      state.weeklyDeploymentFilter = action.payload;
    },
    clearWeeklyDeploymentData: (state) => {
      state.data = null;
      state.totalCount = 0;
      state.weeklyDeploymentFilter = {
        roleFamily: null,
        careerLevel: null,
        startDateFilter: null,
        endDateFilter: null,
        client: null,
        projectName: null,
      };
    },
  },
});

export const { setWeeklyDeploymentData, setWeeklyDeploymentFilters, clearWeeklyDeploymentData } = reportSlice.actions;
export default reportSlice.reducer;
