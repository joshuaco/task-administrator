import dotenv from 'dotenv';

dotenv.config();

export const { PORT = 4000 } = process.env;
export const MONGO_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.MONGOTEST_URI
    : process.env.MONGODEV_URI;
