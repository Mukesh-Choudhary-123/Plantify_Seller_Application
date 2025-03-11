import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://193.168.0.195:8000/api/v1/",
  }),
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => "wishlist/",
    }),
    addToWishlist: builder.mutation({
      query: (data) => ({
        url: "wishlist/",
        method: "POST",
        body: data,
      }),
    }),
    removeFromWishlist: builder.mutation({
      query: (data) => ({
        url: "wishlist/",
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} = wishlistApi;
