import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://193.168.0.195:8000/api/v1/",
  }),
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => "cart/",
    }),
    addToCart: builder.mutation({
      query: (data) => ({
        url: "cart/",
        method: "POST",
        body: data,
      }),
    }),
    removeFromCart: builder.mutation({
      query: (data) => ({
        url: "cart/",
        method: "DELETE",
        body: data,
      }),
    }),
    updateToCart: builder.mutation({
      query: (data) => ({
        url: "cart/",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
  useUpdateToCartMutation,
} = cartApi;
