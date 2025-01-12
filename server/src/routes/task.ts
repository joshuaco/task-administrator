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

router.get(
  '/:projectID/tasks',
  validateProjectExists,
  TaskController.getProjectTasks
);

router.get(
  '/:projectID/tasks/:taskID',
  validateProjectExists,
  TaskController.getTaskById
);

export default router;
