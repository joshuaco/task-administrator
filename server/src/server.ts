import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { connectDB } from './config/db';
import { corsConfig } from './config/cors';
import authRoutes from './routes/auth';
import projectRoutes from './routes/project';

connectDB();

const app = express();

app.use(morgan('dev'));
app.use(cors(corsConfig));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

export default app;
