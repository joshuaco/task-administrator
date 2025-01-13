import { Router } from 'express';
import TaskController from '../controllers/Task';
import { projectExists } from '../middlewares/project';
import { taskExists } from '../middlewares/task';
import {
  handleErrors,
  taskValidator,
  taskIDValidator,
  taskStatusValidator
} from '../middlewares/validators';

const router = Router();

router.param('projectID', projectExists);
router.param('taskID', taskExists);

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
  TaskController.getTaskById
);

router.put(
  '/:projectID/tasks/:taskID',
  taskIDValidator(),
  taskValidator(),
  handleErrors,
  TaskController.updateTask
);

router.patch(
  '/:projectID/tasks/:taskID/status',
  taskIDValidator(),
  taskStatusValidator(),
  handleErrors,
  TaskController.updateStatus
);

router.delete(
  '/:projectID/tasks/:taskID',
  taskIDValidator(),
  handleErrors,
  TaskController.deleteTask
);

export default router;
