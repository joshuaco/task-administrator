import { z } from 'zod';
import { userSchema } from './auth';

export const teamMemberSchema = userSchema.pick({
  name: true,
  email: true,
  _id: true
});

export const teamMembersSchema = z.array(teamMemberSchema);
