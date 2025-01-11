import mongoose, { Document, ObjectId } from 'mongoose';

export type TaskType = Document & {
  name: string;
  description: string;
  project: ObjectId;
};

const TaskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    project: { type: mongoose.Types.ObjectId, ref: 'Project' }
  },
  { timestamps: true }
);

const Task = mongoose.model<TaskType>('Task', TaskSchema);

export default Task;
