import { Router } from 'express';
import {
  authConfirmTokenValidator,
  authLoginValidator,
  authRegisterValidator,
  authRequestCodeValidator,
  authUpdatePasswordValidator,
  handleErrors
} from '../middlewares/validators';
import { authenticate } from '../middlewares/auth';
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
  '/forgot-password',
  authRequestCodeValidator(),
  handleErrors,
  AuthController.forgotPassword
);

router.post(
  '/validate-token',
  authConfirmTokenValidator(),
  handleErrors,
  AuthController.validateToken
);

router.post(
  '/reset-password/:token',
  authUpdatePasswordValidator(),
  handleErrors,
  AuthController.updatePasswordWithToken
);

router.get('/user', authenticate, AuthController.getUser);

export default router;
