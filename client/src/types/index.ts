import { projectSchema } from '@/schemas/project';
import { taskSchema } from '@/schemas/task';
import { z } from 'zod';

export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<
  Project,
  'projectName' | 'clientName' | 'description'
>;
export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Pick<Task, 'name' | 'description'>;
