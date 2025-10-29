import type { PayloadAction } from "@reduxjs/toolkit";

import { createSelector, createSlice } from "@reduxjs/toolkit";

import type { User, UsersPaginationProps } from "@/types/users";

export type UserState = {
  user: User | null;
  activeUser: UsersPaginationProps | null;
};

const initialState: UserState = {
  user: null,
  activeUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
    setActiveUser(state, action: PayloadAction<UsersPaginationProps>) {
      state.activeUser = action.payload;
    },
    clearActiveUser(state) {
      state.activeUser = null;
    },
  },
});

export const getUser = createSelector(
  state => state.user,
  (user: User) => user.user,
);

export const {
  setUser,
  clearUser,
  setActiveUser,
  clearActiveUser,
} = userSlice.actions;

export default userSlice.reducer;
