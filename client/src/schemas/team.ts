import { userSchema } from './auth';

export const teamMemberSchema = userSchema.pick({
  name: true,
  email: true,
  _id: true
});
