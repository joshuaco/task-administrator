import { Request, Response } from 'express';
import { hashPassword } from '../utils/auth';
import UserModel from '../models/User';

class Auth {
  static createAccount = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const existingUser = await UserModel.findOne({ email });

      if (existingUser) {
        res.status(409).json({ message: 'Email already used' });
        return;
      }

      const user = new UserModel(req.body);
      user.password = await hashPassword(password);

      await user.save();
      res.status(201).json({
        message:
          'Account created successfully, please check your email for confirmation link'
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

export default Auth;
