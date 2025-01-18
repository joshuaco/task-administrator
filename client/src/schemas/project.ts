import { z } from 'zod';

export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string().nonempty(),
  clientName: z.string().nonempty(),
  description: z.string().nonempty()
});
