import { Router } from 'express';
import TaskController from '../controllers/Task';
import { validateProjectExists } from '../middlewares/project';
import { handleErrors, taskValidator } from '../middlewares/validators';

const router = Router();

router.post(
  '/:projectID/tasks',
  validateProjectExists,
  taskValidator(),
  handleErrors,
  TaskController.createTask
);

export default router;
