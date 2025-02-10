"use client"; 

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {signInWithEmailAndPassword } from "firebase/auth";
import { authClient } from "@/config/firebaseConfig";

export const loginUser = createAsyncThunk("auth/loginUser", async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(authClient, email, password);
      const idToken = await userCredential.user.getIdToken();
  
      const response = await fetch("http://localhost:3300/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
  
      if (!response.ok) {
        throw new Error("Login failed!");
      }
  
      const data = await response.json();
      localStorage.setItem("token", data.token);
  
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
