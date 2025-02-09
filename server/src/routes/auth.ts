import { Router } from 'express';
import AuthController from '../controllers/Auth';
import { authRegisterValidator, handleErrors } from '../middlewares/validators';
const router = Router();

router.post(
  '/register',
  authRegisterValidator(),
  handleErrors,
  AuthController.createAccount
);

export default router;
