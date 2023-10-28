import { io } from "socket.io-client";
import { apiSlice } from "../api/apiSlice";
import { messagesApi } from "../messages/messagesApi";

export const conversationsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // create endpoint for get conversations
        getConversations: builder.query({
            query: (email) => ({
                url: `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_CONVERSATIONS_PER_PAGE}`
            }),
            async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
                //func body...

                // create socket
                const socket = io("http://localhost:9000", {
                    reconnectionDelay: 1000,
                    reconnection: true,
                    reconnectionAttemps: 10,
                    transports: ["websocket"],
                    agent: false,
                    upgrade: false,
                    rejectUnauthorized: false,
                });

                // listen cacheDataLoaded
                try {
                    await cacheDataLoaded;
                    socket.on("conversation", (data) => {
                        updateCachedData((draft) => {
                            const conversation = draft?.find(
                                // eslint-disable-next-line eqeqeq
                                (c) => c.id == data?.data?.id
                            );
                            const isMyConversation = data?.data?.participants?.includes(arg);

                            const alreadyAvailableInDraft = draft?.find((c) => c.participants.includes(arg))
                            if (conversation?.id) {
                                conversation.message = data?.data?.message;
                                conversation.timestamp = data?.data?.timestamp;
                            } else if (!conversation?.id && isMyConversation && !alreadyAvailableInDraft) {
                                draft?.push(data?.data)
                                //do noting
                            }
                        });
                    });
                } catch (err) {
                    await cacheEntryRemoved;
                    socket.close();
                };
            },
        }),
        // create endpoint for get more conversations
        getMoreConversations: builder.query({
            query: ({ email, page }) => ({
                url: `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=${page}&_limit=${process.env.REACT_APP_CONVERSATIONS_PER_PAGE}`
            }),
            async onQueryStarted({ email, page }, { queryFulfilled, dispatch }) {
                try {
                    const data = await queryFulfilled;
                    const { data: conversations } = data || {}
                    // pessimistic cache update start for conversation 
                    if (conversations?.length > 0) {

                        dispatch(
                            apiSlice.util.updateQueryData(
                                "getConversations",
                                email,
                                (draft) => {
                                    return [...draft, ...conversations]

                                })
                        )
                    }
                } catch (error) {
                    //if error do nothing
                }
            }
        }),

        // create endpoint for get a conversation
        getConversation: builder.query({
            query: ({ userEmail, participantEmail }) => ({
                url: `/conversations?participants_like=${userEmail}-${participantEmail}&&participants_like=${participantEmail}-${userEmail}`,
            }),
        }),

        // create endpoint for get for adding a conversation
        addConversation: builder.mutation({
            query: ({ data, sender }) => {
                return ({
                    url: `/conversations`,
                    method: "POST",
                    body: data,
                })
            },
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const senderUser = arg?.data?.users?.find(user => user.email === arg.sender)
                const receiverUser = arg?.data?.users?.find(user => user.email !== arg.sender)


                try {
                    const data = await queryFulfilled
                    const conversationId = data?.data?.data?.id;

                    dispatch(apiSlice.util.updateQueryData("getConversations", arg.sender, (draft) => {
                        draft.data.push(data?.data?.data)
                    }))

                    dispatch(apiSlice.util.updateQueryData("getConversation", { userEmail: arg.sender, participantEmail: receiverUser.email }, (draft) => {
                        draft.data.push(data?.data?.data)
                    }))

                    if (conversationId) {
                        const messageResult = await dispatch(messagesApi.endpoints.addMessage.initiate({
                            conversationId,
                            senderId: senderUser.id,
                            receiverId: receiverUser.id,
                            message: arg?.data?.message,
                            timestamp: arg?.data?.timestamp,
                        })).unwrap()
                        //    pessimistic cache update for message 
                        dispatch(apiSlice.util.updateQueryData("getMessages", messageResult.data.conversationId, (draft) => {
                            draft.data.push(messageResult.data)
                        }))
                    }
                } catch (error) {
                }
            }

        }),

        // create endpoint for get for editing a conversations
        editConversation: builder.mutation({
            query: ({ conversationId, data, sender }) => {
                return ({
                    url: `/conversations/${conversationId}`,
                    method: "PATCH",
                    body: data
                })
            },
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // optimistic cache update
                const patchResult = await dispatch(apiSlice.util.updateQueryData("getConversations", arg.sender, (draft) => {
                    // draft > data(array of conversation)
                    const draftConversation = draft.data.find(conversation => conversation.id === arg.conversationId)
                    draftConversation.message = arg.data.message
                    draftConversation.timestamp = arg.data.timestamp
                }))

                try {
                    const data = await queryFulfilled;
                    const conversationId = data?.data?.data?.id;
                    const senderUser = arg?.data?.users?.find(user => user.email === arg.sender);
                    const receiverUser = arg?.data?.users?.find(user => user.email !== arg.sender);


                    // silently add messages
                    if (conversationId) {
                        const messageResult = await dispatch(messagesApi.endpoints.addMessage.initiate({
                            conversationId,
                            senderId: senderUser.id,
                            receiverId: receiverUser.id,
                            message: arg?.data?.message,
                            timestamp: arg?.data?.timestamp,
                        })).unwrap()
                        console.log(messageResult);

                        // pessimistic cache update 
                        dispatch(apiSlice.util.updateQueryData("getMessages", messageResult.data.conversationId, (draft) => {
                            // draft > data ( array of message) 
                            draft.data.push(messageResult.data)

                        }))
                        console.log(messageResult.data.id);
                    }
                } catch (error) {
                    //if got error than revert cache 
                    patchResult.undo()
                }
            }
        }),
    }),
});

export const { useGetConversationsQuery, useGetConversationQuery, useAddConversationMutation, useEditConversationMutation } = conversationsApi;