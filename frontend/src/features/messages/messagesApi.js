import { apiSlice } from "../api/apiSlice";

export const messagesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // create endpoint for get messages
        getMessages: builder.query({
            query: (conversationId) => ({
                url: `/messages?conversationId=${conversationId}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_MESSAGES_PER_PAGE}`
            }),
        }),

        // create endpoint for get for add message
        addMessage: builder.mutation({
            query: (data) => ({
                url: `/messages`,
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi;