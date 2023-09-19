import { apiSlice } from "../api/apiSlice";

const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // create endpoint for get user
        getUser: builder.query({
            query: (email) => ({
                url: `/users?email=${email}`,
            }),
        }),
    }),
});

// exports hooks 
export const { useGetUserQuery } = userApi;