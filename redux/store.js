import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { productApi } from "./api/productApi";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productApi.middleware),
});

setupListeners(store.dispatch);
