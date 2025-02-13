import { z } from 'zod';

export const authSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  'password-confirm': z.string()
});
