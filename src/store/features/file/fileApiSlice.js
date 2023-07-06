import { apiSlice } from "@/store/api/apiSlice";
export const fileApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllFiles: builder.query({
          query: () => `files`,
          invalidatesTags: ['Files'],
      }),
        getFileByName: builder.query({
          query: (name) => `files/${name}`,
      }),
        removeAllFiles: builder.mutation({
          query: () => ({
            url: "files",
            method: "DELETE",
        }),
      }),
    }),
  });
export const { 
  useGetAllFilesQuery ,
  useGetFileByNameQuery,
  useRemoveAllFilesMutation
} = fileApiSlice;
