import { Router } from 'express';
import {
  authConfirmTokenValidator,
  authLoginValidator,
  authRegisterValidator,
  handleErrors
} from '../middlewares/validators';
import AuthController from '../controllers/Auth';

const router = Router();

router.post(
  '/create-account',
  authRegisterValidator(),
  handleErrors,
  AuthController.createAccount
);

router.post(
  '/confirm-account',
  authConfirmTokenValidator(),
  handleErrors,
  AuthController.confirmAccount
);

router.post('/login', authLoginValidator(), handleErrors, AuthController.login);

export default router;
