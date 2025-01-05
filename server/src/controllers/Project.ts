import type { Request, Response } from 'express';
import ProjectModel from '../models/Project';

class Project {
  static createProject = async (req: Request, res: Response) => {
    const project = new ProjectModel(req.body);
    try {
      await project.save();
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static getAllProjects = async (_req: Request, res: Response) => {
    try {
      const projects = await ProjectModel.find({});
      res.status(200).json({ projects });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static getProjectById = async (req: Request, res: Response) => {
    try {
      const project = await ProjectModel.findById(req.params.id);

      if (!project) {
        res.status(404).json({ message: 'Project not found' });
        return;
      }

      res.status(200).json({ project });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

export default Project;
