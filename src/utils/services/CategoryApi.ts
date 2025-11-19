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
          id: params.id,
          name: params.name,
        },
      }),
    }),

    getByIdCategory: builder.query({
      query: (params) => ({
        url: "Category/GetById",
        method: "POST",
        body: {
          id: params.id,
        },
      }),
    }),

    deleteCategory: builder.mutation({
      query: (params) => ({
        url: "Category/Delete",
        method: "POST",
        body: {
          id: params.id,
        },
      }),
    }),

    getCategoryDropdown: builder.query({
      query: () => ({
        url: "Category/Dropdown",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetAllCategoryQuery,
  useSaveCategoryMutation,
  useGetByIdCategoryQuery,
  useDeleteCategoryMutation,
  useGetCategoryDropdownQuery,
} = categoryApi;
