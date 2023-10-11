import { z } from 'zod';
const createUserZodSchema = z.object({
  body: z.object({}),
});
