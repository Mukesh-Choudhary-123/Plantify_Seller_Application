import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.43.74:8000/api/v1/user/",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({email , password}) => ({
        url: "login",
        method: "POST",
        body: {email , password},
      }),
    }),
    signup: builder.mutation({
      query: (credential) => ({
        url: "signup",
        method: "POST",
        body:credential
      })
    }),
    logout: builder.mutation({
      query: (credential) => ({
        url: "logout",
        method: "POST",
        body:credential
      })
    })
  }),
});

// Export hooks for usage in functional components
export const { useLoginMutation, useSignupMutation ,useLogoutMutation } = authApi;
