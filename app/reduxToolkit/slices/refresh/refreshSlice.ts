import { createSlice } from "@reduxjs/toolkit";
const initialState = false;

const refreshSlice = createSlice({
  name: "refreshSlice",
  initialState,
  reducers: {
    setRefresh: (state, _action) => {
      return !state;
    },
  },
});

export const refreshReducer = refreshSlice.reducer;
export const refreshActions = refreshSlice.actions;
