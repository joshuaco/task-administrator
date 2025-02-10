import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;

const config = {
  host: SMTP_HOST,
  port: +SMTP_PORT,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD
  }
};

export const transporter = nodemailer.createTransport(config);
