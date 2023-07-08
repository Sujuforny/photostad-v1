import { apiSlice } from "@/store/api/apiSlice";
export const certificateDownloadApiSilce = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCertificateDownload: builder.mutation({
        query: ({credentials}) => ({
        url: `/certificate-downloads`,
        method: "POST",
        body:{...credentials}
      }),
    }),
    getCertificateById: builder.query({
        query: (id) => `/certificate-downloads/${id}`,
    }),
    getAllCertificateDownloads: builder.query({
        query: () => `/certificate-downloads`,
    }),
    updateCertificateDownloadById: builder.mutation({
        query: ({id,credentials}) => ({
        url: `/certificate-downloads/${id}`,
        method: "PUT",
        body:{...credentials}
        }),
    }),
    removeCertificateDownloadById: builder.mutation({
        query: ({id}) => ({
          url: `/certificate-downloads/${id}`,
          method: "DELETE",
        }),
      }),
    }),
});
// auto generated hooks for getUser query (GET)
export const { 
    useAddCertificateDownloadMutation,
    useGetCertificateByIdQuery,
    useGetAllCertificateDownloadsQuery,
    useUpdateCertificateDownloadByIdMutation,
    useRemoveCertificateDownloadByIdMutation  
} = certificateDownloadApiSilce;


