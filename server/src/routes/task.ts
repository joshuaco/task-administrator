import { Router } from 'express';
import TaskController from '../controllers/Task';
import { taskExists } from '../middlewares/task';
import { projectExists } from '../middlewares/project';
import {
  handleErrors,
  taskValidator,
  taskIDValidator,
  taskStatusValidator
} from '../middlewares/validators';

const router = Router();

router.param('projectID', projectExists);

router.post(
  '/:projectID/tasks',
  taskValidator(),
  handleErrors,
  TaskController.createTask
);

router.get('/:projectID/tasks', TaskController.getProjectTasks);

router.get(
  '/:projectID/tasks/:taskID',
  taskIDValidator(),
  handleErrors,
  taskExists,
  TaskController.getTaskById
);

router.put(
  '/:projectID/tasks/:taskID',
  taskIDValidator(),
  taskValidator(),
  handleErrors,
  taskExists,
  TaskController.updateTask
);

router.patch(
  '/:projectID/tasks/:taskID/status',
  taskIDValidator(),
  taskStatusValidator(),
  handleErrors,
  taskExists,
  TaskController.updateStatus
);

router.delete(
  '/:projectID/tasks/:taskID',
  taskIDValidator(),
  handleErrors,
  taskExists,
  TaskController.deleteTask
);

export default router;
