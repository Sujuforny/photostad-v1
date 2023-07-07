// this the extended slice for auth
import { apiSlice } from "@/store/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // build.mutation is used for POST, PUT, DELETE
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: { ...credentials }
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "auth/register",
        method: "POST",
        body: { ...credentials }
      })
    }),
    verify: builder.mutation({
      query: (email) => ({
        url: `auth/verify?email=${email}`,
        method: "POST",
      })
    }),
    checkVerify: builder.mutation({
      query: (credentials) => ({
        url: `auth/check-verify`,
        method: "POST",
        body: { ...credentials }
      })
    }),
    getAdmin: builder.query({
     query: () => `auth/dashboard/me`,
    }),








  }),
});
// auto generated hooks for login mutation
// auth/check-verify auth/dashboard/me
export const { 
  useLoginMutation,
  useRegisterMutation,
  useVerifyMutation,
  useCheckVerifyMutation,
  useGetAdminQuery,
 } = authApiSlice;
