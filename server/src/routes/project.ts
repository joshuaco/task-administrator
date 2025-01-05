import { Router } from 'express';
import ProjectController from '../controllers/Project';
import { handleErrors, projectValidator } from '../middlewares/validations';

const router = Router();

router.get('/', ProjectController.getAllProjects);

router.post(
  '/',
  projectValidator(),
  handleErrors,
  ProjectController.createProject
);

export default router;
