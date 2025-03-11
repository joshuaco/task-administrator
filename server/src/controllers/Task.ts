import type { Request, Response } from 'express';
import TaskModel from '../models/Task';

class Task {
  static createTask = async (req: Request, res: Response) => {
    try {
      const task = new TaskModel(req.body);
      task.project = req.project.id;
      req.project.tasks.push(task.id);
      await Promise.allSettled([task.save(), req.project.save()]);
      res.status(201).json({ message: 'Task created successfully' });
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

  static getTaskById = async (req: Request, res: Response) => {
    try {
      const task = await TaskModel.findById(req.task.id)
        .populate({
          path: 'project',
          select: 'projectName clientName'
        })
        .populate({
          path: 'updatedBy.user',
          select: 'name email'
        })
        .populate({
          path: 'notes',
          populate: {
            path: 'createdBy',
            select: 'name email'
          }
        });

      res.status(200).json({ task });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static updateTask = async (req: Request, res: Response) => {
    try {
      await TaskModel.findByIdAndUpdate(req.params.taskID, req.body, {
        new: true
      });

      res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static deleteTask = async (req: Request, res: Response) => {
    try {
      const task = await TaskModel.findById(req.params.taskID);

      await Promise.allSettled([
        req.project.updateOne({ $pull: { tasks: task._id } }),
        task.deleteOne()
      ]);

      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static updateStatus = async (req: Request, res: Response) => {
    try {
      const { status } = req.body;
      const data = {
        user: req.user.id,
        status,
        createdAt: new Date()
      };
      req.task.status = status;
      req.task.updatedBy.push(data);
      await req.task.save();
      res.status(200).json({ message: 'Task status updated successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

export default Task;
