import type { Request, Response } from 'express';
import TaskModel from '../models/Task';

class Task {
  static createTask = async (req: Request, res: Response) => {
    try {
      const task = new TaskModel(req.body);
      task.project = req.project.id;
      req.project.tasks.push(task.id);
      await Promise.allSettled([task.save(), req.project.save()]);
      res.status(201).json({ task });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static getProjectTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await TaskModel.find({ project: req.project.id }).populate(
        'project',
        { projectName: 1, clientName: 1 }
      );
      res.status(200).json({ tasks });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

export default Task;
