import { z } from 'zod';

export const authSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  'password-confirm': z.string()
});

export const loginSchema = z.object({
  message: z.string(),
  token: z.string()
});

export const userSchema = authSchema
  .pick({
    name: true,
    email: true
  })
  .extend({
    _id: z.string()
  });
