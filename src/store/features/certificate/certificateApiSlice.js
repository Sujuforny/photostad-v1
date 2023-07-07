import { apiSlice } from "@/store/api/apiSlice";
export const certificateApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getAllCertificates: builder.query({
            query: ( ) => `certificates`
        }),
        getCertificateById: builder.query({
            query: (id) => `certificates${id}`
        }),
        removeCertificateById: builder.mutation({
            query: (id) => ({
              url: `certificates/${id}`,
              method: "DELETE",
          }),
        }),
        updateCertificateById: builder.mutation({
            query: ({id,credentials}) => ({
            url: `certificates/${id}`,
            method: "PUT",
            body:{...credentials}
          }),
          }),





    }),
  });
export const { 

 useGetAllCertificatesQuery,
 useGetCertificateByIdQuery,
 useRemoveCertificateByIdMutation,
 useUpdateCertificateByIdMutation

} = certificateApiSlice;
