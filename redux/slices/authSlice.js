import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  sellerId: null,
  token: null,
  isApproved:null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { sellerId, token ,isApproved } = action.payload;
      state.isAuthenticated = true;
      state.sellerId = sellerId;
      state.isApproved= isApproved,
      state.token = token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.isApproved = null,
      state.sellerId = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
