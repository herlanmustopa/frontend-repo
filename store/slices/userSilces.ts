import { fetchUsers, getUserById, updateUser } from "@/apis/userService";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UserState {
  users: User[]; 
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
};

export const getUsers = createAsyncThunk("users/getUsers", async (_, { rejectWithValue }) => {
  try {
    const response =  await fetchUsers();
    return response.users;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : "An unknown error occurred");
  }
});

export const getIdUser = createAsyncThunk(
  "users/getUserById",
  async (id: string, { rejectWithValue }) => {
    try {
      return await getUserById(id);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch user");
    }
  }
);

export const updateUsers = createAsyncThunk(
  "users/updateUser",
  async ({ id, name, email }: { id: string; name: string; email: string }, { rejectWithValue }) => {
    try {
      return await updateUser({ id, name, email });
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to update user");
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUsers.fulfilled, (state, action: PayloadAction<User>) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        state.selectedUser = action.payload; 
      })
      .addCase(updateUsers.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(getIdUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.selectedUser = action.payload;
      })
  },
});

export const { setSelectedUser } = userSlice.actions;
export default userSlice.reducer;
