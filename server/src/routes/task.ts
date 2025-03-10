import { Router } from 'express';
import noteRouter from './note';
import TaskController from '../controllers/Task';
import {
  hasAuthorization,
  taskBelongToProject,
  taskExists
} from '../middlewares/task';
import { projectExists } from '../middlewares/project';
import {
  handleErrors,
  taskValidator,
  taskIDValidator,
  taskStatusValidator
} from '../middlewares/validators';

const router = Router();

router.param('projectID', projectExists);
router.param('taskID', taskExists);
router.param('taskID', taskBelongToProject);

router.post(
  '/:projectID/tasks',
  hasAuthorization,
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
  hasAuthorization,
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
  hasAuthorization,
  taskIDValidator(),
  handleErrors,
  TaskController.deleteTask
);

router.use(
  '/:projectID/tasks/:taskID',
  taskIDValidator(),
  handleErrors,
  noteRouter
);

export default router;
