import { Router } from 'express';
import TeamController from '../controllers/Team';
import { projectExists } from '../middlewares/project';
import {
  emailValidator,
  handleErrors,
  mongoIdValidator
} from '../middlewares/validators';

const router = Router();

router.param('projectID', projectExists);

router.post(
  '/:projectID/team/find',
  emailValidator(),
  handleErrors,
  TeamController.getMemberByEmail
);

router.get('/:projectID/team', TeamController.getProjectTeam);

router.post(
  '/:projectID/team',
  mongoIdValidator(),
  handleErrors,
  TeamController.addMemberById
);

router.delete(
  '/:projectID/team',
  mongoIdValidator(),
  handleErrors,
  TeamController.deleteMemberById
);

export default router;
