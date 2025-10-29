import type { PayloadAction } from "@reduxjs/toolkit";

import { createSelector, createSlice } from "@reduxjs/toolkit";

export type SupplyStateProps = {
  id?: number;
  startDate?: string | null;
  endDate?: string | null;
  name?: string;
  roleFamily?: string;
  careerLevel?: number;
  headCount?: number;
};

export type SupplyState = {
  activeSupply: SupplyStateProps | null;
  totalCount: number;
  supplyFilters: Record<string, string | null>;
  data: any;
};

const initialState: SupplyState = {
  data: null,
  totalCount: 0,
  activeSupply: {},
  supplyFilters: {
    search: "",
    startDateFilter: null,
    endDateFilter: null,
    roleFamilyFilter: null,
    careerLevelFilter: null,
  },
};

const supplySlice = createSlice({
  name: "supply",
  initialState,
  reducers: {
    setSupplyData: (
      state,
      action,
    ) => {
      state.data = action.payload.data;
      state.totalCount = action.payload.totalCount;
    },
    setSupplyFilters: (state, action) => {
      state.supplyFilters = action.payload;
    },
    clearSupplyData: (state) => {
      state.data = null;
      state.totalCount = 0;
      state.supplyFilters = {
        search: "",
        startDateFilter: null,
        endDateFilter: null,
        roleFamilyFilter: null,
        careerLevelFilter: null,
      };
    },
    setActiveSupply(state, action: PayloadAction<SupplyStateProps>) {
      state.activeSupply = action.payload;
    },
    clearActiveSupply(state) {
      state.activeSupply = null;
    },
  },
});

export const getActiveSupply = createSelector(
  (state: SupplyState) => state.activeSupply,
  (activeSupply: SupplyStateProps | null) => activeSupply,
);

export const { setSupplyData, clearSupplyData, setSupplyFilters, setActiveSupply, clearActiveSupply } = supplySlice.actions;
export default supplySlice.reducer;
