import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser, refreshToken } from "../../api/user";

export const login = createAsyncThunk(
  "user/login",
  async (userInfo: { email: string; password: string }) => {
    const response = await loginUser(userInfo.email, userInfo.password);
    return response;
  },
);

export const register = createAsyncThunk(
  "user/register",
  async (userInfo: { email: string; password: string; username: string }) => {
    const response = await registerUser(
      userInfo.email,
      userInfo.password,
      userInfo.username,
    );
    return response;
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
  status: "idle" | "loading" | "failed";
};

const initialState: UserStateType = {
  email: "",
  username: "",
  access: null,
  refresh: null,
  status: "idle",
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
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "idle";
        state.email = action.payload.email;
        state.username = action.payload.username;
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
      })
      .addCase(login.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "idle";
        state.email = action.payload.email;
        state.username = action.payload.username;
      })
      .addCase(register.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(refreshAccessToken.pending, (state) => {
        state.status = "loading";
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.status = "idle";
        state.access = action.payload.access;
      })
      .addCase(refreshAccessToken.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
