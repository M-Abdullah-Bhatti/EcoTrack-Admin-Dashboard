import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import usersSlice from "./features/usersSlice"; // Import the users slice
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Configure which key we want to persist
const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["currentUser"],
};

// Optionally, configure persistence for users slice
const usersPersistConfig = {
  key: "users",
  storage: storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, userSlice),
  users: persistReducer(usersPersistConfig, usersSlice), // Add users slice to the rootReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
