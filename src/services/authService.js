import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiKey, baseAuthUrl } from "../databases/user";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: baseAuthUrl }),
    endpoints: (builder) => ({
        signIn: builder.mutation({
            query: ({ ...auth }) => ({
                url: `/accounts:signInWithPassword?key=${apiKey}`,
                method: "POST",
                body: auth
            })
        })
    }),
})

export const { useSignInMutation } = authApi
