import { apiSlice } from "@/store/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
        getUser: builder.query({
        query: () => `/auth/me`,
        keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
        providesTags: ["User"], // provideTags are used for updating cache
        }),
        getAllUsers: builder.query({
          query: ({page,limit}) => `/users?page=${page}&limit=${limit}`,
        }),
        getUserByEmail: builder.query({
          query: ({userEmail}) => `/users/email?email=${userEmail}`,
        }),  
        getUserById: builder.query({
          query: (id) => `/users?id=${id}`,
        }), 
        removeUserById: builder.mutation({
          query: (id) => ({
            url: `users/${id}`,
            method: "DELETE",
          }),
        }),
        updateUserById: builder.mutation({
          query: ({id,credentials}) => ({
          url: `users/${id}`,
          method: "PUT",
          body:{...credentials}
        }),
        }),
        addNewUser: builder.mutation({
          query: ({credentials}) => ({
          url: `users`,
          method: "POST",
          body:{...credentials}
        }),
        }),
        updatePasswordById: builder.mutation({
          query: (id,credentials) => ({
          url: `users/${id}/change-password`,
          method: "PUT",
          body:{...credentials}
        }),
        }),
        updateProfileById: builder.mutation({
          query: ({id,credentials}) => ({
          url: `users/${id}/update-profile`,
          method: "PUT",
          body:{...credentials}
        }),
        }),


      }),
});

// auto generated hooks for getUser query (GET)
export const { 
  useGetUserQuery,
  useGetAllUsersQuery,
  useGetUserByEmailQuery,
  useGetUserByIdQuery,
  useRemoveUserByIdMutation,
  useUpdateUserByIdMutation,
  useAddNewUserMutation,
  useUpdatePasswordByIdMutation,
  useUpdateProfileByIdMutation
} = userApiSlice;


