import { apiSlice } from "@/store/api/apiSlice";
export const tutorialManagementApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTutorialManagements: builder.query({
        query: () => `tutorial-managements`,
      }),
    updateTutorialManagementById: builder.mutation({
            query: (id,credentials) => ({
            url: `tutorial-managements/${id}/config-seo`,
            method: "PUT",
            body:{...credentials}
        }),
    }),


    }),
});
// auto generated hooks for getUser query (GET)
export const { 

    useGetAllTutorialManagementsQuery,
    useUpdateTutorialManagementByIdMutation
    
} = tutorialManagementApiSlice;


