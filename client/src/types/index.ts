import { projectSchema } from '@/schemas/project';
import { z } from 'zod';

export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<
  Project,
  'projectName' | 'clientName' | 'description'
>;
