import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER } from "../../constant";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER}/api/v1/product`,
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ sellerId, page, limit, search = "", category = "" }) => {
        let queryStr = `/seller/${sellerId}?page=${page}&limit=${limit}`;
        if (search) {
          queryStr += `&search=${encodeURIComponent(search)}`;
        }
        if (category) {
          queryStr += `&category=${encodeURIComponent(category)}`;
        }
        return queryStr;
      },
      providesTags: (result, error, { sellerId }) =>
        result && result.products
          ? [
              ...result.products.map(({ _id }) => ({
                type: "Product",
                id: _id,
              })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),

    productDetails: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    deleteProduct: builder.mutation({
      query: ({ id, sellerId }) => ({
        url: `/${id}`,
        method: "DELETE",
        body: { sellerId },
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    // New editProduct mutation endpoint
    editProduct: builder.mutation({
      query: ({ id, updatedProduct }) => ({
        url: `/${id}`,
        method: "PUT",
        body: updatedProduct,
      }),
      // Invalidate the list and the specific product so data refreshes
      invalidatesTags: (result, error, { id }) => [
        { type: "Product", id },
        { type: "Product", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useProductDetailsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useEditProductMutation,
} = productApi;
