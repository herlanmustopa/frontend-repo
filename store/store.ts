import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlices"; // Sesuaikan path jika perlu

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
