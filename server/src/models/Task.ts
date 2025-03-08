import mongoose, { Document, ObjectId } from 'mongoose';

export const taskStatus = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  IN_PROGRESS: 'in-progress',
  ON_HOLD: 'on-hold',
  UNDER_REVIEW: 'under-review'
} as const;

export type TaskStatus = (typeof taskStatus)[keyof typeof taskStatus];

export type TaskType = Document & {
  name: string;
  description: string;
  project: ObjectId;
  status: TaskStatus;
  updatedBy: {
    user: ObjectId;
    status: TaskStatus;
  }[];
};

const TaskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    project: { type: mongoose.Types.ObjectId, ref: 'Project' },
    status: {
      type: String,
      enum: Object.values(taskStatus),
      default: taskStatus.PENDING
    },
    updatedBy: [
      {
        user: { type: mongoose.Types.ObjectId, ref: 'User', default: null },
        status: {
          type: String,
          enum: Object.values(taskStatus),
          default: taskStatus.PENDING
        }
      }
    ]
  },
  { timestamps: true }
);

const Task = mongoose.model<TaskType>('Task', TaskSchema);

export default Task;
