import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const podcastApi = createApi({
  reducerPath: "podcastApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getAllPodcast: builder.query({
      query: (params) => ({
        url: "Podcast/GetAll",
        method: "POST",
        body: {
          searchText: params.searchText,
        },
      }),
    }),

    savePodcast: builder.mutation({
      query: (params) => ({
        url: "Podcast/Upsert",
        method: "POST",
        body: {
          podcastID: params.podcastID,
          title: params.title,
          description: params.description,
          hostId: params.hostId,
          categorieId: params.categorieId,
        },
      }),
    }),

    getByIdPodcast: builder.query({
      query: (params) => ({
        url: "Podcast/GetById",
        method: "POST",
        body: {
          id: params.id,
        },
      }),
    }),

    deletePodcast: builder.mutation({
      query: (params) => ({
        url: "Podcast/Delete",
        method: "POST",
        body: {
          id: params.id,
        },
      }),
    }),

    getPodcastDropdown: builder.query({
      query: () => ({
        url: "Podcast/Dropdown",
        method: "POST",
      }),
    }),

    getPodcastByHost: builder.query({
      query: (params) => ({
        url: "Podcast/GetPodcastByHost",
        method: "POST",
        body: {
          id: params.id,
        },
      }),
    }),
  }),
});

export const {
  useGetAllPodcastQuery,
  useSavePodcastMutation,
  useGetByIdPodcastQuery,
  useDeletePodcastMutation,
  useGetPodcastDropdownQuery,
  useGetPodcastByHostQuery,
} = podcastApi;
