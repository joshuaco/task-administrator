import { Router } from 'express';
import taskRouter from './task';
import teamRouter from './team';
import noteRouter from './note';
import ProjectController from '../controllers/Project';
import {
  handleErrors,
  projectValidator,
  projectIDValidator
} from '../middlewares/validators';
import { authenticate } from '../middlewares/auth';
import { projectExists } from '../middlewares/project';
import { hasAuthorization } from '../middlewares/task';

const router = Router();

router.use(authenticate);

router.get('/', ProjectController.getAllProjects);

router.get(
  '/:projectID',
  projectIDValidator(),
  handleErrors,
  ProjectController.getProjectById
);

router.post(
  '/',
  projectValidator(),
  handleErrors,
  ProjectController.createProject
);

router.param('projectID', projectExists);

router.put(
  '/:projectID',
  projectIDValidator(),
  projectValidator(),
  handleErrors,
  hasAuthorization,
  ProjectController.updateProject
);

router.delete(
  '/:projectID',
  projectIDValidator(),
  handleErrors,
  hasAuthorization,
  ProjectController.deleteProject
);

router.use('/', taskRouter);
router.use('/', teamRouter);
router.use('/', noteRouter);

export default router;
