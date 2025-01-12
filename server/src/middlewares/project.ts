import type { Request, Response, NextFunction } from 'express';
import ProjectModel, { ProjectType } from '../models/Project';

declare global {
  namespace Express {
    interface Request {
      project: ProjectType;
    }
  }
}

export const validateProjectExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectID } = req.params;
    const project = await ProjectModel.findById(projectID);
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    req.project = project;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ error: "There's an error. Check project ID is correct." });
  }
};
