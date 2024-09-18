import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  refreshToken,
  getToken,
} from "../../api/user";

type UserStateType = {
  email: string;
  username: string;
  access: string | null;
  refresh: string | null;
};

const saveToLocalStorage = (state: UserStateType) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(state));
  }
};

const loadFromLocalStorage = (): UserStateType | null => {
  if (typeof window !== "undefined") {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  }
  return null;
};

export const login = createAsyncThunk(
  "user/login",
  async (userInfo: { email: string; password: string }) => {
    const user = await loginUser(userInfo.email, userInfo.password);
    const tokens = await getToken(userInfo.email, userInfo.password);
    return { ...user, ...tokens };
  },
);

export const register = createAsyncThunk(
  "user/register",
  async (userInfo: { email: string; password: string; username: string }) => {
    const user = await registerUser(
      userInfo.email,
      userInfo.password,
      userInfo.username,
    );
    const tokens = await getToken(userInfo.email, userInfo.password);
    return { ...user, ...tokens };
  },
);

export const refreshAccessToken = createAsyncThunk(
  "user/refreshToken",
  async (refresh: string | null) => {
    const response = await refreshToken(refresh);
    return response;
  },
);

const initialState: UserStateType = loadFromLocalStorage() || {
  email: "",
  username: "",
  access: null,
  refresh: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.email = "";
      state.username = "";
      state.access = null;
      state.refresh = null;
      saveToLocalStorage(state);
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.username = action.payload.username;
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
        saveToLocalStorage(state);
      })
      .addCase(register.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.username = action.payload.username;
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
        saveToLocalStorage(state);
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.access = action.payload.access;
        saveToLocalStorage(state);
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
