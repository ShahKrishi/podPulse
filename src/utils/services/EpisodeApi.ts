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
      query: (params) => ({
        url: "Episode/Upsert",
        method: "POST",
        body: {
          id: params.id,
          podcastId: params.podcastId,
          title: params.title,
          description: params.description,
          url: params.url,
          duration: params.duration,
          releaseDate: params.releaseDate,
        },
      }),
    }),

    getByIdEpisode: builder.query({
      query: (params) => ({
        url: "Episode/GetById",
        method: "POST",
        body: {
          id: params.id,
        },
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

    getEpisodesByPodcast: builder.query({
      query: (params) => ({
        url: "Episode/GetEpisodeByPodcast",
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
  useGetByIdEpisodeQuery,
  useDeleteEpisodeMutation,
  useGetEpisodesByPodcastQuery,
} = episodeApi;
