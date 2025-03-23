import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {SERVER} from '../../constant'

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER}/api/v1/order`,
  }),
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: (sellerId) => `/seller/${sellerId}`,
    }),
    updateOrder: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {  useGetOrderQuery ,useUpdateOrderMutation } = orderApi;
