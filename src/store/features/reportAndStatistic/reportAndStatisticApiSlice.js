import { apiSlice } from "@/store/api/apiSlice";
export const reportAndStatisticApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStatistics: builder.query({
        query: () => `/statistics`,
      }),
    getGenerateCerificate: builder.query({
        query: () => `/statistics/certificate`,
      }),
    getGenerateWatermark: builder.query({
        query: () => `/statistics/watermarks`,
      }),
    getCertificateDownload: builder.query({
        query: () => `/statistics/certificate-download`,
      }),
    getWatermarkDownload: builder.query({
        query: () => `/statistics/Watermark-download`,
      }),

    }),
});
// auto generated hooks for getUser query (GET)
export const { 
    useGetStatisticsQuery,
    useGetGenerateCerificateQuery,
    useGetGenerateWatermarkQuery,
    useGetCertificateDownloadQuery,
    useGetWatermarkDownloadQuery,
} = reportAndStatisticApiSlice;


