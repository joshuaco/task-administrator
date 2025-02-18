import type { Request, Response } from 'express';
import ProjectModel from '../models/Project';
import TaskModel from '../models/Task';

class Project {
  static createProject = async (req: Request, res: Response) => {
    const project = new ProjectModel(req.body);
    project.manager = req.user.id;
    try {
      await project.save();
      res
        .status(201)
        .json({ data: project, message: 'Project created successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await ProjectModel.find({
        manager: { $in: req.user.id }
      }).populate('tasks', {
        name: 1,
        description: 1,
        project: 1,
        status: 1
      });
      res.status(200).json({ projects });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static getProjectById = async (req: Request, res: Response) => {
    try {
      const project = await ProjectModel.findById(req.params.id).populate(
        'tasks',
        { name: 1, description: 1, status: 1, project: 1 }
      );

      if (!project) {
        res.status(404).json({ error: 'Project not found' });
        return;
      }

      if (project.manager.toString() !== req.user.id) {
        res
          .status(401)
          .json({ error: 'You are unauthorized to see this project' });
        return;
      }

      res.status(200).json({ project });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static updateProject = async (req: Request, res: Response) => {
    try {
      const project = await ProjectModel.findById(req.params.id);

      if (!project) {
        res.status(404).json({ error: 'Project not found' });
        return;
      }

      if (project.manager.toString() !== req.user.id) {
        res
          .status(401)
          .json({ error: 'Only the manager can update this project' });
        return;
      }

      const updatedProject = await ProjectModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true
        }
      );

      res
        .status(200)
        .json({ updatedProject, message: 'Project updated successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static deleteProject = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const project = await ProjectModel.findById(id);

      if (!project) {
        res.status(404).json({ error: 'Project not found' });
        return;
      }

      if (project.manager.toString() !== req.user.id) {
        res
          .status(401)
          .json({ error: 'Only the manager can delete this project.' });
        return;
      }

      await Promise.allSettled([
        TaskModel.deleteMany({ project: id }),
        ProjectModel.findByIdAndDelete(id)
      ]);

      res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

export default Project;
