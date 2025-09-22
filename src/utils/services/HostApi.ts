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
          firstName: params.firstname,
          lastName: params.lastname,
          email: params.email,
          bio: params.bio,
          profileImage: params.profileImage,
        },
      }),
    }),
  }),
});

export const { useGetAllHostQuery, useSaveHostMutation } = hostApi;
