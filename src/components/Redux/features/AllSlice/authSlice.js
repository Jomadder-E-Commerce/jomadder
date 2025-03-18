"use client";

import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { deleteCookie, getCookie, getLocalStorage, removeLocalStorage, setLocalStorage } from "@/components/shared/LocalStorage/LocalStorage";

const initialState = {
  token: getLocalStorage("token") || null,
  user: getLocalStorage("user") || null,
  // refreshtoken: getCookie("refreshtoken") || null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      // state.refreshtoken = action.payload.refreshtoken;

      // ✅ Store token in localStorage
      setLocalStorage("token", action.payload.token);
      setLocalStorage("user", action.payload.user);

    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshtoken = null;

      // ✅ Remove from localStorage
      removeLocalStorage("token");
      removeLocalStorage("user");

      // ✅ Remove from cookies
      deleteCookie("accessToken");
      deleteCookie("refreshtoken");
    },
  }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;