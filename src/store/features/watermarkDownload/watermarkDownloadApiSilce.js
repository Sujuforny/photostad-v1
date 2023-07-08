import { apiSlice } from "@/store/api/apiSlice";
export const watermarkDownloadApiSilce = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addWatermarkDownload: builder.mutation({
        query: ({credentials}) => ({
        url: `/watermark-downloads`,
        method: "POST",
        body:{...credentials}
      }),
    }),
    getWatermarkById: builder.query({
        query: (id) => `/watermark-downloads/${id}`,
    }),
    getAllWatermarkDownloads: builder.query({
        query: () => `/watermark-downloads`,
    }),
    updateWatermarkDownloadById: builder.mutation({
        query: ({id,credentials}) => ({
        url: `/watermark-downloads/${id}`,
        method: "PUT",
        body:{...credentials}
      }),
    }),
    removeWatermarkDownloadById: builder.mutation({
        query: ({id}) => ({
          url: `/watermark-downloads/${id}`,
          method: "DELETE",
        }),
      }),
      
    }),
});
// auto generated hooks for getUser query (GET)
export const { 
    useAddWatermarkDownloadMutation,
    useGetWatermarkByIdQuery,
    useGetAllWatermarkDownloadsQuery,
    useUpdateWatermarkDownloadByIdMutation,
    useRemoveWatermarkDownloadByIdMutation  
} = watermarkDownloadApiSilce;


