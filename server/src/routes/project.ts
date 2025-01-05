import { Router } from 'express';
import ProjectController from '../controllers/Project';

const router = Router();

router.get('/', ProjectController.getAllProjects);
router.post('/', ProjectController.createProject);

export default router;
