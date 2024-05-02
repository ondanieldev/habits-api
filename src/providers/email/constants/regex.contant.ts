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
};
