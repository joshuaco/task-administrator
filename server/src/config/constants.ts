import dotenv from 'dotenv';

dotenv.config();

export const { PORT = 4000, MONGO_URI } = process.env;
