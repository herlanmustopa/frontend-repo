import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlices";
import userReducer from "./slices/userSilces";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
