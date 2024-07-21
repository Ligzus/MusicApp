import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser, refreshToken, getToken } from "../../api/user";

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
    const user = await registerUser(userInfo.email, userInfo.password, userInfo.username);
    const tokens = await getToken(userInfo.email, userInfo.password);
    return { ...user, ...tokens };
  },
);

export const refreshAccessToken = createAsyncThunk(
  "user/refreshToken",
  async (refresh: string) => {
    const response = await refreshToken(refresh);
    return response;
  },
);

type UserStateType = {
  email: string;
  username: string;
  access: string | null;
  refresh: string | null;
};

const initialState: UserStateType = {
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.username = action.payload.username;
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.username = action.payload.username;
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.access = action.payload.access;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
