import { Router } from 'express';
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

export default router;
