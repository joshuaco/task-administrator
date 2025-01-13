import type { Request, Response, NextFunction } from 'express';
import TaskModel, { TaskType } from '../models/Task';

declare global {
  namespace Express {
    interface Request {
      task: TaskType;
    }
  }
}

export const taskExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { taskID } = req.params;
    req.task = await TaskModel.findById(taskID);

    if (!req.task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    if (req.task.project.toString() !== req.project.id.toString()) {
      res.status(403).json({ error: 'Task not found' });
      return;
    }
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
