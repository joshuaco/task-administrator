import { z } from 'zod';
import { taskSchema } from './task';

export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string().nonempty(),
  clientName: z.string().nonempty(),
  description: z.string().nonempty(),
  tasks: z.array(taskSchema)
});

export const projectsSchema = z.array(projectSchema);
