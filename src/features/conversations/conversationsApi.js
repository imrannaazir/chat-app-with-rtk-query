import { apiSlice } from "../api/apiSlice";

export const conversationsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // create endpoint for get conversations
        getConversations: builder.query({
            query: (email) => ({
                url: `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_CONVERSATIONS_PER_PAGE}`
            }),
        }),

        // create endpoint for get a conversation
        getConversation: builder.query({
            query: (conversationId) => ({
                url: `/conversations/${conversationId}`,
            }),
        }),

        // create endpoint for get for adding a conversation
        addConversation: builder.mutation({
            query: (data) => ({
                url: `/conversations`,
                method: "POST",
                body: data,
            }),
        }),

        // create endpoint for get for editing a conversations
        editConversation: builder.mutation({
            query: ({ conversationId, data }) => ({
                url: `/conversations`,
                method: "PATCH",
                body: data
            })
        })
    }),
});

export const { useGetConversationsQuery, useGetConversationQuery, useAddConversationMutation, useEditConversationMutation } = conversationsApi;