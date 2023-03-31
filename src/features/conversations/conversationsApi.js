import { apiSlice } from "../api/apiSlice";
import { messagesApi } from "../messages/messagesApi";

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
            query: ({ userEmail, participantEmail }) => ({
                url: `/conversations?participants_like=${userEmail}-${participantEmail}&&participants_like=${participantEmail}-${userEmail}`,
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
            query: ({ conversationId, data, sender }) => ({
                url: `/conversations/${conversationId}`,
                method: "PATCH",
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                //   optimistic cache update start
                const pathResult = dispatch(
                    apiSlice.util.updateQueryData(
                        "getConversations",
                        arg?.sender?.email,
                        (draft) => {
                            // eslint-disable-next-line eqeqeq
                            const draftConversation = draft.find(conversation => conversation?.id == arg?.sender?.id);
                            draftConversation.message = arg?.data?.message;
                            draftConversation.timestamp = arg?.data?.timestamp;
                        })
                );
                //optimistic cache update end
                try {
                    const data = await queryFulfilled;
                    const { data: conversation } = data || {}
                    // if got conversation id silently add message
                    if (conversation?.id) {
                        const receiver = arg?.data?.users?.find(user => user?.email !== arg?.sender?.email);
                        const sender = arg?.data?.users?.find(user => user?.email === arg?.sender?.email);

                        const res = await dispatch(messagesApi
                            .endpoints
                            .addMessage
                            .initiate({
                                conversationId: arg?.conversationId,
                                sender,
                                receiver,
                                message: arg?.data?.message,
                                timestamp: arg?.data?.timestamp,
                            })
                        ).unwrap();
                        //pessimistic cache update start
                        dispatch(apiSlice.util.updateQueryData("getMessages", res?.conversationId.toString(), (draft) => {
                            draft.push(res)
                        }))
                        //pessimistic cache update end
                    };
                } catch (error) {
                    // if got error undo optimistic cache update
                    pathResult.undo();
                }
            },
        }),
    }),
});

export const { useGetConversationsQuery, useGetConversationQuery, useAddConversationMutation, useEditConversationMutation } = conversationsApi;