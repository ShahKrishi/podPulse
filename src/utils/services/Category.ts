import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => ({
        url: "Category/GetAll",
        method: "POST",
      }),
    }),

    saveCategory: builder.mutation({
      query: (params) => ({
        url: "Category/Upsert",
        method: "POST",
        body: {
          name: params.name,
        },
      }),
    }),
  }),
});

export const { useGetAllCategoryQuery, useSaveCategoryMutation } = categoryApi;
