import { transporter } from '../config/nodemailer';

interface UserData {
  email: string;
  name?: string;
  token: string;
}

const { FRONTEND_URL } = process.env;

console.log(FRONTEND_URL);

export class AuthEmail {
  static sendConfirmationEmail = async (user: UserData) => {
    transporter.sendMail(
      {
        from: 'UpTask <admin@uptask.com>',
        to: user.email,
        subject: 'Welcome to UpTask - Account Confirmation',
        text: 'Please confirm your account',
        html: `
          <h1>Welcome to UpTask</h1>
          <p>Please confirm your account following the link below:</p>
          <a href=${FRONTEND_URL}/confirm-account>Confirm Account</a>
          <p>Your account confirmation code is:</p>
          <b>${user.token}</b>
          <p>Thank you for using UpTask!</p>
          `
      },
      (error, info) => {
        if (error) {
          console.log('Error sending email: ', error);
        } else {
          console.log('Email sent: ', info.messageId);
        }
      }
    );
  };
}
