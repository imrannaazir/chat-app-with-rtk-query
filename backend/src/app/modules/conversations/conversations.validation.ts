import { z } from 'zod';

const createConversationZodSchema = z.object({
  body: z.object({
    participants: z.string({
      required_error: 'Participants email is required!',
    }),
    message: z.string({ required_error: 'Message is required!.' }),
    timestamp: z.number({ required_error: 'timestamp is required!' }),
    userIds: z.array(z.string({ required_error: 'userId is required!' })),
  }),
});

export const ConversationValidation = {
  createConversationZodSchema,
};
