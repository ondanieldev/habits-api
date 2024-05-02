import { EmailLocales } from '../enums/email-locale.enum';
import { EmailTemplate } from '../enums/email-template.enum';

type Text = Record<EmailLocales, string>;

export const regexTexts: Record<EmailTemplate, Text> = {
  'verify-email': {
    'en-US':
      'Please verify your email by using the following code: {{verifyEmailToken}}. It will be valid for 1 hour.',
    'pt-BR':
      'Por favor, verifique seu email usando o seguinte código: {{verifyEmailToken}}. Ele será válido por 1 hora.',
  },
  'reset-password': {
    'en-US':
      'Please reset your password by using the following code: {{resetPasswordToken}}. It will be valid for 1 hour. If you did not request this, please ignore this email.',
    'pt-BR':
      'Por favor, redefina sua senha usando o seguinte código: {{resetPasswordToken}}. Ele será válido por 1 hora. Se você não solicitou isso, ignore este email.',
  },
};
