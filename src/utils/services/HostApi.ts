import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const hostApi = createApi({
  reducerPath: "hostApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getAllHost: builder.query({
      query: () => ({
        url: "Host/GetAll",
        method: "POST",
      }),
    }),

    saveHost: builder.mutation({
      query: (params) => ({
        url: "Host/Upsert",
        method: "POST",
        body: {
          hostID: params.hostID,
          firstName: params.firstName,
          lastName: params.lastName,
          email: params.email,
          bio: params.bio,
          profileImage: params.profileImage,
        },
      }),
    }),

    getHostByID: builder.query({
      query: (params) => ({
        url: "Host/GetById",
        method: "POST",
        body: {
          id: params.id,
        },
      }),
    }),

    deleteHost: builder.mutation({
      query: (params) => ({
        url: "Host/Delete",
        method: "POST",
        body: {
          id: params.id,
        },
      }),
    }),

    getHostDropdown: builder.query({
      query: () => ({
        url: "Host/Dropdown",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetAllHostQuery,
  useSaveHostMutation,
  useGetHostByIDQuery,
  useDeleteHostMutation,
  useGetHostDropdownQuery,
} = hostApi;
