import { Conversation } from '@prisma/client';
import prismaDb from '../../../shared/prismaDb';
import { IConversationRequestData } from './conversations.interface';

const createConversation = async (
  data: IConversationRequestData,
): Promise<Conversation> => {
  const { participants, message, timestamp, userIds } = data || {};
  const timestampData = new Date(timestamp);
  const conversation = await prismaDb.conversation.create({
    data: {
      participants,
      message,
      timestamp: timestampData,
      user: {
        connect: userIds.map((userId: string) => ({ id: userId })),
      },
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });

  return conversation;
};

export const ConversationService = {
  createConversation,
};
