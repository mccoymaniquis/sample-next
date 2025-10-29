import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

import type { DemandPaginationProps, DemandState, FilterProps } from "@/types/demand";

const initialState: DemandState = {
  data: null,
  totalCount: 0,
  demandFilters: {
    search: "",
    startDateFilter: undefined,
    endDateFilter: undefined,
    roleFamilyFilter: null,
    careerLevelFilter: null,
    opptyTaggingFilter: null,
    opptyFunnelFilter: null,
    soTagFilter: null,
  },
  activeDemand: null,
};

const demandSlice = createSlice({
  name: "demand",
  initialState,
  reducers: {
    setDemandData: (
      state,
      action: PayloadAction<DemandState>,
    ) => {
      state.data = action.payload.data;
      state.totalCount = action.payload.totalCount;
    },
    setDemandFilters: (state, action: PayloadAction<FilterProps>) => {
      state.demandFilters = action.payload;
    },
    clearDemandData: (state) => {
      state.data = null;
      state.totalCount = 0;
      state.demandFilters = {
        search: "",
        startDateFilter: undefined,
        endDateFilter: undefined,
        roleFamilyFilter: null,
        careerLevelFilter: null,
        opptyTaggingFilter: null,
        opptyFunnelFilter: null,
        soTagFilter: null,
      };
    },
    setActiveDemand: (state, action: PayloadAction<DemandPaginationProps>) => {
      state.activeDemand = action.payload;
    },
    clearActiveDemand: (state) => {
      state.activeDemand = null;
    },
  },
});

export const { setDemandData, clearDemandData, setDemandFilters, setActiveDemand, clearActiveDemand } = demandSlice.actions;
export default demandSlice.reducer;
