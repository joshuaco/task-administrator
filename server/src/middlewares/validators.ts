import { validationResult, body, param } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { taskStatus } from '../models/Task';

const customValidationResult = validationResult.withDefaults({
  formatter: (error) => error.msg
});

export const handleErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = customValidationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ error: errors.array() });
    return;
  }
  next();
};

export const projectValidator = () => {
  return [
    body('projectName')
      .trim()
      .notEmpty()
      .withMessage('Project name is required'),
    body('clientName').trim().notEmpty().withMessage('Client name is required'),
    body('description').trim().notEmpty().withMessage('Description is required')
  ];
};

export const projectIDValidator = () => {
  return [param('id').isMongoId().withMessage('Invalid ID')];
};

export const taskIDValidator = () => {
  return [param('taskID').isMongoId().withMessage('Invalid ID')];
};

export const userIDValidator = () => {
  return [param('userID').isMongoId().withMessage('Invalid ID')];
};

export const taskValidator = () => {
  return [
    body('name').trim().notEmpty().withMessage('Task name is required'),
    body('description').trim().notEmpty().withMessage('Description is required')
  ];
};

export const taskStatusValidator = () => {
  return [
    body('status')
      .trim()
      .notEmpty()
      .isIn(Object.values(taskStatus))
      .withMessage('Invalid status')
  ];
};

export const authRegisterValidator = () => {
  return [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').trim().notEmpty().isEmail().withMessage('Email is invalid'),
    body('password')
      .trim()
      .notEmpty()
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
    body('password-confirm').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    })
  ];
};

export const authConfirmTokenValidator = () => {
  return [body('token').trim().notEmpty().withMessage('Token is required')];
};

export const authLoginValidator = () => {
  return [
    body('email').trim().notEmpty().isEmail().withMessage('Email is invalid'),
    body('password').trim().notEmpty().withMessage('Password is required')
  ];
};

export const emailValidator = () => {
  return [
    body('email').trim().notEmpty().isEmail().withMessage('Invalid Email')
  ];
};

export const mongoIdValidator = () => {
  return [body('id').notEmpty().isMongoId().withMessage('Invalid ID')];
};

export const authUpdatePasswordValidator = () => {
  return [
    param('token').isNumeric().withMessage('Invalid token'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
    body('password-confirm').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    })
  ];
};

export const noteContentValidator = () => {
  return [
    body('content').trim().notEmpty().withMessage('Note content is required')
  ];
};

export const updateProfileValidator = () => {
  return [
    body('name').trim().notEmpty().withMessage('Profile name is required'),
    body('email').trim().notEmpty().isEmail().withMessage('Invalid Email')
  ];
};

export const updateCurrentPasswordValidator = () => {
  return [
    body('current_password')
      .trim()
      .notEmpty()
      .withMessage('Password is required'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
    body('confirm_password').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    })
  ];
};

export const passwordValidator = () => {
  return [
    body('password').trim().notEmpty().withMessage('Password is required')
  ];
};
