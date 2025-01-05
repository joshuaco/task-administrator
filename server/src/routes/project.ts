import { Router } from 'express';
import ProjectController from '../controllers/Project';
import { handleErrors, projectValidator } from '../middlewares/validations';

const router = Router();

router.get(
  '/',
  projectValidator(),
  handleErrors,
  ProjectController.getAllProjects
);

router.post('/', ProjectController.createProject);

export default router;
