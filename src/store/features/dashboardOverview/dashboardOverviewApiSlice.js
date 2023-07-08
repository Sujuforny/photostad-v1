import { apiSlice } from "@/store/api/apiSlice";

export const reportAndStatisticApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDashboardOverviews: builder.query({
        query: () => `dashboard-overviews`,
      }),
    }),
});

// auto generated hooks for getUser query (GET)

export const { 

  useGetAllDashboardOverviewsQuery,

} = reportAndStatisticApiSlice;


