import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rootApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_BASE_URL}),
    endpoints: (builder) => {
        return {
            register: builder.mutation({
                query: ({fullName, email, password}) => {
                    console.log("🚀 ~ fullName:", fullName)
                    return {
                        url: "/signup",
                        method: "POST",
                        body: { fullName, email, password }
                    };
                }
            }),
            login: builder.mutation({
                query: ({email, password}) => {
                    return {
                        url: "/login",
                        method: "POST",
                        body: { email, password }
                    };
                }
            })

        }
    }
})

export const { useRegisterMutation, useLoginMutation } = rootApi;