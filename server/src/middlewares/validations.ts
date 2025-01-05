import { validationResult, body, param } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const handleErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
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
