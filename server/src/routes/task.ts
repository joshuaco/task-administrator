import { Router } from 'express';
import TaskController from '../controllers/Task';
import { validateProjectExists } from '../middlewares/project';

const router = Router();

router.post(
  '/:projectID/tasks',
  validateProjectExists,
  TaskController.createTask
);

export default router;
