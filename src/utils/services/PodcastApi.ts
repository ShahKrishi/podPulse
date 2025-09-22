import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const podcastApi = createApi({
  reducerPath: "podcastApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: () => ({}),
});

export const {} = podcastApi;
