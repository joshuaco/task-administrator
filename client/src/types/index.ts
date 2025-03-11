import { authSchema, userSchema } from '@/schemas/auth';
import { projectSchema } from '@/schemas/project';
import {
  taskSchema,
  taskStatusSchema,
  taskActivitySchema,
  taskNoteSchema
} from '@/schemas/task';
import { teamMemberSchema } from '@/schemas/team';
import { z } from 'zod';

export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<
  Project,
  'projectName' | 'clientName' | 'description'
>;
export type Task = z.infer<typeof taskSchema>;
export type TaskStatus = z.infer<typeof taskStatusSchema>;
export type TaskFormData = Pick<Task, 'name' | 'description'>;
export type TaskActivity = z.infer<typeof taskActivitySchema>;

export type Auth = z.infer<typeof authSchema>;
export type LoginFormData = Pick<Auth, 'email' | 'password'>;
export type RegisterFormData = Pick<
  Auth,
  'name' | 'email' | 'password' | 'password-confirm'
>;
export type ForgotPasswordForm = Pick<Auth, 'email'>;
export type ResetPasswordForm = Pick<Auth, 'password' | 'password-confirm'>;

export type User = z.infer<typeof userSchema>;

export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMemberForm = Pick<TeamMember, 'email'>;

export type TaskNote = z.infer<typeof taskNoteSchema>;
export type TaskNoteForm = Pick<TaskNote, 'content'>;
