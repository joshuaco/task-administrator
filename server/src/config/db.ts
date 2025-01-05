import mongoose from 'mongoose';
import colors from 'colors';
import { MONGO_URI } from './constants';

export async function connectDB() {
  try {
    const { connection } = await mongoose.connect(MONGO_URI);
    const url = `${connection.host}:${connection.port}/${connection.name}`;
    console.log(colors.magenta(`Connected to DB: ${url}`));
  } catch (error) {
    console.log(colors.red('Error connecting to DB: '), error.message);
    process.exit(1);
  }
}
