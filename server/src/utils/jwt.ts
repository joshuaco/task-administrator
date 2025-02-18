import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const JWT_KEY = process.env.JWT_SECRET;

type UserPayload = {
  id: mongoose.Types.ObjectId;
};

export const generateJWT = (payload: UserPayload) => {
  const token = jwt.sign(payload, JWT_KEY, {
    expiresIn: '1m'
  });

  return token;
};
