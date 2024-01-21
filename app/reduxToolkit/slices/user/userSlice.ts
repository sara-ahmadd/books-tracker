import { userType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  email: "",
  password: "",
  name: "",
  books: [],
} as userType;

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
