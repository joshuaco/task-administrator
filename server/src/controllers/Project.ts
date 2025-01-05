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
    res.json({ message: 'All projects' });
  };
}

export default Project;
