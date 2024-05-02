import { EmailLocales } from '../enums/email-locale.enum';
import { EmailTemplate } from '../enums/email-template.enum';

type EmailSubject = Record<EmailLocales, string>;

export const emailSubjects: Record<EmailTemplate, EmailSubject> = {
  'verify-email': {
    'en-US': 'Verify your email',
    'pt-BR': 'Verifique seu email',
  },
};
