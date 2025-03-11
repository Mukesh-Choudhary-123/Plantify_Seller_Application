import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const LOCAL_IP = "192.168.43.74";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://${LOCAL_IP}:8000/api/v1/`,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "product/",
    }),
    productDetails: builder.mutation({
      query: (id) => `product/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useProductDetailsMutation } = productApi;
