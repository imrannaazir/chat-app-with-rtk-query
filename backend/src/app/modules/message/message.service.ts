import { Message } from '@prisma/client';
import { IMessageRequestData } from './message.interface';
import prismaDb from '../../../shared/prismaDb';

const PostMessage = async (data: IMessageRequestData): Promise<Message> => {
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

export const MessageService = {
  PostMessage,
};
