import { Message } from '@prisma/client';
import { IMessageRequestData, IMessagesQueryData } from './message.interface';
import prismaDb from '../../../shared/prismaDb';

const postMessage = async (data: IMessageRequestData): Promise<Message> => {
  const { conversationId, message, receiverId, senderId, timestamp } = data;
  const result = await prismaDb.message.create({
    data: {
      timestamp: new Date(timestamp),
      conversationId,
      receiverId,
      senderId,
      message,
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      receiver: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return result;
};

const getMessages = async (
  queryData: IMessagesQueryData,
): Promise<Message[]> => {
  const { conversationId, _limit, _order, _page, _sort } = queryData;

  const messages = await prismaDb.message.findMany({
    where: {
      conversationId,
    },
  });

  return messages;
};

export const MessageService = {
  postMessage,
  getMessages,
};
