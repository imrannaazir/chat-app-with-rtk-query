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

export type IMessage = {
  id: string;
  conversationId: string;
  message: string;
  timestamp: Date;
  sender: {
    id: string;
    name: string;
    email: string;
  };
  receiver: {
    id: string;
    name: string;
    email: string;
  };
};
