import { EmailLocales } from '../enums/email-locale.enum';
import { EmailTemplate } from '../enums/email-template.enum';

export interface EmailRecipientBo {
  name: string;
  address: string;
}

export interface EmailSendBo {
  data: Record<string, string>;
  from?: EmailRecipientBo;
  template: EmailTemplate;
  to: EmailRecipientBo;
  locale: EmailLocales;
}
