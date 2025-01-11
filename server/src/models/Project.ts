import mongoose, { Document, PopulatedDoc } from 'mongoose';
import type { TaskType } from './Task';

export type ProjectType = Document & {
  projectName: string;
  clientName: string;
  description: string;
  tasks: PopulatedDoc<TaskType>[];
};

const ProjectSchema = new mongoose.Schema(
  {
    projectName: { type: String, required: true, trim: true },
    clientName: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    tasks: [{ type: mongoose.Types.ObjectId, ref: 'Task' }]
  },
  { timestamps: true }
);

const Project = mongoose.model<ProjectType>('Project', ProjectSchema);

export default Project;
