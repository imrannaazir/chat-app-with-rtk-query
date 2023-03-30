import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// create api slice
export const apiSlice = createApi({
    reducerPath: "api",

    // base url configuration that we will extend to query all url
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL,
        prepareHeaders: async (headers, { getState, endpoint }) => {
            const token = getState()?.auth?.accessToken;
            if (token) {
                // if accessToken is available set headers
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),

    // all white listed tags that we will use to invalidate cache
    tagTypes: [],
    endpoints: (builder) => ({
        // all api query endpoint will be here...
        // we will inject every api of deferent feature: code splitting.
    }),
});