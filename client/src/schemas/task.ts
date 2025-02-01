import { z } from 'zod';

export const taskStatusSchema = z.enum([
  'pending',
  'completed',
  'in-progress',
  'on-hold',
  'under-review'
]);

export const taskSchema = z.object({
  _id: z.string(),
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  project: z.string().optional(),
  status: taskStatusSchema
});

export const taskResponseSchema = z.object({
  task: taskSchema,
  message: z.string()
});
