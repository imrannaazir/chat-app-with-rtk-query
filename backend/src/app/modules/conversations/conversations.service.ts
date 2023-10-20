import { Conversation } from '@prisma/client';
import prismaDb from '../../../shared/prismaDb';
import {
  IConversationQueryData,
  IConversationRequestData,
} from './conversations.interface';

const getConversation = async (
  query: IConversationQueryData,
): Promise<Conversation[]> => {
  const { participants_like, _limit, _order, _page, _sort } = query;
  const conversations = await prismaDb.conversation.findMany({
    where: {
      OR: [
        {
          participants: {
            contains: participants_like[0],
          },
        },
        {
          participants: {
            contains: participants_like[1],
          },
        },
      ],
    },
    include: {
      users: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      [_sort]: _order,
    },
    take: parseInt(_limit) || 1,
    skip: (parseInt(_page) - 1) * parseInt(_limit) || 0,
  });

  return conversations;
};

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
      users: {
        connect: userIds.map((userId: string) => ({ id: userId })),
      },
    },
    include: {
      users: {
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

const editConversation = async (
  id: string,
  message: string,
  timestamp: number,
): Promise<Conversation> => {
  const conversation = await prismaDb.conversation.update({
    where: {
      id,
    },
    data: {
      message: message,
      timestamp: new Date(timestamp),
    },
    include: {
      users: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
  return conversation;
};
export const ConversationService = {
  createConversation,
  getConversation,
  editConversation,
};
