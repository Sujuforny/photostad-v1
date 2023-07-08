import { apiSlice } from "@/store/api/apiSlice";

export const roleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRoles: builder.query({
        query: () => `/roles`,
      }),
    updateRoleById: builder.mutation({
        query: (id,credentials) => ({
        url: `roles/${id}`,
        method: "PUT",
        body:{...credentials}
       })
    }),
    getRoleById: builder.query({
        query: (id) => `/roles/${id}`,
      }),
    }),
});

export const { 
    useGetAllRolesQuery,
    useUpdateRoleByIdMutation,
    useGetRoleByIdQuery
} = roleApiSlice;