import { Router } from 'express';
import taskRouter from './task';
import ProjectController from '../controllers/Project';
import {
  handleErrors,
  projectValidator,
  projectIDValidator
} from '../middlewares/validations';

const router = Router();

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

export default router;
