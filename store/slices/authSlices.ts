"use client";

import { loginWithEmail, refreshAuthToken, registerUser } from "@/apis/authService";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: AuthState = {
  user: null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  refreshToken: typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null,
  loading: false,
  error: null,
  successMessage: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const data = await loginWithEmail(email, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "An unknown error occurred");
    }
  }
);

export const refreshUserToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState };
      if (!state.auth.refreshToken) throw new Error("No refresh token available");

      const data = await refreshAuthToken(state.auth.refreshToken);
      localStorage.setItem("token", data.token);
      return data.token;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to refresh token");
    }
  }
);

export const registerUserThunk = createAsyncThunk(
    "auth/registerUser",
    async ({ name, email, password }: { name: string; email: string; password: string }, { rejectWithValue }) => {
      try {
        return await registerUser({ name, email, password });
      } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : "Failed to register user");
      }
    }
  );


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string; refreshToken: string }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(refreshUserToken.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(refreshUserToken.rejected, (state) => {
        state.token = null;
        state.refreshToken = null;
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
      })
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
        state.successMessage = null;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = "User registered successfully!";
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, loginSuccess } = authSlice.actions;
export default authSlice.reducer;
