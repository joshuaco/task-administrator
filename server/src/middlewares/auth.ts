import { Request, Response, NextFunction } from 'express';
import { verifyJWT } from '../utils/jwt';
import UserModel, { UserType } from '../models/User';

declare global {
  namespace Express {
    interface Request {
      user?: UserType;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const token = bearer.split(' ')[1];

  try {
    const data = verifyJWT(token);
    const user = await UserModel.findById(data.id).select('id name email');

    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({ message: 'User not found' });
      return;
    }
  } catch (error) {
    if (error instanceof Error)
      res.status(401).json({ message: error.message });
    return;
  }
};
