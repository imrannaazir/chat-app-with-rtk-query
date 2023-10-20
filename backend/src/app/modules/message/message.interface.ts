export type IMessageRequestData = {
  conversationId: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: number;
};

export type IMessagesQueryData = {
  conversationId: string;
  _sort: string;
  _order: string;
  _page: string;
  _limit: string;
};
