import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch, RootState } from "../store"; // Import types
import baseUrl from "@/utils/baseUrl";

export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  role: string;
  virtualCoins: number;
}

interface UsersState {
  users: UserInfo[];
}

const initialUsersState: UsersState = {
  users: [],
};

// Create the async thunk for deleting a user
export const deleteUserAsync = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch; state: RootState }
>("users/deleteUser", async (userId, { dispatch }) => {
  try {
    await axios.delete(`${baseUrl}/api/admin/users/${userId}`);
    dispatch(deleteUser(userId));
  } catch (error) {
    console.error("Failed to delete user: ", error);
  }
});

export const usersSlice = createSlice({
  name: "users",
  initialState: initialUsersState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserInfo[]>) => {
      state.users = action.payload;
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    // Handle any extra reducers if necessary
  },
});

export const { setUsers, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
