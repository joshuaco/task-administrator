import { Router } from 'express';
import {
  authConfirmTokenValidator,
  authLoginValidator,
  authRegisterValidator,
  authRequestCodeValidator,
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

router.post(
  '/request-code',
  authRequestCodeValidator(),
  handleErrors,
  AuthController.requestConfirmationCode
);

router.post(
  '/reset-password',
  authRequestCodeValidator(),
  handleErrors,
  AuthController.resetPassword
);

export default router;
