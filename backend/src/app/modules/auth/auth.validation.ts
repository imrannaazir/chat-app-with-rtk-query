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

const loginZodSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required!' })
      .email({ message: 'Email is not valid!' }),
    password: z.string({ required_error: 'Password is required!' }),
  }),
});

export const AuthValidation = {
  registerZodSchema,
  loginZodSchema,
};
