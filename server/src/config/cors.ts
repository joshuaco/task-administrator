import { CorsOptions } from 'cors';

const WHITELISTED_ORIGINS = [
  'http://localhost:5173',
  'https://uptask-projects.vercel.app',
  'https://task-administrator-xi.vercel.app',
  'https://task-administrator-josuee-contreras-projects.vercel.app'
];

export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    if (WHITELISTED_ORIGINS.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
