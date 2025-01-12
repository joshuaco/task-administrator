import type { Request, Response } from 'express';
import ProjectModel from '../models/Project';

class Project {
  static createProject = async (req: Request, res: Response) => {
    const project = new ProjectModel(req.body);
    try {
      await project.save();
      res.status(201).json({ data: project });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static getAllProjects = async (_req: Request, res: Response) => {
    try {
      const projects = await ProjectModel.find({}).populate('tasks', {
        name: 1,
        description: 1,
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
        { name: 1, description: 1, status: 1 }
      );

      if (!project) {
        res.status(404).json({ error: 'Project not found' });
        return;
      }

      res.status(200).json({ project });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static updateProject = async (req: Request, res: Response) => {
    try {
      const project = await ProjectModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (!project) {
        res.status(404).json({ error: 'Project not found' });
        return;
      }

      res.status(200).json({ project });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static deleteProject = async (req: Request, res: Response) => {
    try {
      const project = await ProjectModel.findByIdAndDelete(req.params.id);

      if (!project) {
        res.status(404).json({ error: 'Project not found' });
        return;
      }

      res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

export default Project;
