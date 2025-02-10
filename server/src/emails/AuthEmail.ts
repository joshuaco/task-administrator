import { transporter } from '../config/nodemailer';

interface UserData {
  email: string;
  name?: string;
  token: string;
}

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
          <p>Please confirm your account with the following token: </p>
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
