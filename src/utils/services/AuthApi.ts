import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (params) => ({
                url: 'Auth/login',
                method: 'POST',
                body: {
                    email: params.email,
                    password: params.password
                },
            }),
        }),

        register: builder.mutation({
            query: (params) => ({
                url: 'Auth/register',
                method: 'POST',
                body: {
                    firstname: params.firstname,
                    lastname: params.lastname,
                    email: params.email,
                    password: params.password,
                }
            })
        })
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
