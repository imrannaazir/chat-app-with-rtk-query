import { Message } from '@prisma/client';
import {
  IMessage,
  IMessageRequestData,
  IMessagesQueryData,
} from './message.interface';
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
): Promise<IMessage[]> => {
  const { conversationId, _limit, _order, _page, _sort } = queryData;

  const messages = await prismaDb.message.findMany({
    where: {
      conversationId,
    },
    take: parseInt(_limit),
    skip: (parseInt(_page) - 1) * parseInt(_limit),
    orderBy: {
      [_sort]: _order,
    },
    select: {
      conversationId: true,
      id: true,
      message: true,
      timestamp: true,

      receiver: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
      sender: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });

  return messages;
};

export const MessageService = {
  postMessage,
  getMessages,
};
