import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (params) => ({
        url: "Auth/login",
        method: "POST",
        body: {
          email: params.email,
          password: params.password,
        },
      }),
    }),

    register: builder.mutation({
      query: (params) => ({
        url: "Auth/register",
        method: "POST",
        body: {
          firstname: params.firstname,
          lastname: params.lastname,
          email: params.email,
          password: params.password,
        },
      }),
    }),

    getAllUsers: builder.query({
      query: (params) => ({
        url: "User/GetAll",
        method: "POST",
        body: {
          searchText: params.searchText,
        },
      }),
    }),

    saveUsers: builder.mutation({
      query: (params) => ({
        url: "User/Upsert",
        method: "POST",
        body: {
          id: params.id,
          firstName: params.firstName,
          lastName: params.lastName,
          email: params.email,
          passHash: params.passHash,
          role: params.role,
        },
      }),
    }),

    getByIdUser: builder.query({
      query: (params) => ({
        url: "User/GetById",
        method: "POST",
        body: {
          id: params.id,
        },
      }),
    }),

    deleteUser: builder.mutation({
      query: (params) => ({
        url: "User/Delete",
        method: "POST",
        body: {
          id: params.id,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetAllUsersQuery,
  useSaveUsersMutation,
  useGetByIdUserQuery,
  useDeleteUserMutation,
} = authApi;
