import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

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

export const usersSlice = createSlice({
  name: "users",
  initialState: initialUsersState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserInfo[]>) => {
      state.users = action.payload;
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(user => user._id !== action.payload);
    },
  },
});

export const { setUsers, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
