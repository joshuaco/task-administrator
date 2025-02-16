import { Request, Response } from 'express';
import { comparePassword, hashPassword } from '../utils/auth';
import { generateToken } from '../utils/token';
import { AuthEmail } from '../emails/AuthEmail';
import UserModel from '../models/User';
import TokenModel from '../models/Token';

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

      const token = new TokenModel();
      token.token = generateToken();
      token.user = user.id;

      // send email
      await AuthEmail.sendConfirmationEmail({
        email: user.email,
        name: user.name,
        token: token.token
      });

      await Promise.allSettled([user.save(), token.save()]);
      res.status(201).json({
        message:
          'Account created successfully, please check your email for confirmation link'
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static confirmAccount = async (req: Request, res: Response) => {
    try {
      const { token } = req.body;
      const tokenDoc = await TokenModel.findOne({ token });

      if (!tokenDoc) {
        res.status(404).json({ message: 'Invalid token' });
        return;
      }

      const user = await UserModel.findById(tokenDoc.user);
      user.confirmed = true;

      await Promise.allSettled([user.save(), tokenDoc.deleteOne()]);
      res.status(200).json({ message: 'Account confirmed successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  static login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });

      if (!user) {
        res
          .status(404)
          .json({ message: "Email doesn't found, create an account" });
        return;
      }

      const validPassword = await comparePassword(password, user.password);

      if (!validPassword) {
        res.status(401).json({ message: 'Invalid password' });
        return;
      }

      if (!user.confirmed) {
        res.status(401).json({
          message: 'Account not confirmed yet, please check your email'
        });
        return;
      }

      res.status(200).json({ message: 'Logged in successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  static requestConfirmationCode = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const user = await UserModel.findOne({ email });

      if (!user) {
        res.status(404).json({ message: 'Email not found' });
        return;
      }

      if (user.confirmed) {
        res.status(403).json({ message: 'Account already confirmed' });
        return;
      }

      const existingToken = await TokenModel.findOne({ user: user.id });

      if (existingToken) {
        await existingToken.deleteOne();
      }

      const token = new TokenModel();
      token.token = generateToken();
      token.user = user.id;

      await AuthEmail.sendConfirmationEmail({
        email: user.email,
        name: user.name,
        token: token.token
      });

      await token.save();
      res.status(200).json({ message: 'Email sent' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  static resetPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const user = await UserModel.findOne({ email });

      if (!user) {
        res.status(404).json({ message: "Email doesn't found" });
        return;
      }

      const token = new TokenModel();
      token.token = generateToken();
      token.user = user.id;

      await AuthEmail.sendPasswordResetToken({
        email: user.email,
        name: user.name,
        token: token.token
      });

      await token.save();
      res.status(200).json({ message: 'Please, check your email' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

export default Auth;
