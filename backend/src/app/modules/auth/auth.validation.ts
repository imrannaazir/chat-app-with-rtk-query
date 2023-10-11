import { z } from 'zod';

const registerZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required!' }),
    password: z.string({ required_error: 'Password is required' }),
    email: z
      .string({ required_error: 'Email is required!' })
      .email({ message: 'Email is not valid!' }),
  }),
});

export const AuthValidation = {
  registerZodSchema,
};
