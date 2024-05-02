import { EmailRecipientBo } from '../bos/email.bo';

export const getSmtpConfig = () => {
  const host = process.env.EMAIL_SMTP_HOST;
  const port = process.env.EMAIL_SMTP_PORT;
  const secure = process.env.EMAIL_SMTP_SECURE;
  const auth = {
    user: process.env.EMAIL_SMTP_USER,
    pass: process.env.EMAIL_SMTP_PASS,
  };
  if (!host || !port || !secure || !auth.user || !auth.pass) {
    throw new Error('SMTP email configuration is missing');
  }

  return {
    auth,
    host,
    port: parseInt(port),
    secure: secure === 'true',
  };
};

export const getSmtpDefaultEmailUser: () => EmailRecipientBo = () => {
  const address = process.env.EMAIL_SMTP_ADDRESS;
  const name = process.env.EMAIL_SMTP_NAME;

  if (!address || !name) {
    throw new Error('SMTP default email user configuration is missing');
  }

  return {
    address,
    name,
  };
};
