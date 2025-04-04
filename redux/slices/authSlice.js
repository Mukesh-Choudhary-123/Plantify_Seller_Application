import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  isAuthenticated: false,
  sellerId: null,
  username: null,
  email: null,
  token: null,
  isApproved: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { sellerId, token, isApproved, username, email } = action.payload;
      state.isAuthenticated = true;
      state.sellerId = sellerId;
      state.username = username;
      state.email = email;
      state.isApproved = isApproved;
      state.token = token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.email = null;
      state.username = null;
      state.isApproved = null;
      state.sellerId = null;
      state.token = null;
      // Remove stored credentials from AsyncStorage
      AsyncStorage.removeItem("credentials");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
