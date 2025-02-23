import { Router } from 'express';
import taskRouter from './task';
import teamRouter from './team';
import ProjectController from '../controllers/Project';
import {
  handleErrors,
  projectValidator,
  projectIDValidator
} from '../middlewares/validators';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.use(authenticate);

router.get('/', ProjectController.getAllProjects);

router.get(
  '/:id',
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

router.put(
  '/:id',
  projectIDValidator(),
  projectValidator(),
  handleErrors,
  ProjectController.updateProject
);

router.delete(
  '/:id',
  projectIDValidator(),
  handleErrors,
  ProjectController.deleteProject
);

router.use('/', taskRouter);
router.use('/', teamRouter);

export default router;
