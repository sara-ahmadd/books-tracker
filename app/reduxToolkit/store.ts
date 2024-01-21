import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/user/userSlice";
import { refreshReducer } from "./slices/refresh/refreshSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      userReducer,
      refreshReducer,
    },
  });
};

export type ApplicationStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<ApplicationStore["getState"]>;
export type AppDispatch = ApplicationStore["dispatch"];
