import { EmailRecipientBo } from '../bos/email.bo';

export const getSesConfig = () => {
  const region = process.env.EMAIL_SES_REGION;
  const apiVersion = '2010-12-01';

  if (!region) {
    throw new Error('SES email configuration is missing');
  }

  return {
    region,
    apiVersion,
  };
};

export const getSesDefaultEmailUser: () => EmailRecipientBo = () => {
  const address = process.env.EMAIL_SES_ADDRESS;
  const name = process.env.EMAIL_SES_NAME;

  if (!address || !name) {
    throw new Error('SES default email user configuration is missing');
  }

  return {
    address,
    name,
  };
};
