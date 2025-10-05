import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const episodeApi = createApi({
  reducerPath: "episodeApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getAllEpisode: builder.query({
      query: () => ({
        url: "Episode/GetAll",
        method: "POST",
      }),
    }),

    saveEpisode: builder.mutation({
      query: () => ({
        url: "Episode/Upsert",
        method: "POST",
      }),
    }),

    deleteEpisode: builder.mutation({
      query: (params) => ({
        url: "Episode/Delete",
        method: "POST",
        body: {
          id: params.id,
        },
      }),
    }),
  }),
});

export const {
  useGetAllEpisodeQuery,
  useSaveEpisodeMutation,
  useDeleteEpisodeMutation,
} = episodeApi;
