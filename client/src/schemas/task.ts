import { z } from 'zod';
import { userSchema } from './auth';

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

export const taskNoteSchema = z.object({
  _id: z.string(),
  content: z.string().min(1, 'Note cannot be empty'),
  createdBy: userSchema,
  createdAt: z.string(),
  task: z.string()
});

export const taskSchema = z.object({
  _id: z.string(),
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  project: z.string().nonempty().or(projectTaskSchema),
  status: taskStatusSchema,
  updatedBy: z
    .array(
      z.object({
        _id: z.string(),
        user: userSchema,
        status: taskStatusSchema,
        createdAt: z.string()
      })
    )
    .optional(),
  notes: z
    .array(
      taskNoteSchema.extend({
        createdBy: userSchema
      })
    )
    .optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional()
});

export const taskActivitySchema = z.object({
  _id: z.string(),
  user: userSchema,
  status: taskStatusSchema.optional(),
  note: taskNoteSchema.optional(),
  createdAt: z.string()
});
