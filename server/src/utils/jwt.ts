import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const JWT_KEY = process.env.JWT_SECRET;

type UserPayload = {
  id: mongoose.Types.ObjectId;
};

export const generateJWT = (payload: UserPayload) => {
  const token = jwt.sign(payload, JWT_KEY, {
    expiresIn: '1d'
  });

  return token;
};

export const verifyJWT = (token: string) => {
  const data = jwt.verify(token, JWT_KEY);
  if (typeof data === 'object' && data.id) return data;
};
