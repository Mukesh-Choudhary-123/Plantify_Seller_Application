import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER } from "../../constant";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER}/api/v1/order`,
  }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    getOrder: builder.query({
      // Accept an object with sellerId, page, limit, and filter
      query: ({ sellerId, page, limit, filter }) =>
        `/seller/${sellerId}?page=${page}&limit=${limit}&filter=${filter || ""}`,
      providesTags: (result, error, { sellerId }) =>
        result && result.orders
          ? [
              ...result.orders.map((order) => ({ type: "Order", id: order.id })),
              { type: "Order", id: "LIST" },
            ]
          : [{ type: "Order", id: "LIST" }],
    }),
    updateOrder: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/${orderId}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: [{ type: "Order", id: "LIST" }],
    }),
  }),
});

export const { useGetOrderQuery, useUpdateOrderMutation } = orderApi;
