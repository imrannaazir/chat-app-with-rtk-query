import { z } from 'zod';

const PostMessageZodSchema = z.object({
  body: z.object({
    conversationId: z.string({
      required_error: 'Conversation Id is required!',
    }),
    senderId: z.string({ required_error: 'Sender Id is required!' }),
    receiverId: z.string({ required_error: 'Receiver Id is required!' }),
    message: z.string({ required_error: 'Message is required!' }),
    timestamp: z.number({ required_error: 'Timestamp is required!' }),
  }),
});

export const MessagesValidation = {
  PostMessageZodSchema,
};
