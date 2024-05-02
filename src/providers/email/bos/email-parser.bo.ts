import { EmailSendBo } from './email.bo';

export type EmailParserToTextBo = Pick<
  EmailSendBo,
  'data' | 'locale' | 'template'
>;
