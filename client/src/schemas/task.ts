import { z } from 'zod';

export const taskStatusSchema = z.enum([
  'pending',
  'completed',
  'in-progress',
  'on-hold',
  'under-review'
]);

const projectTaskSchema = z.object({
  _id: z.string(),
  projectName: z.string().nonempty(),
  clientName: z.string().nonempty()
});

export const taskProjectSchema = z.object({
  _id: z.string(),
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  project: projectTaskSchema,
  status: taskStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string()
});

export const taskSchema = z.object({
  _id: z.string(),
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  project: z.string().nonempty(),
  status: taskStatusSchema
});

export const taskResponseSchema = z.object({
  task: taskSchema,
  message: z.string()
});
