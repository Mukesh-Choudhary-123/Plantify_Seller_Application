import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://193.168.0.195:8000/api/v1/",
  }),
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: () => "order/",
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: "order/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderQuery } = orderApi;
