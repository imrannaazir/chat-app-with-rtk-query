export type IConversationRequestData = {
  participants: string;
  userIds: string[];
  message: string;
  timestamp: Date;
};

export type IConversationQueryData = {
  participants_like: string | string[];
  _sort: string;
  _order: string;
  _page: string;
  _limit: string;
};
